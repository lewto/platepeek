import React from 'react';
import { MenuCategory, MenuItem } from '../types/menu';
import { EditableField } from './EditableField';
import { MenuLineItem } from './menu/MenuLineItem';

interface MenuSectionProps {
  category: MenuCategory;
  onImageUpload: (itemId: string, file: File) => Promise<void>;
  onUpdateItem: (itemId: string, updates: Partial<MenuItem>) => void;
  onUpdateCategory: (oldName: string, newName: string) => void;
}

export function MenuSection({ 
  category, 
  onImageUpload, 
  onUpdateItem,
  onUpdateCategory 
}: MenuSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        <EditableField
          value={category.name}
          onSave={(value) => onUpdateCategory(category.name, String(value))}
        />
      </h2>
      <div className="space-y-2">
        {category.items.map((item) => (
          <MenuLineItem
            key={item.id}
            item={item}
            onImageUpload={onImageUpload}
            onUpdate={onUpdateItem}
          />
        ))}
      </div>
    </section>
  );
}