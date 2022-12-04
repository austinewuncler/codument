import { configureStore } from '@reduxjs/toolkit';

import { bundlesReducer } from '~features/bundles';
import { cellsReducer } from '~features/cells';

const store = configureStore({
  reducer: { cells: cellsReducer, bundles: bundlesReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;
