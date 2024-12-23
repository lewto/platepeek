```tsx
import React from 'react';
import { ThemeSelector } from './ThemeSelector';
import { ColorCustomizer } from './ColorCustomizer';
import { TypographySelector } from './TypographySelector';
import { useTheme } from '../../hooks/useTheme';
import { MenuDesignConfig } from '../../types/menu';

interface DesignLayoutProps {
  config: MenuDesignConfig;
  onChange: (config: MenuDesignConfig) => void;
}

export function DesignLayout({ config, onChange }: DesignLayoutProps) {
  const { selectedTheme, selectTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      {/* Top Bar with Design Controls */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Theme Selection */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <span className="text-sm font-medium">Theme</span>
              </div>
              <div className="flex gap-2">
                {selectedTheme.colors && Object.values(selectedTheme.colors).slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Font Selection */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-serif">A</span>
                <span className="text-sm font-medium">Font</span>
              </div>
              <select 
                value={config.typography.headingFont}
                onChange={(e) => onChange({
                  ...config,
                  typography: { ...config.typography, headingFont: e.target.value }
                })}
                className="text-sm border-0 bg-transparent focus:ring-0"
              >
                <option value="system-ui">Default</option>
                <option value="Playfair Display">Playfair</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>

            {/* Display Mode */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Display</span>
              </div>
              <select
                value={config.layout.style}
                onChange={(e) => onChange({
                  ...config,
                  layout: { ...config.layout, style: e.target.value as any }
                })}
                className="text-sm border-0 bg-transparent focus:ring-0"
              >
                <option value="grid">Grid</option>
                <option value="list">List</option>
                <option value="cards">Cards</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme)}
              className={`
                relative group rounded-xl overflow-hidden aspect-video
                transition-all duration-200
                ${selectedTheme.id === theme.id ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}
              `}
            >
              <img
                src={theme.preview}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-medium">{theme.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Menu preview content */}
        </div>
      </div>
    </div>
  );
}
```