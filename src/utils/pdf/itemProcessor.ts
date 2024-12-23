import { MenuItem } from '../../types/menu';
import { parseMenuItem } from './menuItemParser';
import { ValidationError } from './errors';

export function processMenuItems(lines: string[]): MenuItem[] {
  // Filter out empty lines
  const validLines = lines.filter(line => line.trim());

  if (validLines.length === 0) {
    throw new ValidationError('No valid menu items found in section');
  }

  const items = validLines
    .map(line => parseMenuItem(line))
    .filter((item): item is MenuItem => item !== null);

  if (items.length === 0) {
    throw new ValidationError('Failed to parse any menu items from section');
  }

  return items;
}