// Column name mappings for different POS systems
export const COLUMN_MAPPINGS = {
  name: ['Item Name', 'Name', 'Item', 'Product Name', 'MenuItem'],
  description: ['Description', 'Desc', 'Item Description', 'Details'],
  price: ['Price', 'Item Price', 'Cost', 'Regular Price'],
  category: ['Category', 'Item Category', 'Department', 'Group']
} as const;

export function findColumnName(headers: string[], possibleNames: string[]): string | undefined {
  return headers.find(header => 
    possibleNames.some(name => 
      header.toLowerCase() === name.toLowerCase()
    )
  );
}