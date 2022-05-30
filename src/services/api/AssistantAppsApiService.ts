import * as storageType from '../../constants/storageType';
import { Result, ResultWithValue, ResultWithValueAndPagination } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';
import { VersionSearchViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionSearchViewModel';
import { PlatformType } from '../../contracts/generated/AssistantApps/Enum/platformType';
import { ApiUrls } from '../../constants/apiUrls';
import { assistantAppsApiUrl, assistantAppsAppGuid } from '../../constants/assistantApps';
import { OAuthUserViewModel } from '../../contracts/generated/AssistantApps/ViewModel/oAuthUserViewModel';
import { getExpiryDateUtc } from '../../helper/dateHelper';
import { IAuthStorageService } from '../common/interface/IAuthStorageService';
import { anyObject } from '../../helper/typescriptHacks';
import { ILoginProps } from '../../contracts/login';

declare global {
    interface Window { config: any }
}

export class AssistantAppsApiService extends BaseApiService {
    private _store: IAuthStorageService = anyObject;

    constructor(store: IAuthStorageService) {
        super(assistantAppsApiUrl);
        this._store = store;
    }

    async getWhatIsNewItems(search: VersionSearchViewModel): Promise<ResultWithValueAndPagination<Array<VersionViewModel>>> {
        const result = await this.post<Array<VersionViewModel>, VersionSearchViewModel>(
            ApiUrls.versionSearch, search,
            (response: any) => {
                return {
                    ...response.data,
                    isSuccess: true,
                    errorMessage: '',
                };
            });

        return result as ResultWithValueAndPagination<Array<VersionViewModel>>;
    }

    getLatest(platforms: Array<PlatformType>): Promise<ResultWithValue<VersionViewModel>> {
        let queryPath = '';
        for (const queryParam in platforms) {
            if (queryParam == null || queryParam.length < 1) continue;
            if (queryPath.length > 0) {
                queryPath = queryPath + '&';
            }
            queryPath = queryPath + '=' + queryParam;
        }
        const url = `${ApiUrls.appVersion}/${assistantAppsAppGuid}?${queryPath}`;

        return this.get<VersionViewModel>(url);
    }

    async activateLicence(licenceKey: string): Promise<ResultWithValue<string>> {
        const url = `${ApiUrls.licenceActivate}/${assistantAppsAppGuid}/${licenceKey}`;
        const apiResonse = await this.get<string>(url);
        if (apiResonse.isSuccess) return apiResonse;

        const errorList: Array<string> = [];
        const errProp = (apiResonse as any)?.excBody;
        if (typeof errProp === 'object') {
            const errorObj = errProp?.errors ?? {};
            for (const errProp in errorObj) {
                if (Object.prototype.hasOwnProperty.call(errorObj, errProp)) {
                    const mesg = errorObj[errProp];
                    errorList.push(mesg);
                }
            }
        } else {
            errorList.push(errProp ?? '');
        }

        return { ...apiResonse, errorMessage: errorList.join('. ') };
    }

    async activateLicenceForPatron(uniqueId: string): Promise<ResultWithValue<string>> {
        debugger;
        const url = `${ApiUrls.licenceActivateForPatron}/${assistantAppsAppGuid}/${uniqueId}`;
        const apiResonse = await this.get<string>(url);
        if (apiResonse.isSuccess) return apiResonse;

        const errorList: Array<string> = [];
        const errProp = (apiResonse as any)?.excBody;
        if (typeof errProp === 'object') {
            const errorObj = errProp?.errors ?? {};
            for (const errProp in errorObj) {
                if (Object.prototype.hasOwnProperty.call(errorObj, errProp)) {
                    const mesg = errorObj[errProp];
                    errorList.push(mesg);
                }
            }
        } else {
            errorList.push(errProp ?? '');
        }

        return { ...apiResonse, errorMessage: errorList.join('. ') };
    }

    verifyLicence(licenceHash: string): Promise<Result> {
        const url = `${ApiUrls.licenceVerify}/${assistantAppsAppGuid}/${licenceHash}`;
        return this.get(url);
    }

    // Auth
    async loginWithOAuth(oAuthObj: OAuthUserViewModel): Promise<ResultWithValue<ILoginProps>> {
        let userGuid = '';
        let timeTillExpiry = 0;
        let expiryDate = new Date();
        const apiResult = await this.post(ApiUrls.authUrl, oAuthObj, (headers) => {
            const token = headers.token;
            timeTillExpiry = headers.tokenexpiry;
            userGuid = headers.userguid;

            this.setInterceptors(token);
            expiryDate = getExpiryDateUtc(timeTillExpiry);

            this._store.set(storageType.token, token, expiryDate);
            this._store.set(storageType.userGuid, userGuid, expiryDate);
            this._store.set(storageType.userName, oAuthObj.username, expiryDate);
        });

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
