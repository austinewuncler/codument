import './index.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { App, LoadingScreen } from '~common/components';
import { ThemeProvider } from '~common/context';
import { store } from '~common/store';
import { initializeBundler } from '~features/bundles';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <LoadingScreen />
  </StrictMode>
);

initializeBundler().then(() => {
  root.render(
    <StrictMode>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ReduxProvider>
    </StrictMode>
  );
});
