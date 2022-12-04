import React from 'react';

import { PlusSmallIcon } from '~common/components';
import { useTypedDispatch } from '~common/hooks';

import { insertCell } from '../state';
import InsertCellButton from './InsertCellButton';

interface Props {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const InsertCell = ({
  prevCellId,
  forceVisible = false,
}: Props): JSX.Element => {
  const dispatch = useTypedDispatch();

  return (
    <div
      className={`flex justify-center transition-all duration-300 group ${
        forceVisible ? 'opacity-100' : 'opacity-0 hover:opacity-100'
      }`}
    >
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
