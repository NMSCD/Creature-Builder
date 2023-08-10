import { Box, Card, CardBody, CardHeader, Center, Container, Spinner, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Markdown } from '../components/common/markdown';
import { assistantAppsAppGuid } from '../constants/assistantApps';
import { NetworkState } from '../contracts/enum/networkState';
import { VersionViewModel } from '../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';
import { DependencyInjectionContext } from '../integration/DependencyInjectionProvider';
import { BasePage } from './basePage';

export const ChangelogPage: React.FC = () => {
    const [winItems, setWinItems] = useState<Array<VersionViewModel>>([]);
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);

    const { toastService, assistantAppsApiService } =
        useContext(DependencyInjectionContext);

    useEffect(() => {
        fetchWinItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchWinItems = async () => {
        setNetworkState(NetworkState.Loading);

        const search = {
            appGuid: assistantAppsAppGuid,
            languageCode: 'en', page: 1, platforms: [],
        };
        const itemsResult = await assistantAppsApiService.getWhatIsNewItems(search)
        if (itemsResult.isSuccess === false) {
            toastService.error('Could not fetch changelog details');
            setNetworkState(NetworkState.Error);
            return;
        }

        setWinItems(itemsResult.value);
        setNetworkState(NetworkState.Success);
    }

    return (
        <BasePage className="about-page-content">
            <section>
                <Text fontSize={30} textAlign="center">Changelog</Text>
            </section>

            {
                networkState === NetworkState.Loading && (
                    <Center flexDir="column" draggable="false">
                        <Spinner />
                        <Text mt="0.5em">Loading...</Text>
                    </Center>
                )
            }

            {
                networkState === NetworkState.Error && (
                    <Center flexDir="column" draggable="false">
                        <Text mt="0.5em">Something went wrong...</Text>
                    </Center>
                )
            }

            {
                networkState === NetworkState.Success && (
                    <Container width="700px" maxW="80%">
                        {
                            winItems.map(wi => (
                                <Card mb="1em">
                                    <CardHeader>
                                        {wi.buildName}
                                    </CardHeader>
                                    <CardBody pt="0">
                                        <Box px="1.5em">
                                            <Markdown markdown={wi.markdown} />
                                        </Box>
                                    </CardBody>
                                </Card>
                            ))
                        }
                    </Container>
                )
            }

        </BasePage>
    );
}

