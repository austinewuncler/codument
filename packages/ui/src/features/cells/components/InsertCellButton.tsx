import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';

import { CodeBracketIcon, DocumentPlusIcon } from '~common/components';

import type { CellType } from '../state';

interface Props extends Pick<ComponentPropsWithoutRef<'button'>, 'onClick'> {
  type: CellType;
}

const InsertCellButton = ({ type, onClick }: Props): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`grid w-10 h-10 text-white dark:text-black transition-all duration-300 rounded-full shadow-xl place-content-center hover:scale-110 hover:shadow-2xl active:scale-105 ${
        type === 'markdown' ? 'bg-accent-1' : 'bg-accent-2'
      }`}
    >
      {type === 'markdown' ? <DocumentPlusIcon /> : <CodeBracketIcon />}
    </button>
  );
};

export default InsertCellButton;
