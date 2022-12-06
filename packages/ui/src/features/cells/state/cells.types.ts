import type { EntityState } from '@reduxjs/toolkit';

export type CellType = 'markdown' | 'code';

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}

export interface CellsState {
  loading: boolean;
  error: string | null;
  data: EntityState<Cell>;
}

export interface InsertCellPayload {
  prevCellId: string | null;
  type: CellType;
}

export interface UpdateCellPayload {
  cellId: string;
  content: string;
}

export interface MoveCellPayload {
  cellId: string;
  direction: 'up' | 'down';
}

export interface SaveCellsPayload {
  cells: Cell[];
}
