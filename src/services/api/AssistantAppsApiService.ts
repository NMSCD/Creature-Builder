import { Result, ResultWithValue, ResultWithValueAndPagination } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';
import { VersionSearchViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionSearchViewModel';
import { PlatformType } from '../../contracts/generated/AssistantApps/Enum/platformType';
import { ApiUrls } from '../../constants/apiUrls';
import { assistantAppsAppGuid } from '../../constants/assistantApps';

declare global {
    interface Window { config: any }
}

export class AssistantAppsApiService extends BaseApiService {
    constructor() {
        super('https://api.assistantapps.com');
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

    verifyLicence(licenceHash: string): Promise<Result> {
        const url = `${ApiUrls.licenceVerify}/${assistantAppsAppGuid}/${licenceHash}`;
        return this.get(url);
    }
}
