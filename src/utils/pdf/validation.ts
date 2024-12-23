import { MenuItem, MenuCategory } from '../../types/menu';
import { ValidationError } from './errors';

export function validateMenuItem(item: MenuItem): void {
  if (!item.name?.trim()) {
    throw new ValidationError('Menu item must have a name');
  }
  
  // For prix fixe menus, allow zero prices since they're part of a course
  if (typeof item.price !== 'number' || isNaN(item.price)) {
    throw new ValidationError(`Invalid price for item "${item.name}"`);
  }
}

export function validateMenuCategories(categories: MenuCategory[]): void {
  // Basic array validation
  if (!Array.isArray(categories)) {
    throw new ValidationError('Invalid menu data structure');
  }

  if (categories.length === 0) {
    throw new ValidationError('No menu categories found');
  }

  // Validate each category and its items
  categories.forEach((category, index) => {
    if (!category.name?.trim()) {
      throw new ValidationError(`Category at index ${index} must have a name`);
    }

    if (!Array.isArray(category.items)) {
      throw new ValidationError(`Invalid items in category "${category.name}"`);
    }

    if (category.items.length === 0) {
      throw new ValidationError(`No items found in category "${category.name}"`);
    }

    // Validate each item in the category
    category.items.forEach((item, itemIndex) => {
      try {
        validateMenuItem(item);
      } catch (error) {
        throw new ValidationError(
          `Invalid item at index ${itemIndex} in category "${category.name}": ${error.message}`
        );
      }
    });
  });

  // Ensure we have at least one valid item across all categories
  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  if (totalItems === 0) {
    throw new ValidationError('No valid menu items found');
  }
}