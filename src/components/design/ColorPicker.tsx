import React from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onChange: (colors: { primary: string; secondary: string; accent: string }) => void;
}

export function ColorPicker({ colors, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-3">
      <Palette className="w-4 h-4 text-gray-600" />
      <div className="flex items-center gap-2">
        <ColorButton
          color={colors.primary}
          onChange={(color) => onChange({ ...colors, primary: color })}
          label="Primary"
        />
        <ColorButton
          color={colors.secondary}
          onChange={(color) => onChange({ ...colors, secondary: color })}
          label="Secondary"
        />
        <ColorButton
          color={colors.accent}
          onChange={(color) => onChange({ ...colors, accent: color })}
          label="Accent"
        />
      </div>
    </div>
  );
}

interface ColorButtonProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

function ColorButton({ color, onChange, label }: ColorButtonProps) {
  return (
    <div className="relative group">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded-lg cursor-pointer border-2 border-white shadow-sm 
                 transition-transform group-hover:scale-110 group-hover:shadow-lg"
        title={label}
      />
      <div className="absolute inset-0 rounded-lg ring-2 ring-gray-200 pointer-events-none
                    group-hover:ring-blue-200 transition-colors" />
    </div>
  );
}