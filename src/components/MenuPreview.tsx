import React from 'react';
import { MenuCategory, MenuDesignConfig } from '../types/menu';
import { MenuItem } from './menu/MenuItem';
import { useHoverAnalytics } from '../hooks/useHoverAnalytics';
import { FilterBar } from './filters/FilterBar';
import { ThemeControls } from './design/ThemeControls';
import { ThemeSelector } from './design/ThemeSelector';
import { LogoUploader } from './design/LogoUploader';
import { useMenuFilters } from '../hooks/useMenuFilters';
import { useMousePosition } from '../hooks/useMousePosition';

interface MenuPreviewProps {
  config: MenuDesignConfig;
  categories?: MenuCategory[];
  onConfigChange: (updates: Partial<MenuDesignConfig>) => void;
}

export function MenuPreview({ config, categories = [], onConfigChange }: MenuPreviewProps) {
  const { trackHover } = useHoverAnalytics();
  const { selectedTags, toggleTag, filterMenuItems } = useMenuFilters();
  useMousePosition();

  // Filter menu items based on selected tags
  const filteredCategories = filterMenuItems(categories);

  return (
    <div className="relative min-h-screen rounded-xl overflow-hidden">
      {/* Theme Background */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 ${config.layout.style}-theme theme-interactive`}
          style={{
            '--theme-primary': config.colors.primary,
            '--theme-secondary': config.colors.secondary,
            '--theme-accent': config.colors.accent
          } as React.CSSProperties}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Theme Controls */}
        <ThemeControls config={config} onConfigChange={onConfigChange} />

        <div className="p-8 space-y-8">
          {/* Logo Upload */}
          <LogoUploader
            logo={config.logo}
            onLogoChange={(logo) => onConfigChange({ logo })}
          />

          {/* Theme Selector */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-medium text-white mb-4">Menu Theme</h3>
            <ThemeSelector
              selectedTheme={config.style}
              onThemeSelect={(theme) => onConfigChange({
                style: theme.id,
                colors: theme.colors,
                typography: theme.typography
              })}
            />
          </div>

          {/* Filter Bar */}
          <FilterBar
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            config={config}
          />

          {/* Menu Items */}
          <div className="space-y-8">
            {filteredCategories.map((category) => (
              <div key={category.name} className="space-y-4">
                <h2 
                  style={{
                    fontFamily: config.typography.headingFont,
                    color: config.colors.text
                  }}
                  className="text-xl font-semibold"
                >
                  {category.name}
                </h2>
                
                <div className={`
                  grid gap-6
                  ${config.layout.style === 'list' ? 'grid-cols-1' :
                    config.layout.columns === 2 ? 'md:grid-cols-2' :
                    config.layout.columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' :
                    'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}
                `}>
                  {category.items.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      config={config}
                      onHover={trackHover}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}