export function parsePrice(priceStr: string | undefined): number {
  if (!priceStr) return 0;
  const cleaned = priceStr.toString().replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}