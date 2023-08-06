import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

interface IProps {
}

export const DonationFAB: React.FC<IProps> = (props: IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div className="fab pointer" onClick={onOpen}>
                <Image src="/assets/img/donation.png" maxW="80px" />
            </div>

            <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Donations options</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text textAlign="center" mb="2em">
                            <span>This website is only thanks to collaboration of multiple people and groups.&nbsp;</span>
                            <span></span>
                        </Text>
                        <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="center">AssistantNMS</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Box m="2em" />
                                    <assistant-apps-donation-option-list />
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="center">Meogi</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Box m="2em" />
                                    <assistant-apps-donation-option-list />
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                        <Box m="2em" />
                    </ModalBody>

                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

