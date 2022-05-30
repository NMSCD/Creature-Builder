import { AssistantAppsApiService } from "../services/api/AssistantAppsApiService";
import { EncryptionService } from '../services/common/encryptionService';
import { IAuthStorageService } from "../services/common/interface/IAuthStorageService";
import { IStorageService } from '../services/common/interface/IStorageService';
import { LocalStorageService } from '../services/common/localStorageService';
import { StorageService } from "../services/common/storageService";
import { ToastService } from "../services/common/toastService";
import { OAuthClient } from "../services/signal/OAuthClient";

export interface IDependencyInjection {
    toastService: ToastService;
    storageService: IStorageService;
    authStorageService: IAuthStorageService;

    oAuthClient: OAuthClient;
    assistantAppsApiService: AssistantAppsApiService;
}

export const registerServices = (): IDependencyInjection => {

    const _enc = new EncryptionService();
    const _authStore: IAuthStorageService = new LocalStorageService(_enc);

    return {
        toastService: new ToastService(),

        oAuthClient: new OAuthClient(),
        assistantAppsApiService: new AssistantAppsApiService(_authStore),
        storageService: new StorageService(_enc),
        authStorageService: _authStore,
    };
}

