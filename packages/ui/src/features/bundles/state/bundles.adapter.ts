import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Bundle } from './bundles.types';

const bundlesAdapter = createEntityAdapter<Bundle>();
export default bundlesAdapter;
