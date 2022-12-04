import type { RootState } from '~common/store';

import cellsAdapter from './cells.adapter';

export const { selectAll: selectCells } = cellsAdapter.getSelectors(
  (state: RootState) => state.cells.data
);
