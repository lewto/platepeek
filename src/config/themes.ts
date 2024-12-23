import { MenuTheme } from '../types/theme';

export const MENU_THEMES: MenuTheme[] = [
  {
    id: 'bistro',
    name: 'Modern Bistro',
    description: 'Elegant gradients with smooth motion effects',
    preview: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c',
    style: 'bistro',
    colors: {
      primary: '#3B82F6',
      secondary: '#6366F1',
      accent: '#EC4899',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      border: '#e2e8f0'
    },
    typography: {
      headingFont: 'Playfair Display, serif',
      bodyFont: 'Inter, sans-serif',
      priceFont: 'Montserrat, sans-serif'
    }
  },
  {
    id: 'sushi',
    name: 'Sushi Bar',
    description: 'Playful floating sushi elements with zen aesthetics',
    preview: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    style: 'sushi',
    colors: {
      primary: '#EF4444',
      secondary: '#F97316',
      accent: '#F59E0B',
      background: '#fafafa',
      surface: '#ffffff',
      text: '#18181b',
      border: '#e5e7eb'
    },
    typography: {
      headingFont: 'Noto Sans JP, sans-serif',
      bodyFont: 'Inter, sans-serif',
      priceFont: 'Montserrat, sans-serif'
    }
  },
  {
    id: 'pizza',
    name: 'Pizzeria',
    description: 'Dynamic patterns with spinning pizza elements',
    preview: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    style: 'pizza',
    colors: {
      primary: '#DC2626',
      secondary: '#EA580C',
      accent: '#F59E0B',
      background: '#fffbeb',
      surface: '#ffffff',
      text: '#292524',
      border: '#fde68a'
    },
    typography: {
      headingFont: 'Lobster, cursive',
      bodyFont: 'Inter, sans-serif',
      priceFont: 'Montserrat, sans-serif'
    }
  },
  {
    id: 'cafe',
    name: 'Coffee House',
    description: 'Steamy gradients with rising coffee elements',
    preview: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    style: 'cafe',
    colors: {
      primary: '#78350F',
      secondary: '#92400E',
      accent: '#B45309',
      background: '#FFFBEB',
      surface: '#ffffff',
      text: '#292524',
      border: '#FDE68A'
    },
    typography: {
      headingFont: 'Pacifico, cursive',
      bodyFont: 'Inter, sans-serif',
      priceFont: 'Montserrat, sans-serif'
    }
  },
  {
    id: 'fine-dining',
    name: 'Fine Dining',
    description: 'Luxurious shimmering effects with elegant design',
    preview: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c',
    style: 'fine-dining',
    colors: {
      primary: '#4F46E5',
      secondary: '#7C3AED',
      accent: '#C026D3',
      background: '#ffffff',
      surface: '#fafafa',
      text: '#18181b',
      border: '#e5e7eb'
    },
    typography: {
      headingFont: 'Cormorant Garamond, serif',
      bodyFont: 'Inter, sans-serif',
      priceFont: 'Montserrat, sans-serif'
    }
  }
];