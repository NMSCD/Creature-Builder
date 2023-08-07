import { Box, Button, Center, Divider, Kbd, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from "react";
import { ExternalUrl } from '../../constants/externalUrl';
import { BasicLink } from '../core/link';

interface IProps {
    creatureId: string;
    triggerNodeContent: ReactNode;
}

export const ObjInfoModal: React.FC<IProps> = (props: IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fileExtensions = [
        { ext: 'fbx', scheme: 'purple' },
        { ext: 'obj', scheme: 'orange' },
        { ext: 'mtl', scheme: 'gray' },
    ];

    return (
        <>
            <div onClick={onOpen}>
                <Tooltip label="Information">
                    {props.triggerNodeContent}
                </Tooltip>
            </div>

            <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Info about "{props.creatureId}.fbx"</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text textAlign="center" fontWeight="bold" size="lg" mb={2}>Controls</Text>
                        <Text textAlign="center">
                            <span>Use <Kbd>left click</Kbd> and drag to change the viewing angle of the creature </span><br />
                            <span>Use the <Kbd>scroll wheel</Kbd> to zoom in or out </span><br />
                        </Text>
                        <Divider m="2em" />
                        <Text textAlign="center" fontWeight="bold" size="lg" mb={2}>Are the models accurate?</Text>
                        <Text textAlign="center">
                            <span>The 3D model in the preview window is data-mined from the game using the <BasicLink href={ExternalUrl.nmsdk}>NMSDK</BasicLink> tool </span>
                            <span>which uses the <BasicLink href={ExternalUrl.mbinCompiler}>MBINCompiler</BasicLink>. These two tools are maintained by </span>
                            <span><BasicLink href={ExternalUrl.monkeyman192}>monkeyman192</BasicLink> and the NMS Modding community. Without their work it </span>
                            <span>would not be possible to do any of this, so please give them some love! </span>
                        </Text>
                        <Box m="1em" />
                        <Text textAlign="center">
                            <span>This also means that the models displayed are from the game files with </span>
                            <span>minimal changes. The game may use the models in a way that this site is </span>
                            <span>not aware of, but we are trying our best to display the creatures as close as </span>
                            <span>possible to what the game would.</span>
                        </Text>
                        <Divider m="2em" />
                        <Text textAlign="center" fontWeight="bold" size="lg">How to get the models</Text>
                        <Text textAlign="center">
                            <span><BasicLink href={ExternalUrl.assistantNMS}>AssistantNMS</BasicLink> made use of the NMS community tools to extract </span>
                            <span>the in-game models and render them on this website. The code and models are made publicly available through the </span>
                            <span><BasicLink href={ExternalUrl.nmscd}>NMSCD Organisation</BasicLink>. </span>
                        </Text>
                        <Box m="2em" />
                        <Center>
                            {
                                fileExtensions.map(fe => (
                                    <Button
                                        as={Link} key={fe.ext} m="0.25em" colorScheme={fe.scheme}
                                        href={`/assets/3d/${props.creatureId}.${fe.ext}`}
                                        target="_blank" rel="noopener noreferrer"
                                    >Download {props.creatureId}.{fe.ext}</Button>
                                ))
                            }
                        </Center>
                        <Box m="2em" />
                        <Text textAlign="center">
                            <span>If you like <BasicLink href={ExternalUrl.githubRepo}>this project</BasicLink> and have a Github account, </span>
                            <span>it would be great if you it would be great if you gave this project (and maybe a </span>
                            <span><BasicLink href={ExternalUrl.nmscd}>few others</BasicLink>) some github stars! ⭐</span>
                        </Text>
                        <Box m="2em" />
                    </ModalBody>

                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}