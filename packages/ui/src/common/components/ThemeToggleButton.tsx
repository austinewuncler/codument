import { motion } from 'framer-motion';
import React from 'react';

import { useTheme } from '~common/hooks';

import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';

const ThemeToggle = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center h-12 px-1 transition-all duration-300 rounded-full shadow-inner bg-foreground-light dark:bg-foreground-dark dark:justify-end"
    >
      <div className="hidden w-10 h-10 dark:grid place-content-center">
        <SunIcon />
      </div>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className="grid w-10 h-10 bg-white rounded-full shadow-lg dark:bg-black text-primary place-content-center"
      >
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </motion.div>
      <div className="grid w-10 h-10 place-content-center dark:hidden">
        <MoonIcon />
      </div>
    </button>
  );
};

export default ThemeToggle;
