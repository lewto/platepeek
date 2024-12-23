import * as pdfjsLib from 'pdfjs-dist';
import { processTextContent } from './textProcessor';
import { PdfParseError, ValidationError } from './errors';

export async function extractTextFromPdf(file: File): Promise<string[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    
    loadingTask.onPassword = () => {
      throw new PdfParseError('Password protected PDFs are not supported');
    };

    const pdf = await loadingTask.promise;
    const allLines: string[] = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      
      try {
        const lines = processTextContent(content);
        allLines.push(...lines);
      } catch (error) {
        console.warn(`Warning: Failed to process page ${i}:`, error);
        // Continue processing other pages
      }
    }

    if (allLines.length === 0) {
      throw new ValidationError('No readable text found in PDF');
    }

    return allLines;
  } catch (error) {
    console.error('PDF extraction error:', error);
    
    if (error instanceof ValidationError || error instanceof PdfParseError) {
      throw error;
    }
    
    throw new PdfParseError(
      error instanceof Error 
        ? `Failed to read PDF: ${error.message}`
        : 'Failed to read PDF file'
    );
  }
}