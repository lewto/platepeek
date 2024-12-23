import { MenuDesignConfig } from '../types/menu';
import { MENU_THEMES } from './themes';

// Use the first theme as the default
const defaultTheme = MENU_THEMES[0];

export const defaultDesignConfig: MenuDesignConfig = {
  logo: undefined,
  colors: {
    primary: defaultTheme.colors.primary,
    secondary: defaultTheme.colors.secondary,
    accent: defaultTheme.colors.accent,
    background: defaultTheme.colors.background,
    surface: defaultTheme.colors.surface,
    text: defaultTheme.colors.text,
    border: defaultTheme.colors.border
  },
  typography: {
    headingFont: defaultTheme.typography.headingFont,
    bodyFont: defaultTheme.typography.bodyFont,
    priceFont: defaultTheme.typography.priceFont,
    scale: 'regular'
  },
  layout: {
    style: 'grid',
    columns: 2,
    spacing: 'normal'
  },
  images: {
    mode: 'hover',
    size: 'medium',
    hoverEffect: 'fade',
    borderRadius: 'md',
    aspectRatio: '1:1'
  },
  itemStyle: {
    showPrices: true,
    showDescriptions: true,
    highlightSpecials: false,
    dividerStyle: 'line',
    priceAlignment: 'right'
  },
  sectionStyle: {
    headerAlignment: 'left',
    headerStyle: 'underline',
    spacing: 'normal'
  }
};