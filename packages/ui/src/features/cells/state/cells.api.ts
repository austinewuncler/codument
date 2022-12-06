import { baseApi } from '~common/api';

import type { Cell, SaveCellsPayload } from './cells.types';

export const cellsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCells: build.query<Cell[], null>({
      query: () => '/cells',
    }),
    saveCells: build.mutation<null, SaveCellsPayload>({
      query: (body) => ({ url: '/cells', method: 'POST', body }),
    }),
  }),
});

export default cellsApi;
export const { useFetchCellsQuery } = cellsApi;
