import React from 'react';

import { useTypedSelector } from '~common/hooks';

import { selectCells } from '../state';
import InsertCell from './InsertCell';

const CellList = (): JSX.Element => {
  const cells = useTypedSelector(selectCells);

  return (
    <div>
      <InsertCell prevCellId={null} />
      <ul className="flex flex-col">
        {cells.map((cell) => (
          <li key={cell.id}>
            {cell.id}
            <InsertCell prevCellId={cell.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CellList;
