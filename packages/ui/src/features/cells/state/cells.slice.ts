import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import cellsAdapter from './cells.adapter';
import cellsApi from './cells.api';
import type {
  Cell,
  CellsState,
  InsertCellPayload,
  MoveCellPayload,
  UpdateCellPayload,
} from './cells.types';

const initialState: CellsState = {
  loading: false,
  error: null,
  data: cellsAdapter.getInitialState(),
};

const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    insertCell: (state, { payload }: PayloadAction<InsertCellPayload>) => {
      const { prevCellId, type } = payload;
      const cell: Cell = { content: '', id: nanoid(), type };
      state.data.entities[cell.id] = cell;
      const prevIndex = state.data.ids.findIndex((id) => id === prevCellId);
      if (prevIndex < 0) state.data.ids.unshift(cell.id);
      else {
        state.data.ids.splice(prevIndex + 1, 0, cell.id);
      }
    },
    updateCell: (state, { payload }: PayloadAction<UpdateCellPayload>) => {
      const { cellId, content } = payload;
      cellsAdapter.updateOne(state.data, { id: cellId, changes: { content } });
    },
    moveCell: (state, { payload }: PayloadAction<MoveCellPayload>) => {
      const { cellId, direction } = payload;
      const sourceIndex = state.data.ids.findIndex((id) => id === cellId);
      const destinationIndex =
        direction === 'up' ? sourceIndex - 1 : sourceIndex + 1;
      if (destinationIndex >= 0 && destinationIndex < state.data.ids.length) {
        state.data.ids[sourceIndex] = state.data.ids[
          destinationIndex
        ] as string;
        state.data.ids[destinationIndex] = cellId;
      }
    },
    deleteCell: (state, { payload }: PayloadAction<string>) => {
      const cellId = payload;
      cellsAdapter.removeOne(state.data, cellId);
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(cellsApi.endpoints.fetchCells.matchPending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = cellsAdapter.getInitialState();
      })
      .addMatcher(
        cellsApi.endpoints.fetchCells.matchRejected,
        (state, { error }) => {
          state.loading = false;
          state.error = error.message as string;
        }
      )
      .addMatcher(
        cellsApi.endpoints.fetchCells.matchFulfilled,
        (state, { payload }) => {
          const cells = payload;
          state.loading = false;
          state.data = cellsAdapter.addMany(state.data, cells);
        }
      ),
});

export default cellsSlice;
