import { MenuSection, ProcessedText } from './types';
import { ValidationError } from './errors';

const PRIX_FIXE_PATTERNS = {
  courseHeader: /^\s*(?:LUNCH|DINNER)\s+SELECTION\s*$/i,
  pricing: /(\d+)\s*(?:PP|COURSES)/i,
  sectionHeader: /^(?:A\s+CHOICE\s+OF|SIDES\s+TO\s+SHARE)\s*/i,
  priceModifier: /\+\s*(\d+)\s*$/
};

export function processMenuText(lines: string[]): ProcessedText {
  if (!lines.length) {
    throw new ValidationError('No text content found in PDF');
  }

  const sections: MenuSection[] = [];
  const errors: string[] = [];
  let currentSection: MenuSection | null = null;

  function startNewSection(name: string) {
    if (currentSection?.items.length) {
      sections.push(currentSection);
    }
    currentSection = { name, items: [] };
  }

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    try {
      // Skip pricing lines
      if (PRIX_FIXE_PATTERNS.pricing.test(trimmedLine)) {
        continue;
      }

      // Check for section headers
      if (PRIX_FIXE_PATTERNS.courseHeader.test(trimmedLine)) {
        startNewSection('Menu Selection');
        continue;
      }

      if (PRIX_FIXE_PATTERNS.sectionHeader.test(trimmedLine)) {
        startNewSection(trimmedLine);
        continue;
      }

      // Add item to current section
      if (currentSection) {
        currentSection.items.push(trimmedLine);
      } else {
        // Create default section if none exists
        startNewSection('Menu Items');
        currentSection!.items.push(trimmedLine);
      }
    } catch (error) {
      errors.push(`Failed to process line: ${trimmedLine}`);
    }
  }

  // Add final section
  if (currentSection?.items.length) {
    sections.push(currentSection);
  }

  if (sections.length === 0) {
    throw new ValidationError('No valid menu sections found');
  }

  return { sections, errors };
}