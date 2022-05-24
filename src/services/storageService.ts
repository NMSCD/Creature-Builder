import fs from 'fs';
import util from 'util';

import { IStorageService } from './interface/IStorageService';

export class StorageService implements IStorageService {


    writeFile = (filename: string, content: string): void => {
        const writeFileAsync = util.promisify(fs.writeFile);
        writeFileAsync(filename, content,
            (err) => {
                if (err) {
                    return console.log(err);
                }
                console.log("File succesfully saved to disk.");
            }
        );
    }

    readFile = async <T>(filename: string): Promise<T> => {
        const readFileAsync = util.promisify(fs.readFile);
        var content = await readFileAsync(filename);
        console.log(content);
        return content as any;
    }
}
