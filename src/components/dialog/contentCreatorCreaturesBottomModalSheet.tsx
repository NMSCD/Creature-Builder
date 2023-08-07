import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, Center, Container, Flex, Heading, Image, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import { contentCreatorCreatures, IContentCreatorCreatures } from '../../constants/contentCreatorCreatures';
import { delay } from '../../helper/asyncHelper';
import { IBuilderPageSettings } from '../../page/builder/builderPageSettingsRow';
import { BasicLink } from '../core/link';
import { BottomModalSheet } from './bottomModalSheet';

interface IProps {
    isDetailPaneOpen: boolean;
    closeModal: () => void;
    triggerJsonInterval: () => void;
    getMappingsFromJson: (event: any) => void;
    setDetailPaneOpen: (isOpen: boolean) => void;
    setSettings: (func: (newState: IBuilderPageSettings) => IBuilderPageSettings) => void;
}

export const ContentCreatorCreaturesBottomModalSheet: React.FC<IProps> = (props: IProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchJsonAndSetCreatureJson = (creature: IContentCreatorCreatures) => async () => {
        setIsLoading(true);
        const jsonResp = await fetch(`${creature.baseFolder}/${creature.jsonPath}`);
        const jsonData = await jsonResp.json();

        if (creature.settingsToForce != null) {
            props.setSettings((newState: IBuilderPageSettings) => ({
                ...newState,
                ...creature.settingsToForce,
            }))
        }
        props.getMappingsFromJson({ target: { value: JSON.stringify(jsonData) } });
        await delay(500);

        setIsLoading(false);
        props.closeModal();
    }

    return (
        <BottomModalSheet
            isOpen={props.isDetailPaneOpen}
            onClose={() => props.setDetailPaneOpen(false)}
            snapPoints={[600]}
        >
            <Container minWidth="70%" textAlign="center">
                <Wrap>
                    {
                        contentCreatorCreatures.map(ccc => (
                            <WrapItem key={ccc.baseFolder}>
                                <Card>
                                    <CardBody>
                                        <Flex>
                                            <Box flex="4" ml={3} textAlign="left">
                                                <Heading textAlign="left" size="xl" color="white">{ccc.creatureName}</Heading>
                                                <BasicLink href={ccc.link}>
                                                    <Text align="left" display="inline">by {ccc.creator}</Text>
                                                </BasicLink>
                                            </Box>
                                            {
                                                ccc.images.map(image => (
                                                    <Box key={image} flex="1" mt={2} mx={1}>
                                                        <Zoom zoomMargin={50} overlayBgColorEnd="rgba(0, 0, 0, 0.85)">
                                                            <Image src={`${ccc.baseFolder}/${image}`} className="noselect round" maxH="50em" draggable={false} borderRadius={5} />
                                                        </Zoom>
                                                    </Box>
                                                ))
                                            }
                                            <Center
                                                flex="1"
                                                flexDir="column"
                                                className="pointer"
                                                onClick={fetchJsonAndSetCreatureJson(ccc)}
                                            >
                                                <ChevronRightIcon boxSize="2em" />
                                                <Text>Customise</Text>
                                            </Center>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            </WrapItem>
                        ))
                    }
                </Wrap>
                {
                    isLoading && (
                        <Center
                            pos="fixed"
                            flexDir="column"
                            draggable="false"
                            background="rgba(0,0,0,0.5)"
                            transition="background 250ms ease-in-out"
                            top="0"
                            left="0"
                            width="100vw"
                            height="100vh"
                            zIndex="1000"
                        >
                            <Spinner />
                            <Text mt="0.5em">Loading...</Text>
                        </Center>
                    )
                }

            </Container>
        </BottomModalSheet >
    );
}