import React from 'react';

import { ThemeProvider } from '~common/context';

import Header from './Header';

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-300 bg-foreground-light dark:bg-foreground-dark text-foreground-dark dark:text-foreground-light">
        <Header />
      </div>
    </ThemeProvider>
  );
};

export default App;
