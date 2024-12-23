import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuTheme } from '../types/theme';
import { MENU_THEMES } from '../config/themes';

interface ThemeContextType {
  currentTheme: MenuTheme;
  setTheme: (theme: MenuTheme) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: MENU_THEMES[0],
  setTheme: () => {},
  isDark: false,
  toggleDarkMode: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<MenuTheme>(MENU_THEMES[0]);
  const [isDark, setIsDark] = useState(false);

  const setTheme = (theme: MenuTheme) => {
    setCurrentTheme(theme);
    applyTheme(theme, isDark);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    applyTheme(currentTheme, !isDark);
  };

  const applyTheme = (theme: MenuTheme, dark: boolean) => {
    const root = document.documentElement;
    
    // Apply theme colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Apply dark mode
    root.classList.toggle('dark', dark);
    
    // Apply fonts
    root.style.setProperty('--font-heading', theme.typography.headingFont);
    root.style.setProperty('--font-body', theme.typography.bodyFont);
    root.style.setProperty('--font-price', theme.typography.priceFont);
  };

  // Initialize theme on mount
  useEffect(() => {
    applyTheme(currentTheme, isDark);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);