import { TextContent } from './types';
import { ValidationError } from './errors';

export function processTextContent(content: TextContent): string[] {
  if (!content?.items?.length) {
    throw new ValidationError('No text content found in PDF');
  }

  // Group text items by their vertical position
  const lineMap = new Map<number, { text: string; x: number }[]>();
  const tolerance = 2; // Vertical position tolerance

  content.items.forEach((item: any) => {
    if (!item.str?.trim()) return;
    
    const y = Math.round(item.transform[5] / tolerance) * tolerance;
    if (!lineMap.has(y)) {
      lineMap.set(y, []);
    }
    lineMap.get(y)?.push({
      text: item.str.trim(),
      x: Math.round(item.transform[4])
    });
  });

  // Sort and combine text items into lines
  return Array.from(lineMap.entries())
    .sort(([y1], [y2]) => y2 - y1) // Sort top to bottom
    .map(([_, items]) => {
      return items
        .sort((a, b) => a.x - b.x) // Sort left to right
        .map(item => item.text)
        .join(' ')
        .trim();
    })
    .filter(line => line.length > 0);
}