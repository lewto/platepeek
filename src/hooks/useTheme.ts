import { useState, useEffect } from 'react';
import { MENU_THEMES } from '../config/themes';
import { MenuTheme } from '../types/theme';

const STORAGE_KEY = 'selected-theme';

export function useTheme() {
  const [selectedTheme, setSelectedTheme] = useState<MenuTheme>(MENU_THEMES[0]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const theme = MENU_THEMES.find(t => t.id === stored);
      if (theme) setSelectedTheme(theme);
    }
  }, []);

  const selectTheme = (theme: MenuTheme) => {
    setSelectedTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme.id);

    // Apply theme colors to CSS variables
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  return {
    selectedTheme,
    selectTheme,
    themes: MENU_THEMES
  };
}