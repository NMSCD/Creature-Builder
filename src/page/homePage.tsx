import { Box, Center, Flex, Heading, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Zoom from 'react-medium-image-zoom';
import { NMSCDLink } from '../components/core/link';
import { BasePage } from './basePage';

export const HomePage: React.FC = () => {

    return (
        <BasePage className="home-page-content">
            <section>
                <Text fontSize={30} textAlign="center">Build your dream companion!</Text>
            </section>

            <br />

            <section>
                <Flex direction="row">
                    <Spacer className="hidden-in-mobile" maxW="200px" />
                    <Box p={5}>
                        <Zoom zoomMargin={50} overlayBgColorEnd="rgba(0, 0, 0, 0.85)">
                            <Image src="./assets/img/easyToUse.png" className="round" maxH="350px" draggable={false} />
                        </Zoom>
                    </Box>
                    <Box flex="1" p={5}>
                        <Center height="100%">
                            <VStack align="stretch">
                                <Heading fontSize={30}>Simplified UI</Heading>
                                <Text mt={4}>This tool aims to make the selecting of creature parts as simple as possible while giving you the ability to change almost everything about your companion.</Text>
                                <Text mt={4}>The companion part dropdowns will hide and show based on previous selections, making sure that you do not cause your creatures to have invisible or broken parts.</Text>
                            </VStack>
                        </Center>
                    </Box>
                    <Spacer className="hidden-in-mobile" maxW="200px" />
                </Flex>
            </section>

            <br />

            <section>
                <Flex direction="row">
                    <Spacer className="hidden-in-mobile" maxW="200px" />
                    <Box flex="1" p={5}>
                        <Center height="100%">
                            <VStack align="stretch">
                                <Heading fontSize={30}>Valid &amp; Safe to use JSON</Heading>
                                <Text mt={4}>Editing your save files can be dangerous, the slightest mistake can cause your save file to no longer be valid. That is why our JSON export is thoroughly tested.</Text>
                            </VStack>
                        </Center>
                    </Box>
                    <Box p={5}>
                        <Zoom zoomMargin={50} overlayBgColorEnd="rgba(0, 0, 0, 0.85)">
                            <Image src="./assets/img/easyToUse2.png" className="round" maxH="350px" draggable={false} />
                        </Zoom>
                    </Box>
                    <Spacer className="hidden-in-mobile" maxW="200px" />
                </Flex>
            </section>

            <br />

            <section>
                <Flex direction="row">
                    <Spacer className="hidden-in-mobile" maxW="200px" />
                    <Box p={5}>
                        <Image src="./assets/img/underConstruction.svg" className="round" maxH="300px" draggable={false} />
                    </Box>
                    <Box flex="1" p={5}>
                        <Center height="100%">
                            <VStack align="stretch">
                                <Heading fontSize={30}>Actively being worked on</Heading>
                                <Text mt={4}>This project is actively being maintained with new features being added. Once the project becomes stable and fully open to the public, the plan is to hand over the project source code the the <NMSCDLink />. This will help ensure that the community can keep it up to date and working for as long as possible.</Text>
                            </VStack>
                        </Center>
                    </Box>
                    <Spacer className="hidden-in-mobile" maxW="200px" />
                </Flex>
            </section>

            <section>
                <br />
                <br />
            </section>
        </BasePage>
    );
}

