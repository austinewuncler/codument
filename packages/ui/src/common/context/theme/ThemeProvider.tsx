import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import ThemeContext from './theme.context';
import type { Theme, ThemeContextType } from './theme.types';

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props): JSX.Element => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    if (
      theme === null &&
      window.matchMedia('(prefers-color-scheme: dark)').matches === true
    )
      setTheme('dark');
  }, [theme]);

  const context: ThemeContextType = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={context}>
      <div
        data-color-mode={theme === 'dark' ? 'dark' : 'light'}
        className={theme === 'dark' ? 'dark' : ''}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
