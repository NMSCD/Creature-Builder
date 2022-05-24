import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BuilderApp } from './builderApp';
import { Footer } from './components/core/footer';
import { Header } from './components/core/header';
import { currentServerVersionNum } from './constants/assistantApps';
import { PlatformType } from './contracts/generated/AssistantApps/Enum/platformType';
import { DependencyInjectionContext } from './integration/DependencyInjectionProvider';

export const AppShell: React.FC = () => {
    const [hasCheckedUpdate, setHasCheckedUpdate] = useState<boolean>(false);
    const services = useContext(DependencyInjectionContext);

    useEffect(() => {
        updateCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCheck = async () => {
        const apiResult = await services.assistantAppsApiService.getLatest([PlatformType.Windows]);
        console.log({ updateCheck: { ...apiResult }, hasCheckedUpdate })
        if (apiResult.isSuccess === false) return;

        const versionNumFromServer = apiResult.value?.buildNumber ?? 0;
        if (versionNumFromServer > currentServerVersionNum) {
            setHasCheckedUpdate((hasChecked: boolean) => {
                if (hasChecked == false) {
                    services.toastService.info(
                        <span className="noselect">There is an update available!</span>,
                        { autoClose: 20000 }
                    )
                }

                return true;
            })
        }
    }

    return (
        <Box key="app-shell-box" w='100%' pt={4}>
            <Header />
            <BuilderApp />
            <Footer />
            <ToastContainer
                position="bottom-right"
                theme="colored"
                autoClose={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
        </Box>
    );
}

