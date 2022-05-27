import { AssistantAppsApiService } from "../services/api/AssistantAppsApiService";
import { EncryptionService } from '../services/encryptionService';
import { IAuthStorageService } from "../services/interface/IAuthStorageService";
import { IStorageService } from '../services/interface/IStorageService';
import { LocalStorageService } from '../services/localStorageService';
import { StorageService } from "../services/storageService";
import { ToastService } from "../services/toastService";

export interface IDependencyInjection {
    toastService: ToastService;
    storageService: IStorageService;
    authStorageService: IAuthStorageService;

    assistantAppsApiService: AssistantAppsApiService;
}

export const registerServices = (): IDependencyInjection => {

    const _enc = new EncryptionService();
    const _authStore: IAuthStorageService = new LocalStorageService(_enc);

    return {
        toastService: new ToastService(),

        assistantAppsApiService: new AssistantAppsApiService(_authStore),
        storageService: new StorageService(_enc),
        authStorageService: _authStore,
    };
}

