import React from 'react';

import CellListItemHeaderButton from './CellListItemHeaderButton';

interface Props {
  cellId: string;
}

const CellListItemHeader = ({ cellId }: Props): JSX.Element => {
  return (
    <header className="flex items-center justify-end h-10 gap-2 px-4 bg-background-light dark:bg-background-dark">
      <CellListItemHeaderButton cellId={cellId} action="moveCellUp" />
      <CellListItemHeaderButton cellId={cellId} action="moveCellDown" />
      <CellListItemHeaderButton cellId={cellId} action="deleteCell" />
    </header>
  );
};

export default CellListItemHeader;
