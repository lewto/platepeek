import { MenuCategory, MenuItem } from '../types/menu';
import { parseCsvMenu } from './csvParser';
import { parsePdfMenu } from './pdfParser';
import { MenuParseError } from './pdf/errors';

function createMenuItem(name: string, price: number, description: string = ''): MenuItem {
  return {
    id: crypto.randomUUID(),
    name,
    description,
    price,
    category: 'Menu Selection',
    dietary: detectDietaryTags(name, description),
    isSpicy: detectSpiciness(name, description),
    spicyLevel: calculateSpicyLevel(name, description),
    isPopular: Math.random() > 0.8,
    isNew: Math.random() > 0.9,
    ingredients: extractIngredients(description),
    imageUrl: `https://source.unsplash.com/featured/?food,${encodeURIComponent(name)}`,
    isSpecial: Math.random() > 0.9,
    originalPrice: Math.random() > 0.9 ? price * 1.2 : undefined
  };
}

function detectDietaryTags(name: string, description: string): string[] {
  const text = `${name} ${description}`.toLowerCase();
  const tags: string[] = [];

  if (text.includes('vegan')) tags.push('Vegan');
  if (text.includes('vegetarian')) tags.push('Vegetarian');
  if (text.includes('gluten-free') || text.includes('gluten free')) tags.push('Gluten-Free');
  if (text.includes('dairy-free') || text.includes('dairy free')) tags.push('Dairy-Free');
  if (text.includes('keto')) tags.push('Keto');
  if (text.includes('halal')) tags.push('Halal');
  if (text.includes('kosher')) tags.push('Kosher');

  return tags;
}

function detectSpiciness(name: string, description: string): boolean {
  const spicyTerms = [
    'spicy', 'hot', 'chili', 'jalapeno', 'sriracha', 'wasabi',
    'cayenne', 'habanero', 'ghost pepper', 'tabasco'
  ];
  const text = `${name} ${description}`.toLowerCase();
  return spicyTerms.some(term => text.includes(term));
}

function calculateSpicyLevel(name: string, description: string): 1 | 2 | 3 | undefined {
  if (!detectSpiciness(name, description)) return undefined;

  const text = `${name} ${description}`.toLowerCase();
  const extremeTerms = ['ghost pepper', 'habanero', 'extremely hot', 'extra spicy'];
  const mediumTerms = ['medium spicy', 'jalapeno', 'sriracha'];

  if (extremeTerms.some(term => text.includes(term))) return 3;
  if (mediumTerms.some(term => text.includes(term))) return 2;
  return 1;
}

function extractIngredients(description: string): string[] {
  return description
    .split(/,|;|\band\b/)
    .map(item => item.trim())
    .filter(item => item.length > 0 && !item.toLowerCase().includes('served with'));
}

export async function parseMenuFile(file: File): Promise<MenuCategory[]> {
  try {
    const fileType = file.name.toLowerCase();
    let categories: MenuCategory[];
    
    if (fileType.endsWith('.csv')) {
      const result = await parseCsvMenu(file);
      categories = result.categories;
    } else if (fileType.endsWith('.pdf')) {
      const result = await parsePdfMenu(file);
      categories = result.categories;
    } else {
      throw new MenuParseError('Unsupported file format. Please upload a CSV or PDF file.');
    }

    // Enhance menu items with additional features
    return categories.map(category => ({
      ...category,
      items: category.items.map(item => ({
        ...item,
        dietary: detectDietaryTags(item.name, item.description),
        isSpicy: detectSpiciness(item.name, item.description),
        spicyLevel: calculateSpicyLevel(item.name, item.description),
        isPopular: Math.random() > 0.8,
        isNew: Math.random() > 0.9,
        ingredients: extractIngredients(item.description),
        isSpecial: Math.random() > 0.9,
        originalPrice: Math.random() > 0.9 ? item.price * 1.2 : undefined
      }))
    }));
  } catch (error) {
    if (error instanceof MenuParseError || error instanceof Error) {
      throw error;
    }
    throw new MenuParseError('Failed to parse menu file');
  }
}