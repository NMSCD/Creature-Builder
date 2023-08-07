import React, { DOMAttributes } from 'react';
import ReactDOM from 'react-dom/client';
import { AppShell } from './appShell';
import { CustomThemeProvider } from './themeProvider';
import { DependencyInjectionProvider } from './integration/DependencyInjectionProvider';

import './sass/main.scss';
import "../node_modules/react-toastify/dist/ReactToastify.css";
import 'react-medium-image-zoom/dist/styles.css';

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  interface Window { config: any; registration: any }
  namespace JSX {
    interface IntrinsicElements {
      ['assistant-apps-patreon-list']: CustomElement<any>;
      ['assistant-apps-donation-option-list']: CustomElement<any>;
    }
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('creature-builder') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <DependencyInjectionProvider>
        <AppShell key="app-shell" />
      </DependencyInjectionProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);

