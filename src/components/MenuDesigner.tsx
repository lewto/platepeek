import React from 'react';
import { Upload } from 'lucide-react';
import { MenuDesignConfig } from '../types/menu';
import { FONT_OPTIONS } from '../constants/fonts';

interface MenuDesignerProps {
  config: MenuDesignConfig;
  onChange: (config: MenuDesignConfig) => void;
}

export function MenuDesigner({ config, onChange }: MenuDesignerProps) {
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      onChange({ ...config, logo: logoUrl });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Menu Design</h3>
        
        {/* Logo Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Restaurant Logo</label>
          <div className="flex items-center space-x-4">
            {config.logo && (
              <img src={config.logo} alt="Logo" className="h-16 w-16 object-contain" />
            )}
            <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <Upload className="w-5 h-5 mr-2" />
              <span>Upload Logo</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleLogoUpload}
              />
            </label>
          </div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Color</label>
            <input
              type="color"
              value={config.primaryColor}
              onChange={e => onChange({ ...config, primaryColor: e.target.value })}
              className="h-10 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Secondary Color</label>
            <input
              type="color"
              value={config.secondaryColor}
              onChange={e => onChange({ ...config, secondaryColor: e.target.value })}
              className="h-10 w-full"
            />
          </div>
        </div>

        {/* Font Family */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Font</label>
          <select
            value={config.fontFamily}
            onChange={e => onChange({ ...config, fontFamily: e.target.value })}
            className="w-full rounded-md border-gray-300"
          >
            {FONT_OPTIONS.map(font => (
              <option key={font.value} value={font.value}>{font.label}</option>
            ))}
          </select>
        </div>

        {/* Layout Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Layout</label>
          <select
            value={config.itemStyle.layout}
            onChange={e => onChange({
              ...config,
              itemStyle: { ...config.itemStyle, layout: e.target.value as 'grid' | 'list' }
            })}
            className="w-full rounded-md border-gray-300"
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>

        {/* Display Options */}
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.itemStyle.showPrices}
              onChange={e => onChange({
                ...config,
                itemStyle: { ...config.itemStyle, showPrices: e.target.checked }
              })}
              className="rounded border-gray-300 mr-2"
            />
            <span className="text-sm">Show Prices</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.itemStyle.showDescriptions}
              onChange={e => onChange({
                ...config,
                itemStyle: { ...config.itemStyle, showDescriptions: e.target.checked }
              })}
              className="rounded border-gray-300 mr-2"
            />
            <span className="text-sm">Show Descriptions</span>
          </label>
        </div>
      </div>
    </div>
  );
}