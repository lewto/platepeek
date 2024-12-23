import { FontCategory, FONT_CATEGORIES } from './categories';

export interface FontOption {
  label: string;
  value: string;
  category: FontCategory;
}

export const FONT_OPTIONS: FontOption[] = [
  // Sans Serif Fonts
  { label: 'Inter', value: 'Inter, sans-serif', category: FONT_CATEGORIES.SANS_SERIF },
  { label: 'Open Sans', value: 'Open Sans, sans-serif', category: FONT_CATEGORIES.SANS_SERIF },
  { label: 'Montserrat', value: 'Montserrat, sans-serif', category: FONT_CATEGORIES.SANS_SERIF },
  { label: 'Poppins', value: 'Poppins, sans-serif', category: FONT_CATEGORIES.SANS_SERIF },
  { label: 'Roboto', value: 'Roboto, sans-serif', category: FONT_CATEGORIES.SANS_SERIF },
  { label: 'Lato', value: 'Lato, sans-serif', category: FONT_CATEGORIES.SANS_SERIF },
  { label: 'Nunito', value: 'Nunito, sans-serif', category: FONT_CATEGORIES.SANS_SERIF },
  { label: 'Work Sans', value: 'Work Sans, sans-serif', category: FONT_CATEGORIES.SANS_SERIF },

  // Serif Fonts
  { label: 'Playfair Display', value: 'Playfair Display, serif', category: FONT_CATEGORIES.SERIF },
  { label: 'Merriweather', value: 'Merriweather, serif', category: FONT_CATEGORIES.SERIF },
  { label: 'Lora', value: 'Lora, serif', category: FONT_CATEGORIES.SERIF },
  { label: 'Crimson Pro', value: 'Crimson Pro, serif', category: FONT_CATEGORIES.SERIF },
  { label: 'Libre Baskerville', value: 'Libre Baskerville, serif', category: FONT_CATEGORIES.SERIF },
  { label: 'Source Serif Pro', value: 'Source Serif Pro, serif', category: FONT_CATEGORIES.SERIF },
  { label: 'Cormorant', value: 'Cormorant, serif', category: FONT_CATEGORIES.SERIF },
  { label: 'Spectral', value: 'Spectral, serif', category: FONT_CATEGORIES.SERIF },

  // Display Fonts
  { label: 'Abril Fatface', value: 'Abril Fatface, display', category: FONT_CATEGORIES.DISPLAY },
  { label: 'Lobster', value: 'Lobster, display', category: FONT_CATEGORIES.DISPLAY },
  { label: 'Permanent Marker', value: 'Permanent Marker, display', category: FONT_CATEGORIES.DISPLAY },
  { label: 'Pacifico', value: 'Pacifico, display', category: FONT_CATEGORIES.DISPLAY },
  { label: 'Righteous', value: 'Righteous, display', category: FONT_CATEGORIES.DISPLAY },
  { label: 'Alfa Slab One', value: 'Alfa Slab One, display', category: FONT_CATEGORIES.DISPLAY },

  // Handwriting Fonts
  { label: 'Dancing Script', value: 'Dancing Script, cursive', category: FONT_CATEGORIES.HANDWRITING },
  { label: 'Great Vibes', value: 'Great Vibes, cursive', category: FONT_CATEGORIES.HANDWRITING },
  { label: 'Satisfy', value: 'Satisfy, cursive', category: FONT_CATEGORIES.HANDWRITING },
  { label: 'Caveat', value: 'Caveat, cursive', category: FONT_CATEGORIES.HANDWRITING },
  { label: 'Sacramento', value: 'Sacramento, cursive', category: FONT_CATEGORIES.HANDWRITING },

  // Monospace Fonts
  { label: 'Fira Code', value: 'Fira Code, monospace', category: FONT_CATEGORIES.MONOSPACE },
  { label: 'JetBrains Mono', value: 'JetBrains Mono, monospace', category: FONT_CATEGORIES.MONOSPACE },
  { label: 'Source Code Pro', value: 'Source Code Pro, monospace', category: FONT_CATEGORIES.MONOSPACE },
  { label: 'Space Mono', value: 'Space Mono, monospace', category: FONT_CATEGORIES.MONOSPACE }
];