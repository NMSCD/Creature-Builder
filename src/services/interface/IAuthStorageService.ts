export interface IAuthStorageService {
    set: <T>(key: string, data: T, expiry?: Date) => void;
    get: <T>(key: string) => Promise<T>;
}
