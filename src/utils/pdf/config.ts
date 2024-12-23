import * as pdfjsLib from 'pdfjs-dist';
import { PdfParseError } from './errors';

let isWorkerInitialized = false;

export async function initializePdfWorker() {
  if (isWorkerInitialized) return;
  
  try {
    // Import the worker directly instead of using CDN
    const worker = await import('pdfjs-dist/build/pdf.worker.min.js');
    pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
    isWorkerInitialized = true;
  } catch (error) {
    console.error('Failed to initialize PDF worker:', error);
    throw new PdfParseError('Failed to initialize PDF processing');
  }
}