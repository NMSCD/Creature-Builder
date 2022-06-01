import { ChevronRightIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, InfoOutlineIcon, UnlockIcon } from '@chakra-ui/icons';
import { Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'wouter';
import { Routes } from '../../constants/routes';
import { AssistantNmsHomeLink, MeogiYouTubeChannel, NMSHubDiscordLink } from '../core/link';
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
                                    <ListIcon as={ChevronRightIcon} />
                                    <Link to={Routes.home} onClick={onMenuClick}>Home</Link>
                                </ListItem>
                            </HiddenInElectron>
                            <ListItem>
                                <ListIcon as={InfoOutlineIcon} />
                                <Link to={Routes.home + Routes.about} onClick={onMenuClick}>About</Link>
                            </ListItem>
                            <ListItem>
                                <ListIcon as={UnlockIcon} />
                                <Link to={Routes.home + Routes.login} onClick={onMenuClick}>Login</Link>
                            </ListItem>
                            <ListItem>
                                <ListIcon as={EditIcon} />
                                <Link to={Routes.home + Routes.builder} onClick={onMenuClick}>Builder</Link>
                            </ListItem>
                        </List>
                        <Divider mt={5} mb={5} />
                        <Text mb={2}>Links</Text>
                        <List spacing={3}>
                            <ListItem>
                                <AssistantNmsHomeLink />&nbsp;<ExternalLinkIcon />
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

