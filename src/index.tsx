import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BuilderApp } from './builderApp';
import { CustomThemeProvider } from './themeProvider';

import './sass/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('creature-builder') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <CustomThemeProvider>
        <BuilderApp />
      </CustomThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
);

