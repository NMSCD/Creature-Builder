import { DownloadIcon, RepeatIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import { useState } from "react";
import { bgColour } from '../../constants/UIConstant';
import { delay } from '../../helper/asyncHelper';
import { createImageFromSrcAsync, downloadFile } from '../../helper/fileHelper';
import { ObjInfoModal } from './objInfoModal';

interface IProps {
    creatureId: string;
    enableRotate: boolean;
    onRepeatClick: (enable: boolean) => void;
    accessRenderer: () => any;
}

export const ObjViewerControls: React.FC<IProps> = (props: IProps) => {
    const [, setEnableRotate] = useState<boolean>(props.enableRotate);

    const iconSize = '3.5em';

    return (
        <>
            <ObjInfoModal
                creatureId={props.creatureId}
                triggerNodeContent={(
                    <InfoOutlineIcon
                        pos="absolute"
                        top="0"
                        left="0"
                        p="1em"
                        boxSize={iconSize}
                        className="pointer"
                    />
                )}
            />

            <Tooltip label="Download image">
                <DownloadIcon
                    pos="absolute"
                    top="0"
                    right="0"
                    p="1em"
                    boxSize={iconSize}
                    className="pointer"
                    onClick={async () => {
                        const renderer = props.accessRenderer();
                        renderer.setClearColor(bgColour, 0);
                        const loaderNode = document.querySelector('#obj-preview-loader');
                        if (loaderNode) {
                            (loaderNode as any).style.zIndex = 4;
                        }

                        const tempCanvas = document.createElement('canvas');
                        const canvasWidth = renderer.domElement.width;
                        const canvasHeight = renderer.domElement.height;
                        tempCanvas.width = canvasWidth;
                        tempCanvas.height = canvasHeight;

                        const tempCanvasCtx = tempCanvas.getContext('2d');
                        if (tempCanvasCtx == null) return;

                        const watermarkImgWidth = 150;
                        const watermarkImgHeight = 80;
                        const watermarkImgPadding = 10;
                        const watermarkImgFromDataStr = await createImageFromSrcAsync(
                            '/assets/img/watermark.png',
                            watermarkImgWidth,
                            watermarkImgHeight
                        );

                        const imgFromDataStr = await createImageFromSrcAsync(
                            renderer.domElement.toDataURL(),
                            canvasWidth,
                            canvasHeight,
                        );

                        tempCanvasCtx.drawImage(imgFromDataStr, 0, 0);
                        tempCanvasCtx.drawImage(
                            watermarkImgFromDataStr,
                            canvasWidth - (watermarkImgWidth + watermarkImgPadding),
                            canvasHeight - watermarkImgHeight,
                            watermarkImgWidth,
                            watermarkImgHeight,
                        );

                        await delay(250);

                        const finalImage = tempCanvas.toDataURL();
                        downloadFile(finalImage, props.creatureId);
                        renderer.setClearColor(bgColour);
                        if (loaderNode) {
                            (loaderNode as any).style.zIndex = null;
                        }
                    }}
                />
            </Tooltip>

            <Tooltip label="Toggle rotation">
                <RepeatIcon
                    pos="absolute"
                    right="0"
                    bottom="0"
                    p="1em"
                    boxSize={iconSize}
                    className="pointer"
                    onClick={() => {
                        setEnableRotate(prev => {
                            const newV = !prev;
                            props.onRepeatClick(newV);
                            return newV;
                        });
                    }}
                />
            </Tooltip>
        </>
    );
}