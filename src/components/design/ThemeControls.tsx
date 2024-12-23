import React from 'react';
import { MenuDesignConfig } from '../../types/menu';
import { ColorPicker } from './ColorPicker';
import { FontPicker } from './FontPicker';
import { LayoutPicker } from './LayoutPicker';

interface ThemeControlsProps {
  config: MenuDesignConfig;
  onConfigChange: (updates: Partial<MenuDesignConfig>) => void;
}

export function ThemeControls({ config, onConfigChange }: ThemeControlsProps) {
  if (!config) return null;

  return (
    <div className="flex items-center gap-6 p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <ColorPicker
        colors={config.colors}
        onChange={(colors) => onConfigChange({ colors })}
      />
      
      <div className="h-8 w-px bg-gray-200" />
      
      <FontPicker
        value={config.typography.headingFont}
        onChange={(font) => onConfigChange({
          typography: { ...config.typography, headingFont: font }
        })}
      />
      
      <div className="h-8 w-px bg-gray-200" />
      
      <LayoutPicker
        value={config.layout.style}
        onChange={(style) => onConfigChange({
          layout: { ...config.layout, style }
        })}
      />
    </div>
  );
}