export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme | null;
  toggleTheme: VoidFunction;
}
