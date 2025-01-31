import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Container, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import { AboutCreditRow } from '../components/aboutCreditRow';
import { AssistantNmsHomeLink, MeogiYouTubeChannel, NMSHubDiscordLink, MBINCompilerLink, AssistantAppsDiscordLink, NMSCDRepoLink } from '../components/core/link';
import { ExternalImages, ExternalUrl } from '../constants/externalUrl';
import { BasePage } from './basePage';
import { AppImages } from '../constants/image';

export const AboutPage: React.FC = () => {
    return (
        <BasePage className="about-page-content">
            <section>
                <Text fontSize={30} textAlign="center">About</Text>
            </section>

            <section>
                <Container>
                    <Text textAlign="center">This project was started because <MeogiYouTubeChannel /> was looking to improve the companions they were creating for the community.</Text>
                    <br />
                    <Text textAlign="center">
                        Using the knowledge of how companions are built in NMS from <MeogiYouTubeChannel /> and <NMSHubDiscordLink /> and the technical abillities from <AssistantNmsHomeLink />&nbsp;
                        we were able to build this tool.
                    </Text>
                </Container>
            </section>

            <section>
                <Container>
                    <br />
                    <Divider variant="dashed" />
                    <br />
                </Container>
            </section>

            <section>
                <Container>
                    <Center>
                        <Text fontSize={20} mb={4}>Frequently Asked Questsions</Text>
                    </Center>
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    <Text fontSize={18}>Where does the data come from?</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Text>The pet data comes directly from the game files. Thanks to the <MBINCompilerLink /> we can extract information from the game files.</Text>
                                <Text mt={3}>Specifically the <b>*.DESCRIPTOR.MBIN</b> files. These files contain the parts that can be selected based on creature type and other selected parts.</Text>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    <Text fontSize={18}>How do I get access?</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <s><Text>You will need to get in contact with <NMSHubDiscordLink /> or <AssistantNmsHomeLink /> to get a licence key.</Text></s>
                                <Text><br />This tool is now completely free! 🥳</Text>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    <Text fontSize={18}>Why was access limited to select individuals?</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Text>This was because the tool was still under construction and required a lot of testing. Invalid pet JSON can easily break NMS saves. We did our best to ensure that the tool will be safe for everyone to use.</Text>
                                <Text mt={3}>We also did not (and still do not) want people abusing the tool and using it to sell creatures to the community.</Text>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    <Text fontSize={18}>How do I report a bug? 🐛</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Text>You create an issue on the <NMSCDRepoLink /></Text>
                                <br />
                                <Text>Otherwise, you can reach out to:</Text>
                                <Text>- <b>KhaozTopsy</b> on the <AssistantAppsDiscordLink /></Text>
                                <Text>- <b>Meogi</b> on the <NMSHubDiscordLink>NMS Hub Discord</NMSHubDiscordLink></Text>
                                <Text>- <b>Invisible</b> on the <NMSHubDiscordLink>NMS Hub Discord</NMSHubDiscordLink></Text>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Container>
            </section>

            <section>
                <Container>
                    <br />
                    <Divider variant="dashed" />
                    <br />
                </Container>
            </section>

            <section>
                <Container>
                    <Text fontSize={20} textAlign="center">Credits</Text>
                    <AboutCreditRow
                        imageUrl={ExternalImages.assistantNMS}
                        heading="Assistant for No Man's Sky"
                        subtitle="Software Development"
                        link={ExternalUrl.assistantNMS}
                    />
                    <AboutCreditRow
                        imageUrl={AppImages.nmsHub}
                        heading="Invisible from NMS Hub"
                        subtitle="Companion knowledge and Testing"
                        link={ExternalUrl.assistantNMS}
                    />
                    <AboutCreditRow
                        imageUrl={AppImages.meogi}
                        heading="Meogi"
                        subtitle="Companion knowledge and Testing"
                        link={ExternalUrl.meogiYT}
                    />
                    <AboutCreditRow
                        imageUrl={AppImages.silent}
                        heading="Silent"
                        subtitle="Bug hunter"
                        link={ExternalUrl.silent}
                    />
                    <AboutCreditRow
                        imageUrl={ExternalImages.monkeyMan}
                        heading="MBINCompiler"
                        subtitle="Making NMS data mining possible"
                        link={ExternalUrl.assistantNMS}
                    />
                    <AboutCreditRow
                        imageUrl={ExternalImages.nmsdk}
                        heading="NMSDK"
                        subtitle="Extracting 3D models from the game files"
                        link={ExternalUrl.nmsdk}
                    />
                </Container>
            </section>
        </BasePage>
    );
}

