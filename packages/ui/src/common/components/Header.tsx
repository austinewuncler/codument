import React from 'react';

import ThemeToggleButton from './ThemeToggleButton';

const Header = (): JSX.Element => {
  return (
    <header className="sticky inset-x-0 top-0 transition-all duration-300 bg-white shadow-lg dark:bg-black">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <h1 className="font-mono text-4xl font-bold text-primary">
          mar<span className="text-accent-1">|</span>
          <span className="text-accent-2">&lt;</span>ode
        </h1>
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Header;
