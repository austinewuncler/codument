import React from 'react';

import { PlusSmallIcon } from '~common/components';
import { useTypedDispatch } from '~common/hooks';

import { insertCell } from '../state';
import InsertCellButton from './InsertCellButton';

interface Props {
  prevCellId: string | null;
}

const InsertCell = ({ prevCellId }: Props): JSX.Element => {
  const dispatch = useTypedDispatch();

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2">
        <InsertCellButton
          type="markdown"
          onClick={() => dispatch(insertCell({ prevCellId, type: 'markdown' }))}
        />
        <PlusSmallIcon />
        <InsertCellButton
          type="code"
          onClick={() => dispatch(insertCell({ prevCellId, type: 'code' }))}
        />
      </div>
    </div>
  );
};

export default InsertCell;
