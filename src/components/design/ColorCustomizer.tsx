import React from 'react';
import { Palette } from 'lucide-react';
import { ThemeColors } from '../../types/theme';
import { ColorPicker } from './ColorPicker';

interface ColorCustomizerProps {
  colors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
}

export function ColorCustomizer({ colors, onChange }: ColorCustomizerProps) {
  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    onChange({
      ...colors,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-medium text-gray-900">Custom Colors</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorPicker
          label="Primary Color"
          color={colors.primary}
          onChange={(value) => handleColorChange('primary', value)}
        />
        
        <ColorPicker
          label="Secondary Color"
          color={colors.secondary}
          onChange={(value) => handleColorChange('secondary', value)}
        />
        
        <ColorPicker
          label="Accent Color"
          color={colors.accent}
          onChange={(value) => handleColorChange('accent', value)}
        />
        
        <ColorPicker
          label="Text Color"
          color={colors.text}
          onChange={(value) => handleColorChange('text', value)}
        />
      </div>
    </div>
  );
}