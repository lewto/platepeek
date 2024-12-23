import { MenuItem } from '../types/menu';

interface HoverEvent {
  itemId: string;
  timestamp: number;
}

interface ItemStats {
  itemId: string;
  name: string;
  hoverCount: number;
  lastHovered: number;
}

const STORAGE_KEY = 'menu-analytics';

export const analyticsService = {
  trackHover(item: MenuItem) {
    const events: HoverEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    events.push({ itemId: item.id, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  },

  getStats(): ItemStats[] {
    const events: HoverEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const stats = new Map<string, ItemStats>();

    events.forEach(event => {
      const existing = stats.get(event.itemId) || {
        itemId: event.itemId,
        name: '',
        hoverCount: 0,
        lastHovered: 0
      };

      stats.set(event.itemId, {
        ...existing,
        hoverCount: existing.hoverCount + 1,
        lastHovered: Math.max(existing.lastHovered, event.timestamp)
      });
    });

    return Array.from(stats.values());
  },

  clearStats() {
    localStorage.removeItem(STORAGE_KEY);
  }
};