import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import cellsAdapter from './cells.adapter';
import type {
  Cell,
  CellsState,
  InsertCellPayload,
  UpdateCellPayload,
} from './cells.types';

const initialState: CellsState = { data: cellsAdapter.getInitialState() };

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
  },
});

export default cellsSlice;
