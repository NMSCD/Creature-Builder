import { Box, Button, Center, Input, Spinner, ThemeTypings } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useLocation } from "wouter";
import { Footer } from '../components/core/footer';
import { ExternalUrl } from '../constants/externalUrl';
import { NetworkState } from '../constants/networkState';
import { Routes } from '../constants/routes';
import { StorageKey } from '../constants/storageKey';
import { LicenceContents } from '../contracts/file/licenceFile';
import { DependencyInjectionContext } from '../integration/DependencyInjectionProvider';

export const LoginPage: React.FC = () => {
    const [licenceKey, setLicenceKey] = useState<string>('');
    const [btnColourScheme, setBtnColourScheme] = useState<ThemeTypings["colorSchemes"]>();
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Pending);
    const [, setLocation] = useLocation();
    const { storageService, toastService, assistantAppsApiService } =
        useContext(DependencyInjectionContext);

    const submitLicenceKey = async () => {
        setNetworkState(NetworkState.Loading);
        const licenceResult = await assistantAppsApiService.activateLicence(licenceKey);
        if (licenceResult.isSuccess == false) {
            toastService.error(<span className="noselect">{licenceResult.errorMessage ?? 'Something went wrong'}</span>);
            setNetworkState(NetworkState.Success);
            return;
        }

        const contents: LicenceContents = {
            licenceHash: licenceResult.value,
        };
        try {
            await storageService.writeFile(StorageKey.licenceFile, contents);
            setLocation(Routes.home);
        } catch (e: any) {
            toastService.error(
                <span className="noselect">Failed to save Licence information</span>
            )
        }

        setNetworkState(NetworkState.Success);
    }

    return (
        <Center className="login-page" flexDirection="column">
            <Box className="blurred-box">
                <div className="nmscd-login-box">
                    {
                        (networkState === NetworkState.Loading)
                            ? (
                                <Center className="nmscd-icon">
                                    <Spinner size="xl" mt="1.5em" />
                                </Center>
                            )
                            : (
                                <img
                                    src="https://avatars.githubusercontent.com/u/62565964?s=200"
                                    alt="NMSCD"
                                    className="nmscd-icon"
                                />
                            )
                    }

                    <div className="explanation">
                        NMSCD<br />
                        Application access restricted. <br />
                        Please contact <a href={ExternalUrl.nmsHubDiscord} target="_blank" rel="noopener noreferrer" title="NMS Hub">NMS Hub</a> for access.
                    </div>
                    <Input
                        placeholder="Licence key"
                        value={licenceKey}
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
                    >SUBMIT</Button>
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

