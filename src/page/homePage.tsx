import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Container, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

export const HomePage: React.FC = () => {
    // const { storageService, toastService } = useContext(DependencyInjectionContext);
    // const [, setLocation] = useLocation();

    return (
        <Box className="home-page-content">
            <section>
                <Text fontSize={25} textAlign="center">Build your dream companion!</Text>
            </section>

            <section>
                <Stack spacing={8} direction='row'>
                    <Box p={5} shadow='md' borderWidth='1px'>
                        <Heading fontSize='xl'>Content 1</Heading>
                        <Text mt={4}>The future can be even brighter but a goal without a plan is just a wish</Text>
                    </Box>
                    <Box p={5} shadow='md' borderWidth='1px'>
                        <Heading fontSize='xl'>Content 2</Heading>
                        <Text mt={4}>You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process</Text>
                    </Box>
                </Stack>
            </section>

            <section>
                <Grid
                    ml="2em"
                    mr="2em"
                    minH="200px"
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(5, 1fr)'
                    gap={4}
                >
                    <GridItem rowSpan={2} colSpan={1} bg='tomato' />
                    <GridItem colSpan={2} bg='papayawhip' />
                    <GridItem colSpan={2} bg='papayawhip' />
                    <GridItem colSpan={4} bg='tomato' />
                </Grid>
            </section>

            <section>
                <Container>
                    <Center>
                        <Text fontSize={20} mb={4}>Frequently Asked Questsions</Text>
                    </Center>
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        Section 1 title
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        Section 2 title
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Container>
            </section>
        </Box>
    );
}

