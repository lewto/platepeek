import { MenuItem } from '../../types/menu';
import { ValidationError } from './errors';

const PATTERNS = {
  priceModifier: /\+\s*(\d+)\s*$/,
  coursePrice: /(\d+)\s*PP\s*$/i,
  courseHeader: /COURSES|SELECTION/i
};

export function parseMenuItem(line: string): MenuItem | null {
  try {
    const trimmedLine = line.trim();
    if (!trimmedLine || PATTERNS.courseHeader.test(trimmedLine)) {
      return null;
    }

    // Extract price and clean description
    let price = 0;
    let name = trimmedLine;

    // Check for price modifier
    const modifierMatch = name.match(PATTERNS.priceModifier);
    if (modifierMatch) {
      price = parseInt(modifierMatch[1], 10);
      name = name.replace(PATTERNS.priceModifier, '').trim();
    }

    // Check for course price
    const courseMatch = name.match(PATTERNS.coursePrice);
    if (courseMatch) {
      price = parseInt(courseMatch[1], 10);
      name = name.replace(PATTERNS.coursePrice, '').trim();
    }

    // Skip if no valid name
    if (!name) {
      return null;
    }

    return {
      id: crypto.randomUUID(),
      name,
      description: '',
      price,
      imageUrl: '',
      category: 'Menu Items'
    };
  } catch (error) {
    console.warn('Failed to parse menu item:', line, error);
    return null;
  }
}