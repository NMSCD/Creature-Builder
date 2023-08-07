
export const downloadFile = (dataUrl: any, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    link.remove();
}

export const createImageFromSrcAsync = (
    src: any,
    width?: number,
    height?: number,
): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const tempImg = new Image(width, height);
        tempImg.onload = () => {
            resolve(tempImg);
        };
        tempImg.src = src;

        tempImg.onerror = reject;
    })
}