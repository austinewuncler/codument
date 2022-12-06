import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '~common/api';
import { bundlesReducer } from '~features/bundles';
import { cellsMiddleware, cellsReducer } from '~features/cells';

const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cellsMiddleware.middleware,
      baseApi.middleware
    ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;
