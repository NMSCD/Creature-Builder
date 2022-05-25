import React, { useContext, useEffect } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { useLocation } from "wouter";
import { isElectron } from '../helper/electronHelper';
import { DependencyInjectionContext } from '../integration/DependencyInjectionProvider';
import { StorageKey } from '../constants/storageKey';
import { LicenceContents } from '../contracts/file/licenceFile';
import { Routes } from '../constants/routes';
import { RouterGuard } from '../components/routerGuard';

export const HomePage: React.FC = () => {
    const { storageService, toastService } = useContext(DependencyInjectionContext);
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (isElectron()) {
            loadLicenceFromStorage();
        } else {
            setLocation(Routes.login);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadLicenceFromStorage = async () => {
        try {
            const licenceContents = await storageService.readFile<LicenceContents>(StorageKey.licenceFile);
            console.log({ ...licenceContents });
            if (licenceContents == null) {
                toastService.warn(
                    <span className="noselect">Licence details not found</span>
                )
                setLocation(Routes.login);
            }
        } catch (e: any) {
            setLocation(Routes.login);
        }
    }

    return (
        <>
            <Center className="login-page">
                <Spinner size='xl' />
            </Center>
            <RouterGuard />
        </>
    );
}

