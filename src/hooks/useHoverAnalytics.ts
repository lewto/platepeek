import { useState, useEffect } from 'react';

const HOVER_THRESHOLD = 5;
const STORAGE_KEY = 'menu-hover-analytics';

export function useHoverAnalytics() {
  const [hoveredItems, setHoveredItems] = useState<Set<string>>(new Set());

  // Load hover data on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHoveredItems(new Set(JSON.parse(stored)));
    }
  }, []);

  // Save hover data when updated
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...hoveredItems]));
  }, [hoveredItems]);

  const trackHover = (itemId: string) => {
    setHoveredItems(prev => {
      const next = new Set(prev);
      next.add(itemId);
      return next;
    });
  };

  return {
    trackHover,
    shouldShowCTA: hoveredItems.size >= HOVER_THRESHOLD,
    hoveredItemsCount: hoveredItems.size
  };
}