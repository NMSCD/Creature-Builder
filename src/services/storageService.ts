import { promises as fs } from 'fs';

import { IStorageService } from './interface/IStorageService';

export class StorageService implements IStorageService {


    writeFile = (filename: string, content: string): void => {
        await fs.writeFile(filename, content,
            (err) => {
                if (err) {
                    return console.log(err);
                }
                console.log("File succesfully saved to disk.");
            }
        );
    }

    readFile = async <T>(filename: string): Promise<T> => {
        var content = await fs.readFile(filename);
        console.log(content);
        return content as any;
    }
}
