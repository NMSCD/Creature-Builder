import { IScreenshotDataProps } from "../contracts/screenshotDataProps";
import { delay } from "./asyncHelper";
import { createImageFromSrcAsync } from "./fileHelper";

export const addWatermarkToImage = async (
    imgFromDataStr: any,
    screenshotData: IScreenshotDataProps
) => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = screenshotData.width;
    tempCanvas.height = screenshotData.height;

    const tempCanvasCtx = tempCanvas.getContext('2d');
    if (tempCanvasCtx == null) return;

    const watermarkImgWidth = 150;
    const watermarkImgHeight = 80;
    const watermarkImgPadding = 10;
    const watermarkImgFromDataStr = await createImageFromSrcAsync(
        './assets/img/watermark.png',
        watermarkImgWidth,
        watermarkImgHeight
    );

    tempCanvasCtx.drawImage(imgFromDataStr, 0, 0);
    tempCanvasCtx.drawImage(
        watermarkImgFromDataStr,
        screenshotData.width - (watermarkImgWidth + watermarkImgPadding),
        screenshotData.height - watermarkImgHeight,
        watermarkImgWidth,
        watermarkImgHeight,
    );

    await delay(250);

    return tempCanvas.toDataURL();
}