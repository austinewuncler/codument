import React from 'react';

import { useTypedDispatch } from '~common/hooks';
import { deleteCells } from '~features/cells';

import ThemeToggleButton from './ThemeToggleButton';

const Header = (): JSX.Element => {
  const dispatch = useTypedDispatch();

  return (
    <header className="sticky inset-x-0 top-0 z-50 transition-all duration-300 bg-white shadow-lg dark:bg-black">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <button
          onClick={() => dispatch(deleteCells())}
          className="font-mono text-4xl font-bold text-primary"
        >
          codument
        </button>
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Header;
