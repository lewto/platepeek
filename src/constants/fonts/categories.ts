export const FONT_CATEGORIES = {
  SERIF: 'Serif',
  SANS_SERIF: 'Sans Serif',
  DISPLAY: 'Display',
  HANDWRITING: 'Handwriting',
  MONOSPACE: 'Monospace'
} as const;

export type FontCategory = typeof FONT_CATEGORIES[keyof typeof FONT_CATEGORIES];