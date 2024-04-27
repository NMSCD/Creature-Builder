import { DownloadIcon, InfoOutlineIcon, RepeatIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import { useState } from "react";
import { IScreenshotDataProps } from '../../contracts/screenshotDataProps';
import { addWatermarkToImage } from '../../helper/canvasHelper';
import { createImageFromSrcAsync, downloadFile } from '../../helper/fileHelper';
import { ObjInfoModal } from './objInfoModal';

interface IProps {
    creatureId: string;
    enableRotate: boolean;
    onRepeatClick: (enable: boolean) => void;
    getScreenshotData: () => IScreenshotDataProps;
    setHasLoaded: (hasLoaded: boolean) => void;
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
                        const screenshotData = props.getScreenshotData();

                        const imgFromDataStr = await createImageFromSrcAsync(
                            screenshotData.dataUrl,
                            screenshotData.width,
                            screenshotData.height,
                        );

                        const finalImage = await addWatermarkToImage(imgFromDataStr, screenshotData);
                        if (finalImage == null) return;

                        downloadFile(finalImage, props.creatureId);
                        props.setHasLoaded(true);
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