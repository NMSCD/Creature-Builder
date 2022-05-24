import { AssistantAppsApiService } from "../services/api/AssistantAppsApiService";
import { EncryptionService } from '../services/encryptionService';
import { IStorageService } from '../services/interface/IStorageService';
import { LocalStorageService } from '../services/localStorageService';
import { StorageService } from '../services/storageService';
import { ToastService } from "../services/toastService";

export interface IDependencyInjection {
    toastService: ToastService;
    storageService: IStorageService;

    assistantAppsApiService: AssistantAppsApiService;
}

export const registerServices = (): IDependencyInjection => {

    const _enc = new EncryptionService();

    return {
        toastService: new ToastService(),

        assistantAppsApiService: new AssistantAppsApiService(),
        storageService: isElectron()
            ? new StorageService(_enc)
            : new LocalStorageService(_enc),
    };
}

const isElectron = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return (userAgent?.indexOf?.(' electron/') !== -1);
}