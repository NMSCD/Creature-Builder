import isElectron from 'is-electron';
import { AssistantAppsApiService } from "../services/api/AssistantAppsApiService";
import { IStorageService } from '../services/interface/IStorageService';
import { ToastService } from "../services/toastService";

export interface IDependencyInjection {
    toastService: ToastService;
    storageService: IStorageService;

    assistantAppsApiService: AssistantAppsApiService;
}

export const registerServices = (): IDependencyInjection => ({
    toastService: new ToastService(),

    assistantAppsApiService: new AssistantAppsApiService(),
    storageService: isElectron() ?,
})