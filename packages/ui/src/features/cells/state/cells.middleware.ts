import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import type { RootState } from '~common/store';

import {
  deleteCell,
  deleteCells,
  insertCell,
  moveCell,
  updateCell,
} from './cells.actions';
import cellsApi from './cells.api';
import type { Cell } from './cells.types';

const cellsMiddleware = createListenerMiddleware();

cellsMiddleware.startListening({
  matcher: isAnyOf(insertCell, updateCell, moveCell, deleteCell, deleteCells),
  effect: (_, { dispatch, getState }) => {
    const cellsState = (getState() as RootState).cells.data;
    const cells = cellsState.ids.map((id) => cellsState.entities[id] as Cell);
    let timer: any = null;
    if (timer != null) clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(cellsApi.endpoints.saveCells.initiate({ cells }));
    }, 1000);
  },
});
export default cellsMiddleware;
