import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Cell } from './cells.types';

const cellsAdapter = createEntityAdapter<Cell>();
export default cellsAdapter;
