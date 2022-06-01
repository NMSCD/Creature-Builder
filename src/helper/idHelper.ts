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

export const newDescriptorId = () => {
    const characters = '0123456789';
    return makeIdFromChars(characters, 10);
}

export const newRandomSeed = () => {
    const characters = '0123456789ABCDEF';
    return '0x' + makeIdFromChars(characters, 16);
}