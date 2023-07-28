import { Box, Button, Center, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { JsonExplanationBottomModalSheet } from '../../components/dialog/jsonExplanationBottomModalSheet';
import { JsonViewer } from '../../components/jsonViewer';
import { ObjViewer } from '../../components/objViewer';
import { PetDetailDescriptor, PetMainDetails } from '../../contracts/petDetails';
import { delay } from '../../helper/asyncHelper';
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

    const recursiveGetDescriptorsToHide = (descriptor: PetDetailDescriptor, selectedDescriptors: Array<string>): Array<string> => {
        const result: Array<string> = [];


        if (descriptor.Children == null || descriptor.Children.length < 1) {
            if (selectedDescriptors.includes(descriptor.Id)) {
                return [];
            }
            return [descriptor.Name];
        }

        for (const child of descriptor.Children) {
            if (child.Descriptors == null || child.Descriptors.length < 1) {
                result.push(child.GroupId);
                continue;
            }

            for (const innerDescriptor of child.Descriptors) {
                const recursiveResults = recursiveGetDescriptorsToHide(innerDescriptor, selectedDescriptors);
                for (const recurItem of recursiveResults) {
                    result.push(recurItem);
                }
            }
        }

        return result;
    }

    const getMeshesToHide = (selectedPet: PetMainDetails, mappingString: string): string => {
        console.clear();
        console.log(mappingString)
        const selectedDescriptors: Array<string> = mappingString.split(',');
        const allDescriptorsToHide: Array<string> = [];

        for (const detail of selectedPet.Details) {
            for (const descriptor of detail.Descriptors) {
                const recursiveResults = recursiveGetDescriptorsToHide(descriptor, selectedDescriptors);
                for (const recurItem of recursiveResults) {
                    allDescriptorsToHide.push(recurItem);
                }
            }
        }

        // console.log(selectedDescriptors);
        console.log(allDescriptorsToHide);
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
            pos="relative" mt="3"
            className="builder-preview hidden-in-mobile">
            <Box
                pos="absolute"
                top="0"
                left="0"
                transform="translateY(-125%)"
            >
                <Button key="how-to" mr="1em" onClick={() => toggleJsonExplanation(true)}>
                    <span>How to use the JSON</span>
                </Button>
                <Button key={`showPrev: ${showPreview}`} colorScheme="orange" onClick={() => handleShowPreview(!showPreview)}>
                    <span>{showPreview ? 'Disable' : 'Enable'} preview (experimental)</span>
                </Button>
            </Box>
            {
                showPreview && (
                    <Box className="obj-preview wrapper">
                        <Center pos="absolute" zIndex="-1" className="obj-preview" flexDir="column">
                            <Spinner />
                            <Text mt="0.5em">Loading...</Text>
                        </Center>
                        {
                            showObjPreview && (
                                <ObjViewer
                                    key={`preview-${props.selectedPet.CreatureId}`}
                                    file={props.selectedPet.CreatureId}
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

