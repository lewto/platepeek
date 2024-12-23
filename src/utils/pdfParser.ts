import { extractTextFromPdf } from './pdf/textExtractor';
import { processMenuText } from './pdf/sectionProcessor';
import { processMenuItems } from './pdf/itemProcessor';
import { validateMenuCategories } from './pdf/validation';
import { MenuParseError, ValidationError } from './pdf/errors';
import { ParseResult } from './csvParser';
import toast from 'react-hot-toast';

export async function parsePdfMenu(file: File): Promise<ParseResult> {
  try {
    // Extract text from PDF
    const lines = await extractTextFromPdf(file);
    
    // Process text into sections
    const { sections, errors } = processMenuText(lines);
    
    if (errors.length > 0) {
      console.warn('Menu processing warnings:', errors);
    }

    // Convert sections to menu categories with proper validation
    const categories = sections.map(section => ({
      name: section.name || 'Menu Items',
      items: processMenuItems(section.items)
    }));

    // Validate the final menu structure
    validateMenuCategories(categories);

    return {
      categories,
      skippedRows: errors.length
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    
    if (error instanceof ValidationError || error instanceof MenuParseError) {
      throw error;
    }
    
    throw new MenuParseError(
      error instanceof Error 
        ? `Failed to parse menu: ${error.message}`
        : 'Failed to parse menu file'
    );
  }
}