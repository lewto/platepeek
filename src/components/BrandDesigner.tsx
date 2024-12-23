import React from 'react';
import { MenuDesignConfig, MenuCategory, MenuItem } from '../types/menu';
import { ThemeBar } from './design/ThemeBar';
import { MenuPreview } from './MenuPreview';
import { EditableMenuItem } from './menu/EditableMenuItem';
import { useTheme } from '../hooks/useTheme';
import toast from 'react-hot-toast';

interface BrandDesignerProps {
  config: MenuDesignConfig;
  onChange: (config: MenuDesignConfig) => void;
  categories: MenuCategory[];
  onUpdateItem: (categoryIndex: number, itemId: string, updates: Partial<MenuItem>) => void;
}

export function BrandDesigner({ config, onChange, categories, onUpdateItem }: BrandDesignerProps) {
  const { selectedTheme } = useTheme();

  const handleConfigChange = (updates: Partial<MenuDesignConfig>) => {
    onChange({
      ...config,
      ...updates
    });
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Theme Controls Bar */}
      <ThemeBar 
        config={config}
        onConfigChange={handleConfigChange}
      />

      {/* Main Content Area */}
      <div className="pt-20 px-4">
        <div className="max-w-[1600px] mx-auto">
          {/* Live Preview */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <MenuPreview 
                config={config}
                categories={categories}
                onConfigChange={handleConfigChange}
              />
            </div>
          </div>

          {/* Menu Items Editor */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Menu Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, categoryIndex) => (
                <div key={category.name}>
                  <h4 className="font-medium text-gray-700 mb-4 flex items-center justify-between">
                    {category.name}
                    <span className="text-sm text-gray-500">
                      {category.items.length} items
                    </span>
                  </h4>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <EditableMenuItem
                        key={item.id}
                        item={item}
                        onUpdate={(updates) => onUpdateItem(categoryIndex, item.id, updates)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}