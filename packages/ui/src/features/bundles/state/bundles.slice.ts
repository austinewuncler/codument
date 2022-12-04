import { createSlice } from '@reduxjs/toolkit';

import { createBundle } from './bundles.actions';
import bundlesAdapter from './bundles.adapter';
import type { BundlesState } from './bundles.types';

const initialState: BundlesState = {
  data: bundlesAdapter.getInitialState(),
};

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createBundle.pending, (state, { meta }) => {
        const { arg } = meta;
        const { cellId } = arg;
        bundlesAdapter.upsertOne(state.data, {
          id: cellId,
          loading: true,
          error: null,
          content: null,
        });
      })
      .addCase(createBundle.rejected, (state, { meta, error }) => {
        const { arg } = meta;
        const { cellId } = arg;
        bundlesAdapter.updateOne(state.data, {
          id: cellId,
          changes: { loading: false, error: error.message as string },
        });
      })
      .addCase(createBundle.fulfilled, (state, { meta, payload }) => {
        const { arg } = meta;
        const { cellId } = arg;
        const content = payload;
        bundlesAdapter.updateOne(state.data, {
          id: cellId,
          changes: { loading: false, content },
        });
      }),
});

export default bundlesSlice;
