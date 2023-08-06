import { Box, Button, Center, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { JsonExplanationBottomModalSheet } from '../../components/dialog/jsonExplanationBottomModalSheet';
import { JsonViewer } from '../../components/jsonViewer';
import { ObjViewer } from '../../components/objViewer/objViewer';
import { PetMainDetails } from '../../contracts/petDetails';
import { delay } from '../../helper/asyncHelper';
import { petGetDescriptorsToHide } from '../../helper/descriptorHelper';
import { toggleHtmlNodeClass } from '../../helper/documentHelper';

interface IBuilderPageResultPreviewProps {
    selectedPet: PetMainDetails;
    mappingString: string;
    descriptorId: string;
    getJsonFromMappings: (localMappingString: string) => string;
    getMappingsFromJson: (event: any) => void;
}

export const BuilderPageResultPreview: React.FC<IBuilderPageResultPreviewProps> = (props: IBuilderPageResultPreviewProps) => {
    const [isJsonExplanationOpen, setJsonExplanationOpen] = useState<boolean>(false);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [showObjPreview, setShowObjPreview] = useState<boolean>(false);

    const toggleJsonExplanation = (isOpen: boolean) => {
        toggleHtmlNodeClass('body', 'noscroll', isOpen);
        setJsonExplanationOpen(isOpen);
    }

    const handleShowPreview = async (show: boolean) => {
        setShowPreview(show);
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

    if (props.selectedPet.CreatureId == null) {
        return (
            <Box flex="2" mt="3" className="hidden-in-mobile"></Box>
        );
    }

    return (
        <Box
            flex={showPreview ? 3 : 2}
            pos="relative"
            className="builder-preview hidden-in-mobile">
            <Box mb="0.75em">
                <Button key="how-to" mr="1em" colorScheme="gray" onClick={() => toggleJsonExplanation(true)}>
                    <span>How to use the JSON</span>
                </Button>
                <Button key={`showPrev: ${showPreview}`} colorScheme="orange" onClick={() => handleShowPreview(!showPreview)}>
                    <span>{showPreview ? 'Disable' : 'Enable'} preview</span>
                </Button>
            </Box>
            {
                showPreview && (
                    <Box className="obj-preview wrapper">
                        <Center
                            id="obj-preview-loader"
                            pos="absolute"
                            className="obj-preview bg"
                            flexDir="column"
                            borderRadius="10em"
                            zIndex="0"
                        >
                            <Spinner />
                            <Text mt="0.5em">Loading...</Text>
                        </Center>
                        {
                            showObjPreview && (
                                <ObjViewer
                                    key={`preview-${props.selectedPet.CreatureId}`}
                                    creatureId={props.selectedPet.CreatureId}
                                    meshesToHide={getMeshesToHide(props.selectedPet, props.mappingString)}
                                />
                            )
                        }
                    </Box>
                )
            }
            <JsonViewer
                json={props.getJsonFromMappings(props.mappingString + ',' + props.descriptorId)}
                getMappingsFromJson={props.getMappingsFromJson}
            />
            <JsonExplanationBottomModalSheet
                isDetailPaneOpen={isJsonExplanationOpen}
                setDetailPaneOpen={toggleJsonExplanation}
            />
        </Box>
    );
}

