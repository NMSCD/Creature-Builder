import React, { useContext, useEffect } from 'react';
import { useLocation } from "wouter";
import { isDevMode } from '../helper/envHelper';
import { DependencyInjectionContext } from '../integration/DependencyInjectionProvider';
import { StorageKey } from '../constants/storageKey';
import { LicenceContents } from '../contracts/file/licenceFile';
import { Routes } from '../constants/routes';
import { developmentLicenceKey } from '../constants/licence';

export const RouterGuard: React.FC = () => {
    const { storageService, toastService, assistantAppsApiService } = useContext(DependencyInjectionContext);
    const [, setLocation] = useLocation();

    useEffect(() => {
        loadLicenceFromStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadLicenceFromStorage = async () => {
        try {
            const licenceContents = await storageService.readFile<LicenceContents>(StorageKey.licenceFile);
            console.log({ ...licenceContents });
            if (
                licenceContents == null ||
                licenceContents.licenceHash == null ||
                licenceContents.licenceHash.length < 3
            ) {
                throw new Error('Licence contents invalid')
            }

            if (isDevMode() && licenceContents.licenceHash === developmentLicenceKey) {
                return;
            }

            const verifyResult = await assistantAppsApiService.verifyLicence(licenceContents.licenceHash);
            if (verifyResult.isSuccess === false) {
                setLocation(Routes.login);
            }

        } catch (e: any) {
            console.error(e, { ...e });
            toastService.warn(
                (<span className="noselect">Licence details not found</span>),
                {
                    toastId: 'noLicence'
                }
            )
            setLocation(Routes.login);
        }
    }

    return (
        <span style={{ display: 'none' }}>Route Authed</span>
    );
}

