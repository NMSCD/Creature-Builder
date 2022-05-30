import { anyObject } from '../../helper/typescriptHacks';
import { EncryptionService } from './encryptionService';

import { IStorageService } from './interface/IStorageService';

export class StorageService implements IStorageService {

    private _enc: EncryptionService = anyObject;

    constructor(enc: EncryptionService) {
        this._enc = enc;
    }

    writeFile = async <T>(filename: string, content: T): Promise<void> => {
        const contentString = JSON.stringify(content);
        const encrypted = this._enc.encrypt(contentString);
        localStorage.setItem(filename, encrypted);
    }

    readFile = async <T>(filename: string): Promise<T> => {
        const contentString = localStorage.getItem(filename);
        const decrypted = this._enc.decrypt(contentString ?? '');
        const content: T = JSON.parse(decrypted);

        return content;
    }
}
