import React from 'react';

import { CellList } from '~features/cells';

import Header from './Header';

const App = (): JSX.Element => {
  return (
    <div className="min-h-screen transition-all duration-300 bg-foreground-light dark:bg-foreground-dark text-foreground-dark dark:text-foreground-light">
      <Header />
      <main className="container px-4 py-8 mx-auto">
        <CellList />
      </main>
    </div>
  );
};

export default App;
