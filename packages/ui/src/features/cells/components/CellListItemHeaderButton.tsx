import React from 'react';

import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  TrashIcon,
} from '~common/components';
import { useTypedDispatch } from '~common/hooks';

import { deleteCell, moveCell } from '../state';

interface Props {
  cellId: string;
  action: 'moveCellUp' | 'moveCellDown' | 'deleteCell';
}

const CellListItemHeaderButton = ({ action, cellId }: Props): JSX.Element => {
  const dispatch = useTypedDispatch();

  return (
    <button
      onClick={() =>
        dispatch(
          action === 'moveCellUp'
            ? moveCell({ cellId, direction: 'up' })
            : action === 'moveCellDown'
            ? moveCell({ cellId, direction: 'down' })
            : deleteCell(cellId)
        )
      }
      className={`grid w-8 h-8 hover:text-white dark:hover:text-black rounded-full transition-all duration-300 place-content-center ${
        action === 'moveCellUp'
          ? 'hover:bg-accent-1 text-accent-1'
          : action === 'moveCellDown'
          ? 'hover:bg-accent-2 text-accent-2'
          : 'hover:bg-error text-error'
      }`}
    >
      {action === 'moveCellUp' ? (
        <ArrowSmallUpIcon />
      ) : action === 'moveCellDown' ? (
        <ArrowSmallDownIcon />
      ) : (
        <TrashIcon />
      )}
    </button>
  );
};

export default CellListItemHeaderButton;
