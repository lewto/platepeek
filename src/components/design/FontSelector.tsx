import React from 'react';
import { FONT_OPTIONS } from '../../constants/fonts';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

export function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <div className="space-y-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-md text-sm"
      >
        {FONT_OPTIONS.map((font) => (
          <option
            key={font.value}
            value={font.value}
            style={{ fontFamily: font.value }}
          >
            {font.label}
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-500">
        Preview: <span style={{ fontFamily: value }}>The quick brown fox jumps over the lazy dog</span>
      </p>
    </div>
  );
}