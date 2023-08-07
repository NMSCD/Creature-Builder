import { Box, Button, Center, Spinner, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { JsonViewer } from '../../components/jsonViewer';
import { ObjViewer } from '../../components/objViewer/objViewer';
import { PetExtraInfo } from '../../constants/petExtraInfo';
import { PetMainDetails } from '../../contracts/petDetails';
import { delay } from '../../helper/asyncHelper';
import { petGetDescriptorsToHide } from '../../helper/descriptorHelper';
import { DependencyInjectionContext } from '../../integration/DependencyInjectionProvider';
import { IBuilderPageSettings } from './builderPageSettingsRow';

interface IBuilderPageResultPreviewProps {
    selectedPet: PetMainDetails;
    mappingString: string;
    descriptorId: string;
    settings: IBuilderPageSettings;
    setSettings: (func: (newState: IBuilderPageSettings) => IBuilderPageSettings) => void;
    getJsonFromMappings: (localMappingString: string) => string;
    getMappingsFromJson: (event: any) => void;
}

export const BuilderPageResultPreview: React.FC<IBuilderPageResultPreviewProps> = (props: IBuilderPageResultPreviewProps) => {
    const { toastService } = useContext(DependencyInjectionContext);

    const showPreview = props.settings.showModelPreview;
    const showJsonPreview = props.settings.showJsonPreview;
    const json = props.getJsonFromMappings(props.mappingString + ',' + props.descriptorId);

    const [showObjPreview, setShowObjPreview] = useState<boolean>(false);

    const copyJson = () => {
        navigator?.clipboard?.writeText?.(json)?.then?.(() => {
            toastService.success(<span>Copied!</span>)
        });
    }

    useEffect(() => {
        const effectShowPreview = props.settings.showModelPreview;
        if (effectShowPreview !== showObjPreview) {
            handleShowPreview(effectShowPreview);
        }
    }, [props.settings.showModelPreview, showObjPreview]);

    const handleShowPreview = async (show: boolean) => {
        await delay(300);
        setShowObjPreview(show);
    }

    const getMeshesToHide = (selectedPet: PetMainDetails, mappingString: string): string => {
        const selectedDescriptors: Array<string> = mappingString.split(',');

        const allDescriptorsToHide: Array<string> = petGetDescriptorsToHide(
            selectedPet,
            selectedDescriptors
        );

        return allDescriptorsToHide.join(',');
    }

    const getFlex = (showModelPreview: boolean, showJsonPreview: boolean): number => {
        if (showModelPreview === false && showJsonPreview === false) return 1;
        if (showModelPreview) return 6;
        return 4;
    }

    if (props.selectedPet.CreatureId == null) {
        return (
            <Box flex="2" mt="3" className="hidden-in-mobile"></Box>
        );
    }

    const creatureId = props.selectedPet.CreatureId;
    const petExtraInfoObj = PetExtraInfo[creatureId];
    const cameraInitZoom = petExtraInfoObj.initialZoom ?? 1;
    const cameraPositionZ = petExtraInfoObj.initialCameraZ ?? 8;
    const initPositionY = petExtraInfoObj.initialHeight ?? -1;

    return (
        <Box
            flex={getFlex(showPreview, showJsonPreview)}
            pos="relative"
            className="builder-preview hidden-in-mobile">
            {
                showPreview && (
                    <Box className="obj-preview noselect wrapper">
                        <Center
                            id="obj-preview-loader"
                            pos="absolute"
                            className="obj-preview bg"
                            flexDir="column"
                            borderRadius="10em"
                            draggable="false"
                            zIndex="0"
                        >
                            <Spinner />
                            <Text mt="0.5em">Loading...</Text>
                        </Center>
                        {
                            showObjPreview && (
                                <ObjViewer
                                    key={`preview-${creatureId}`}
                                    creatureId={creatureId}
                                    cameraInitZoom={cameraInitZoom}
                                    cameraPositionZ={cameraPositionZ}
                                    initPositionY={initPositionY}
                                    meshesToHide={getMeshesToHide(props.selectedPet, props.mappingString)}
                                />
                            )
                        }
                    </Box>
                )
            }
            {
                showJsonPreview
                    ? (
                        <JsonViewer
                            json={json}
                            copyJson={copyJson}
                            getMappingsFromJson={props.getMappingsFromJson}
                        />
                    )
                    : (
                        <Button width="100%" colorScheme="purple" onClick={copyJson}>Copy JSON to clipboard</Button>
                    )
            }
        </Box>
    );
}

