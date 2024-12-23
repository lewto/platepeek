import React from 'react';
import { MenuDesignConfig, MenuCategory, MenuItem } from '../types/menu';
import { LogoConfig } from './design/LogoConfig';
import { TypographyConfig } from './design/TypographyConfig';
import { LayoutConfig } from './design/LayoutConfig';
import { ImageDisplayConfig } from './design/ImageDisplayConfig';
import { ItemStyleConfig } from './design/ItemStyleConfig';
import { SectionConfig } from './design/SectionConfig';
import { ThemeSelector } from './design/ThemeSelector';
import { ColorCustomizer } from './design/ColorCustomizer';
import { MenuPreview } from './MenuPreview';
import { EditableMenuItem } from './EditableMenuItem';
import { useTheme } from '../hooks/useTheme';
import toast from 'react-hot-toast';

interface BrandDesignerProps {
  config: MenuDesignConfig;
  onChange: (config: MenuDesignConfig) => void;
  categories: MenuCategory[];
  onUpdateItem: (categoryIndex: number, itemId: string, updates: Partial<MenuItem>) => void;
}

export function BrandDesigner({ config, onChange, categories, onUpdateItem }: BrandDesignerProps) {
  const { selectedTheme, selectTheme, themes } = useTheme();

  const handleThemeSelect = (theme: MenuTheme) => {
    selectTheme(theme);
    onChange({
      ...config,
      typography: theme.typography,
      colors: theme.colors
    });
    toast.success(`${theme.name} theme applied`);
  };

  const handleColorChange = (colors: ThemeColors) => {
    onChange({
      ...config,
      colors
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Menu Design</h2>
        <p className="mt-2 text-gray-600">Customize your menu's appearance with live preview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-8 bg-white rounded-xl shadow-sm p-6">
          {/* Theme Selector */}
          <ThemeSelector
            selectedTheme={selectedTheme.id}
            onThemeSelect={handleThemeSelect}
          />
          
          {/* Color Customizer */}
          <ColorCustomizer
            colors={config.colors}
            onChange={handleColorChange}
          />
          
          <LogoConfig
            logo={config.logo}
            onChange={logo => onChange({ ...config, logo })}
          />
          
          <TypographyConfig
            config={config.typography}
            onChange={value => onChange({ ...config, typography: value })}
          />
          
          <LayoutConfig
            config={config.layout}
            onChange={value => onChange({ ...config, layout: value })}
          />
          
          <ImageDisplayConfig
            config={config.images}
            onChange={value => onChange({ ...config, images: value })}
          />
          
          <ItemStyleConfig
            config={config.itemStyle}
            onChange={value => onChange({ ...config, itemStyle: value })}
          />
          
          <SectionConfig
            config={config.sectionStyle}
            onChange={value => onChange({ ...config, sectionStyle: value })}
          />
        </div>

        {/* Menu Items and Preview */}
        <div className="space-y-8">
          {/* Live Preview */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">Live Preview</h3>
              <p className="text-sm text-gray-500">See how your menu will look</p>
            </div>
            <div className="border rounded-lg p-4">
              <MenuPreview 
                config={config}
                categories={categories}
              />
            </div>
          </div>

          {/* Editable Menu Items */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Menu Items</h3>
            <div className="space-y-6">
              {categories.map((category, categoryIndex) => (
                <div key={category.name} className="space-y-4">
                  <h4 className="font-medium text-gray-700">{category.name}</h4>
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