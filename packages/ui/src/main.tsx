import './index.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App, LoadingScreen } from '~common/components';
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
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
});
