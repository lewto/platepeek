import React from 'react';
import { Type } from 'lucide-react';
import { FONT_OPTIONS } from '../../constants/fonts/fontOptions';

interface FontPickerProps {
  value: string;
  onChange: (font: string) => void;
}

export function FontPicker({ value, onChange }: FontPickerProps) {
  return (
    <div className="flex items-center gap-3">
      <Type className="w-4 h-4 text-gray-600" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border rounded-lg px-3 py-1.5 pr-8 bg-white
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        style={{ fontFamily: value }}
      >
        {FONT_OPTIONS.map(font => (
          <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
            {font.label}
          </option>
        ))}
      </select>
    </div>
  );
}