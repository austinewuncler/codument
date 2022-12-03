import { useContext } from 'react';

import { ThemeContext, ThemeContextType } from '~common/context';

const useTheme = (): ThemeContextType => useContext(ThemeContext);

export default useTheme;
