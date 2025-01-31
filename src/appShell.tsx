import { PlatformType } from '@assistantapps/assistantapps.api.client';
import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Router } from "wouter";
import { AppDrawer } from './components/common/appDrawer';
import { Footer } from './components/common/footer';
import { Header } from './components/common/header';
import { currentServerVersionNum } from './constants/assistantApps';
import { Routes } from './constants/routes';
import { DependencyInjectionContext } from './integration/DependencyInjectionProvider';
import { AboutPage } from './page/aboutPage';
import { BuilderPage } from './page/builder/builderPage';
import { ChangelogPage } from './page/changelogPage';
import { HomePage } from './page/homePage';
import { LoginPage } from './page/loginPage';
import { NotFoundPage } from './page/notFoundPage';

const currentLocation = () =>
    window.location.hash.replace(/^#/, "") || "/";

const navigate = (to: any) => (window.location.hash = to);

const useHashLocation: any = () => {
    const [loc, setLoc] = useState(currentLocation());

    useEffect(() => {
        // this function is called whenever the hash changes
        const handler = () => setLoc(currentLocation());

        // subscribe to hash changes
        window.addEventListener("hashchange", handler);
        return () => window.removeEventListener("hashchange", handler);
    }, []);

    return [loc, navigate];
};

export const AppShell: React.FC = () => {
    const [hasCheckedUpdate, setHasCheckedUpdate] = useState<boolean>(false);
    const { assistantAppsApiService, toastService } = useContext(DependencyInjectionContext);

    useEffect(() => {
        updateCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCheck = async () => {
        const apiResult = await assistantAppsApiService.getLatest([PlatformType.githubWindowsInstaller]);
        console.log({ updateCheck: { ...apiResult }, hasCheckedUpdate })
        if (apiResult.isSuccess === false) return;

        const versionNumFromServer = apiResult.value?.buildNumber ?? 0;
        if (versionNumFromServer > currentServerVersionNum) {
            setHasCheckedUpdate((hasChecked: boolean) => {
                if (hasChecked === false) {
                    toastService.info(
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
            <Router hook={useHashLocation}>
                <Route path={Routes.login} component={LoginPage} />
                <Route path={Routes.builder} component={BuilderPage} />
                <Route path={Routes.about} component={AboutPage} />
                <Route path={Routes.changelog} component={ChangelogPage} />
                <Route path="/" component={HomePage} />
                <Route path="/:rest*" component={NotFoundPage} />
            </Router>
            <Footer />
            <AppDrawer />
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

