import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Center, Input, Spinner, ThemeTypings, Text } from '@chakra-ui/react';
import { useLocation } from "wouter";
import { Footer } from '../components/common/footer';
import { ExternalUrl } from '../constants/externalUrl';
import { developmentLicenceKey } from '../constants/licence';
import { NetworkState } from '../contracts/enum/networkState';
import { Routes } from '../constants/routes';
import { StorageKey } from '../constants/storageKey';
import { LicenceContents } from '../contracts/file/licenceFile';
import { isDevMode } from '../helper/envHelper';
import { DependencyInjectionContext } from '../integration/DependencyInjectionProvider';
import { newRandomSeed } from '../helper/idHelper';
import { patronOAuthUrl } from '../integration/patreonOAuth';
import { ResultWithValue } from '../contracts/results/ResultWithValue';

export const LoginPage: React.FC = () => {
    const [licenceKey, setLicenceKey] = useState<string>('');
    const [btnColourScheme, setBtnColourScheme] = useState<ThemeTypings["colorSchemes"]>();
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Pending);
    const [deviceId, setDeviceId] = useState<string>();
    const [, setLocation] = useLocation();
    const { storageService, toastService, assistantAppsApiService, oAuthClient } =
        useContext(DependencyInjectionContext);

    useEffect(() => {
        console.log({ deviceId });
        if (deviceId == null || oAuthClient.isConnected() === false) {
            setTimeout(() => {
                setDeviceId(newRandomSeed());
            }, 1000);
            return;
        }

        oAuthClient.joinGroup(deviceId);
        oAuthClient.listenToOAuth(handlePatreonPayload);

        return () => {
            oAuthClient.leaveGroup(deviceId);
            oAuthClient.removeListenToOAuth(handlePatreonPayload);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceId]);

    const handlePatreonPayload = async (payload: any): Promise<void> => activateLicenceKeyBase(
        (_: string) => assistantAppsApiService.activateLicenceForPatron(deviceId!)
    )

    const submitLicenceKey = async () => activateLicenceKeyBase(
        (licenceKey: string) => assistantAppsApiService.activateLicence(licenceKey)
    );

    const activateLicenceKeyBase = async (activateLicence: (licenceKey: string) => Promise<ResultWithValue<string>>) => {
        if (networkState === NetworkState.Loading) return;
        setNetworkState(NetworkState.Loading);

        const contents: LicenceContents = {
            licenceHash: licenceKey,
        };

        if (isDevMode() && licenceKey !== developmentLicenceKey) {
            const licenceResult = await activateLicence(licenceKey);
            if (licenceResult.isSuccess === false) {
                toastService.error(<span className="noselect">{licenceResult.errorMessage ?? 'Something went wrong'}</span>);
                setNetworkState(NetworkState.Success);
                return;
            }
            contents.licenceHash = licenceResult.value;
        }

        try {
            await storageService.writeFile(StorageKey.licenceFile, contents);
            setLocation(Routes.home);
        } catch (e: any) {
            console.error({ ...e });
            toastService.error(
                <span className="noselect">Failed to save Licence information</span>
            )
        }

        setNetworkState(NetworkState.Success);
    }

    const patreonRedirect = () => {
        if (deviceId == null) return;
        const url = patronOAuthUrl(deviceId);
        console.log('patreon-url', url);
        window.open(url, "mywindow", "resizable=1,width=800,height=800");
    }

    return (
        <Center className="login-page" flexDirection="column">
            <Box className="blurred-box">
                <div className="nms-login-box">
                    {
                        (networkState === NetworkState.Loading)
                            ? (
                                <Center className="nms-icon">
                                    <Spinner size="xl" mt="1.5em" />
                                </Center>
                            )
                            : (
                                <img
                                    src="https://avatars.githubusercontent.com/u/54021133?s=200"
                                    alt="AssistantNMS"
                                    className="nms-icon"
                                />
                            )
                    }

                    <div className="explanation">
                        AssistantNMS<br />
                        Application access restricted. <br />
                        Please contact <a href={ExternalUrl.nmsHubDiscord} target="_blank" rel="noopener noreferrer" title="NMS Hub">NMS Hub</a> for access.
                    </div>
                    <Input
                        placeholder="Licence key"
                        value={licenceKey}
                        focusBorderColor='#f03a73'
                        disabled={networkState === NetworkState.Loading}
                        onChange={(event: any) => {
                            const newValue = event?.target?.value ?? '';
                            setLicenceKey(newValue);
                            setBtnColourScheme(newValue.length > 0 ? 'red' : undefined);
                        }}
                    />
                    <Button
                        mt={3}
                        colorScheme={btnColourScheme}
                        disabled={networkState === NetworkState.Loading}
                        onClick={() => submitLicenceKey()}
                    >Submit Licence Key</Button>
                    <Text mt={3} display="none">OR</Text>
                    <Button
                        mt={3}
                        display="none"
                        backgroundColor="#FF424D"
                        _hover={{ backgroundColor: '#ff8742' }}
                        isLoading={oAuthClient.isConnected() === false}
                        loadingText="Log in with Patreon"
                        disabled={networkState === NetworkState.Loading || oAuthClient.isConnected() === false}
                        onClick={() => patreonRedirect()}
                    >Log in with Patreon</Button>

                    {
                        (networkState === NetworkState.Error) && (
                            <Box textAlign="center">
                                Something went wrong activating your key
                            </Box>
                        )
                    }
                </div>
            </Box>
            <Footer className="small" />
        </Center>
    );
}

