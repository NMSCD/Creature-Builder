import React, { useContext, useEffect } from 'react';
import { Center, Container, Spinner } from '@chakra-ui/react';
import { useLocation } from "wouter";
import { DependencyInjectionContext } from '../integration/DependencyInjectionProvider';
import { StorageKey } from '../constants/storageKey';
import { LicenceContents } from '../contracts/file/licenceFile';
import { Routes } from '../constants/routes';
import { RouterGuard } from '../components/routerGuard';

export const HomePage: React.FC = () => {
    const { storageService, toastService } = useContext(DependencyInjectionContext);
    const [, setLocation] = useLocation();

    return (
        <Container>

        </Container>
    );
}

