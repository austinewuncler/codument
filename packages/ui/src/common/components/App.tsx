import React from 'react';

import { ThemeProvider } from '~common/context';
import { CellList } from '~features/cells';

import Header from './Header';

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-300 bg-foreground-light dark:bg-foreground-dark text-foreground-dark dark:text-foreground-light">
        <Header />
        <main className="container px-4 py-8 mx-auto">
          <CellList />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
