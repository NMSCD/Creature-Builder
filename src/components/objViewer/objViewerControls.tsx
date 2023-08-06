import { DownloadIcon, RepeatIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import { useState } from "react";
import { bgColour } from '../../constants/UIConstant';
import { delay } from '../../helper/asyncHelper';
import { createImageFromSrcAsync, downloadFile } from '../../helper/fileHelper';
import { ObjInfoModal } from './objInfoModal';

interface IProps {
    creatureId: string;
    onRepeatClick: (enable: boolean) => void;
    accessRenderer: () => any;
}

export const ObjViewerControls: React.FC<IProps> = (props: IProps) => {
    const [, setEnableRotate] = useState<boolean>(false);

    const iconSize = '1.5em';

    return (
        <>
            <ObjInfoModal
                creatureId={props.creatureId}
                triggerNodeContent={(
                    <InfoOutlineIcon
                        pos="absolute"
                        top="1em"
                        left="1em"
                        boxSize={iconSize}
                        className="pointer"
                    />
                )}
            />

            <Tooltip label="Download image">
                <DownloadIcon
                    pos="absolute"
                    top="1em"
                    right="1em"
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

                        const watermarkImgWidth = 100;
                        const watermarkImgHeight = 50;
                        const watermarkImgPadding = 10;
                        const watermarkImgFromDataStr = await createImageFromSrcAsync(
                            '/assets/img/banner.svg',
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
                    right="1em"
                    bottom="1em"
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