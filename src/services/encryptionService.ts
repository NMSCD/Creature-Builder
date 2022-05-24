import CryptoJS from 'crypto-js';

export class EncryptionService {
    private _key = 'thisiskey';

    encrypt = (orig: string): string => {
        const encryptedString = CryptoJS.AES.encrypt(orig, this._key);
        return encryptedString.toString();
    }

    decrypt = (encr: string): string => {
        const decryptedString = CryptoJS.AES.decrypt(encr, this._key);
        return decryptedString.toString();
    }
}
