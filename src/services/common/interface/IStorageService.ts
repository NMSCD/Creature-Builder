

export interface IStorageService {

    writeFile: <T>(filename: string, content: T) => void;

    readFile: <T>(filename: string) => Promise<T>;
}
