// Menu pattern types
export interface MenuPattern {
  pricePattern: RegExp;
  priceLocation: 'end' | 'start';
  sectionPattern: RegExp;
  sectionMarkers: string[];
  itemSeparator: string;
  descriptionSeparator: string;
  indentation: boolean;
  capitalizedSections: boolean;
  priceModifierPattern?: RegExp;
}

// Pattern for prix fixe menus
export const prixFixePattern: MenuPattern = {
  pricePattern: /(\d+)(?:\s*PP)?$/i,
  priceLocation: 'end',
  sectionPattern: /^[A-Z\s]{2,}$/,
  sectionMarkers: [
    'LUNCH SELECTION',
    'A CHOICE OF',
    'SIDES TO SHARE',
    'DESSERT'
  ],
  itemSeparator: '\n',
  descriptionSeparator: ',',
  indentation: false,
  capitalizedSections: true,
  priceModifierPattern: /\+\s*(\d+)/
};

export function detectMenuPattern(text: string): MenuPattern {
  // For this specific menu, always use prix fixe pattern
  return prixFixePattern;
}