import { useState, useCallback } from 'react';
import { MenuItem, MenuCategory } from '../types/menu';
import { MenuTagId } from '../constants/menuTags';

export function useMenuFilters() {
  const [selectedTags, setSelectedTags] = useState<MenuTagId[]>([]);

  const toggleTag = useCallback((tagId: MenuTagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  }, []);

  const filterMenuItems = useCallback((categories: MenuCategory[]): MenuCategory[] => {
    if (selectedTags.length === 0) return categories;

    return categories.map(category => ({
      ...category,
      items: category.items.filter(item => {
        return selectedTags.every(tag => {
          switch (tag) {
            case 'popular':
              return item.isPopular;
            case 'new':
              return item.isNew;
            case 'spicy':
              return item.isSpicy;
            case 'special':
              return item.isSpecial;
            default:
              // Handle dietary tags
              return item.dietary?.includes(tag.charAt(0).toUpperCase() + tag.slice(1));
          }
        });
      })
    })).filter(category => category.items.length > 0);
  }, [selectedTags]);

  return {
    selectedTags,
    toggleTag,
    filterMenuItems
  };
}