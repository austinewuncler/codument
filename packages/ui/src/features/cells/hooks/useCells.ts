import { useTypedSelector } from '~common/hooks';

import { Cell, selectCells, useFetchCellsQuery } from '../state';

const useCells = (): Cell[] => {
  const cells = useTypedSelector(selectCells);
  useFetchCellsQuery(null);

  return cells;
};

export default useCells;
