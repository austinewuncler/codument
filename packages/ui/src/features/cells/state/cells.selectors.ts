import type { RootState } from '~common/store';

import cellsAdapter from './cells.adapter';
import type { Cell } from './cells.types';

export const { selectAll: selectCells } = cellsAdapter.getSelectors(
  (state: RootState) => state.cells.data
);

export const selectCumulativeCells =
  (cellId: string) =>
  ({ cells }: RootState) => {
    const sliceIndex = cells.data.ids.findIndex((id) => id === cellId);
    const cumulativeCells = cells.data.ids
      .slice(0, (sliceIndex as number) + 1)
      .map((id) => cells.data.entities[id] as Cell);
    return cumulativeCells;
  };
