import { ArrowForwardIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'wouter';
import { Routes } from '../../constants/routes';
import { AssistantNmsHomeLink, MeogiYouTubeChannel, NMSCDLink, NMSHubDiscordLink } from '../core/link';
import { HiddenInElectron } from './electronVisible';

interface IAppDrawer {
}

export const AppDrawer: React.FC<IAppDrawer> = (props: IAppDrawer) => {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const onMenuClick = (e: any) => {
        e?.preventDefault?.();

        const event = new Event('hashchange');
        window.dispatchEvent(event);

        setMenuOpen(false);
    }


    return (
        <>
            <HamburgerIcon
                position="absolute"
                top="1em"
                right="1em"
                fontSize="2em"
                className="pointer"
                _hover={{ color: 'lightgrey' }}
                onClick={() => setMenuOpen(true)}
            />
            <Drawer
                isOpen={isMenuOpen}
                placement='right'
                onClose={() => setMenuOpen(false)}
            >
                <DrawerOverlay />
                <DrawerContent className="app-drawer">
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <Divider mb={2} />

                    <DrawerBody>
                        <Text mb={2}>Pages</Text>
                        <List spacing={3}>
                            <HiddenInElectron>
                                <ListItem>
                                    <ListIcon as={ArrowForwardIcon} />
                                    <Link to={Routes.home} onClick={onMenuClick}>Home</Link>
                                </ListItem>
                            </HiddenInElectron>
                            <ListItem>
                                <ListIcon as={EditIcon} />
                                <Link to={Routes.home + Routes.builder} onClick={onMenuClick}>Builder</Link>
                            </ListItem>
                            <ListItem>
                                <ListIcon as={QuestionOutlineIcon} />
                                <Link to={Routes.home + Routes.about} onClick={onMenuClick}>About</Link>
                            </ListItem>
                        </List>
                        <Divider mt={5} mb={5} />
                        <Text mb={2}>Links</Text>
                        <List spacing={3}>
                            <ListItem>
                                <AssistantNmsHomeLink />&nbsp;<ExternalLinkIcon />
                            </ListItem>
                            <ListItem>
                                <NMSCDLink />&nbsp;<ExternalLinkIcon />
                            </ListItem>
                            <ListItem>
                                <MeogiYouTubeChannel />&nbsp;<ExternalLinkIcon />
                            </ListItem>
                            <ListItem>
                                <NMSHubDiscordLink />&nbsp;<ExternalLinkIcon />
                            </ListItem>
                        </List>
                    </DrawerBody>

                    {/* <DrawerFooter>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </>
    );
}

