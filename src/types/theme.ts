export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  priceFont: string;
}

export interface MenuTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: ThemeColors;
  typography: ThemeTypography;
}