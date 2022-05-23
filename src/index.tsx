import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppShell } from './appShell';
import { CustomThemeProvider } from './themeProvider';

import './sass/main.scss';
import "../node_modules/react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById('creature-builder') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <CustomThemeProvider>
        <AppShell key="app-shell" />
      </CustomThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
);

