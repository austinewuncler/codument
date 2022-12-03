import './index.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~common/components';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
