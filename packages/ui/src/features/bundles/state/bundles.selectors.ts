import type { RootState } from '~common/store';

import bundlesAdapter from './bundles.adapter';

const { selectById } = bundlesAdapter.getSelectors(
  (state: RootState) => state.bundles.data
);

export const selectBundle = (cellId: string) => (state: RootState) =>
  selectById(state, cellId);
