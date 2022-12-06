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
          if (cells.length > 0)
            state.data = cellsAdapter.addMany(state.data, cells);
          else {
            const defaultCells: Cell[] = [
              {
                content:
                  '# Codument\n\nThis is an interactive coding environment. You can write JavaScript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any markdown cell (including this one) to edit it.\n- The code in each code editor share the same scope. If you define a variable in cell #1, you can refer to it in any following cell.\n- You can show any React component, string, number or anything else by calling the `show` function. This is a function build into this environment. Call show multiple times to show multiple values.\n- Reorder or delete cells using the buttons to the top-right corner of each cell.\n- Insert new cells by hovering on the space between cells.\n\nAll of your changes get saved to the file you opened Codument with. For example if you ran\n\n```bash\nnpx -p @codument/cli codument serve mycode.json\n```\n\nor\n\n```bash\nyarn dlx -p @codument/cli codument serve mycode.json\n```\n\nall of the code and markdown will be saved to `mycode.json`.',
                id: nanoid(),
                type: 'markdown',
              },
              {
                content:
                  'import \'bulma/css/bulma.css\';\nimport { useState } from \'react\';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="box is-flex is-flex-direction-column is-align-items-center">\n      <span>{count}</span>\n      <button\n        onClick={() => setCount((p) => p + 1)}\n        className="button is-primary"\n      >\n        Increase\n      </button>\n    </div>\n  );\n};',
                id: nanoid(),
                type: 'code',
              },
              {
                content: 'show(<Counter/>)',
                id: nanoid(),
                type: 'code',
              },
            ];
            state.data = cellsAdapter.addMany(state.data, defaultCells);
          }
        }
      ),
});

export default cellsSlice;
