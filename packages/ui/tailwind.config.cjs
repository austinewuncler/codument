const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      primary: '#06b6d4',
      foreground: { dark: '#111d20', light: '#e6f5f9' },
      background: { dark: '#18333a', light: '#cceaf3' },
      accent: { 1: '#d406b6', 2: '#b6d406' },
      error: colors.red['500'],
    },
    fontFamily: { mono: ['Ubuntu Mono', 'monospace'] },
  },
  plugins: [],
};
