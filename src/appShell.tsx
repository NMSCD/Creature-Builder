import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react'
import { Header } from './components/core/header';
import { Footer } from './components/core/footer';
import { BuilderApp } from './builderApp';
import { AssistantAppsApiService } from './services/api/AssistantAppsApiService';
import { PlatformType } from './contracts/generated/AssistantApps/Enum/platformType';
import { ToastContainer } from 'react-toastify';
import { ToastService } from './services/toastService';
import { currentServerVersionNum } from './constants/assistantApps';

export const AppShell: React.FC = () => {
    const [hasCheckedUpdate, setHasCheckedUpdate] = useState<boolean>(false);

    useEffect(() => {
        updateCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCheck = async () => {
        const service = new AssistantAppsApiService(); // move to Dependency Injection
        const apiResult = await service.getLatest([PlatformType.Windows]);
        console.log({ updateCheck: { ...apiResult }, hasCheckedUpdate })
        if (apiResult.isSuccess === false) return;

        const versionNumFromServer = apiResult.value?.buildNumber ?? 0;
        if (versionNumFromServer > currentServerVersionNum) {
            setHasCheckedUpdate((hasChecked: boolean) => {
                if (!hasChecked)
                    showUpdateToastMessage();

                return true;
            })
        }
    }

    const showUpdateToastMessage = () => {
        const service = new ToastService(); // move to Dependency Injection
        service.info(<span className="noselect">There is an update available!</span>, { autoClose: 20000 })
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

