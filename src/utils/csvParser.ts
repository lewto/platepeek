import Papa from 'papaparse';
import { MenuCategory, MenuItem } from '../types/menu';
import { COLUMN_MAPPINGS, findColumnName } from './columnMapping';
import { parsePrice } from './priceParser';

export interface ParseResult {
  categories: MenuCategory[];
  skippedRows: number;
}

export function parseCsvMenu(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (!results.data || !Array.isArray(results.data) || results.data.length === 0) {
            reject(new Error('No data found in CSV file'));
            return;
          }

          if (results.errors.length > 0) {
            const errorMessage = results.errors
              .map(err => err.message)
              .join(', ');
            reject(new Error(`CSV parse errors: ${errorMessage}`));
            return;
          }

          const headers = Object.keys(results.data[0]);
          if (headers.length === 0) {
            reject(new Error('No headers found in CSV file'));
            return;
          }

          const columns = {
            name: findColumnName(headers, COLUMN_MAPPINGS.name),
            description: findColumnName(headers, COLUMN_MAPPINGS.description),
            price: findColumnName(headers, COLUMN_MAPPINGS.price),
            category: findColumnName(headers, COLUMN_MAPPINGS.category)
          };

          if (!columns.name || !columns.price) {
            const missing = [];
            if (!columns.name) missing.push('name');
            if (!columns.price) missing.push('price');
            reject(new Error(`Required columns missing: ${missing.join(', ')}. Found columns: ${headers.join(', ')}`));
            return;
          }

          const categoriesMap = new Map<string, MenuItem[]>();
          let skippedRows = 0;
          
          results.data.forEach((row: any) => {
            if (!row[columns.name] || !row[columns.price]) {
              skippedRows++;
              return;
            }
            
            const price = parsePrice(row[columns.price]);
            if (price === 0) {
              skippedRows++;
              return;
            }

            const menuItem: MenuItem = {
              id: crypto.randomUUID(),
              name: row[columns.name].trim(),
              description: columns.description ? row[columns.description]?.trim() || '' : '',
              price,
              category: columns.category ? row[columns.category]?.trim() || 'Uncategorized' : 'Uncategorized',
              imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
            };
            
            const categoryItems = categoriesMap.get(menuItem.category) || [];
            categoryItems.push(menuItem);
            categoriesMap.set(menuItem.category, categoryItems);
          });
          
          const categories = Array.from(categoriesMap.entries())
            .map(([name, items]) => ({ name, items }));
          
          if (categories.length === 0) {
            reject(new Error('No valid menu items found in the CSV file'));
            return;
          }

          resolve({ categories, skippedRows });
        } catch (error) {
          reject(error instanceof Error ? error : new Error('Failed to parse CSV file'));
        }
      },
      error: (error) => reject(new Error(`Failed to read CSV file: ${error.message}`))
    });
  });
}