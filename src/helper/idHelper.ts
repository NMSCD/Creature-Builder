export const makeIdFromChars = (characters: string, length: number) => {
    let result = '';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export const descriptorId = () => {
    const characters = '0123456789';
    return makeIdFromChars(characters, 10);
}