import React from 'react';
import { Box } from '@chakra-ui/react'
import { Header } from './components/core/header';
import { Footer } from './components/core/footer';
import { BuilderApp } from './builderApp';

export const AppShell: React.FC = () => {
    return (
        <Box w='100%' pt={4}>
            <Header />
            <BuilderApp />
            <Footer />
        </Box>
    );
}

