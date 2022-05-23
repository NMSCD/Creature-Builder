import { ResultWithValue, ResultWithValueAndPagination } from '../../contracts/results/ResultWithValue';
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
}
