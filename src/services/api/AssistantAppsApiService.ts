import { AssistantAppsApiService as aaApi, IUserLogin, OAuthUserViewModel, PlatformType, VersionSearchViewModel, VersionViewModel } from '@assistantapps/assistantapps.api.client';
import { assistantAppsApiUrl, assistantAppsAppGuid } from '../../constants/assistantApps';
import * as storageType from '../../constants/storageType';
import { ILoginProps } from '../../contracts/login';
import { Result, ResultWithValue, ResultWithValueAndPagination } from '../../contracts/results/ResultWithValue';
import { anyObject } from '../../helper/typescriptHacks';
import { IAuthStorageService } from '../common/interface/IAuthStorageService';

declare global {
    interface Window { config: any }
}

export class AssistantAppsApiService {
    private _store: IAuthStorageService = anyObject;
    private _api: aaApi;

    constructor(store: IAuthStorageService) {
        this._store = store;
        this._api = new aaApi({ url: assistantAppsApiUrl });
    }

    async getWhatIsNewItems(search: VersionSearchViewModel): Promise<ResultWithValueAndPagination<Array<VersionViewModel>>> {
        const result = await this._api.version.readAllHistory(
            search.appGuid,
            search.languageCode,
            search.platforms,
            search.page
        );

        return result as ResultWithValueAndPagination<Array<VersionViewModel>>;
    }

    getLatest(platforms: Array<PlatformType>): Promise<ResultWithValue<VersionViewModel>> {
        // return this._api.version.readLatest(assistantAppsAppGuid, platforms);
        return this._api.version.readLatest(assistantAppsAppGuid);
    }

    activateLicence(licenceKey: string): Promise<ResultWithValue<string>> {
        return this._api.licence.activate(assistantAppsAppGuid, licenceKey);
    }

    activateLicenceForPatron(uniqueId: string): Promise<ResultWithValue<string>> {
        return this._api.licence.activateForPatron(assistantAppsAppGuid, uniqueId);
    }

    verifyLicence(licenceHash: string): Promise<Result> {
        return this._api.licence.verify(assistantAppsAppGuid, licenceHash);
    }

    // Auth
    async loginWithOAuth(oAuthObj: OAuthUserViewModel): Promise<ResultWithValue<ILoginProps>> {
        let userGuid = '';
        let timeTillExpiry = 0;
        let expiryDate = new Date();
        const apiResult = await this._api.account.loginWithGoogleAuth(
            oAuthObj,
            (userAcc: IUserLogin) => {
                const token = userAcc.token;
                expiryDate = userAcc.tokenExpiryDate;
                userGuid = userAcc.userGuid;

                this._store.set(storageType.token, token, expiryDate);
                this._store.set(storageType.userGuid, userGuid, expiryDate);
                this._store.set(storageType.userName, oAuthObj.username, expiryDate);
            }
        );

        const loginData: ILoginProps = {
            userGuid: userGuid,
            userName: oAuthObj.username,
            secondsTillExpire: timeTillExpiry,
            userProfileUrl: oAuthObj.profileUrl,
            userDetailsExpiryDate: expiryDate,
        };

        return {
            isSuccess: apiResult.isSuccess,
            value: loginData,
            errorMessage: apiResult.errorMessage,
        };
    }
}
