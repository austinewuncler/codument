import { createContext } from 'react';

import type { ThemeContextType } from './theme.types';

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  toggleTheme: () => {},
});

export default ThemeContext;
