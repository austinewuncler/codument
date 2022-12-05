import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { useTypedSelector } from '~common/hooks';

import { selectCells } from '../state';
import CellListItem from './CellListItem';
import InsertCell from './InsertCell';

const CellList = (): JSX.Element => {
  const cells = useTypedSelector(selectCells);

  return (
    <div className="flex flex-col gap-4">
      <InsertCell prevCellId={null} forceVisible={cells.length === 0} />
      <ul className="flex flex-col gap-4">
        <AnimatePresence>
          {cells.map((cell) => (
            <li key={cell.id} className="flex flex-col gap-4">
              <CellListItem cell={cell} />
              <InsertCell prevCellId={cell.id} />
            </li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default CellList;
