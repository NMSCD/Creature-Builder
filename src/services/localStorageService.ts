import { StorageItem } from '../contracts/storageItem';
import { isInTheFuture, oneHourFromNow } from '../helper/dateHelper';
import { anyObject } from '../helper/typescriptHacks';
import { EncryptionService } from './encryptionService';

import { IAuthStorageService } from './interface/IAuthStorageService';

export class LocalStorageService implements IAuthStorageService {

    private _enc: EncryptionService = anyObject;

    constructor(enc: EncryptionService) {
        this._enc = enc;
    }

    get = async <T>(filename: string): Promise<T> => {
        const contentString = localStorage.getItem(filename);
        const decrypted = this._enc.decrypt(contentString ?? '');
        const content: StorageItem<T> = JSON.parse(decrypted);

        if (content != null && content.data != null && content.expiryDate != null) {
            if (isInTheFuture(content.expiryDate)) {
                return content.data;
            }
        }

        // eslint-disable-next-line no-throw-literal
        throw 'Item not found or expired';
    }

    set = async <T>(filename: string, content: T, expiry?: Date): Promise<void> => {
        const oneHourFromNw = oneHourFromNow();

        const item: StorageItem<T> = {
            data: content,
            expiryDate: expiry || oneHourFromNw
        };

        const contentString = JSON.stringify(item);
        const encrypted = this._enc.encrypt(contentString);
        localStorage.setItem(filename, encrypted);
    }
}
