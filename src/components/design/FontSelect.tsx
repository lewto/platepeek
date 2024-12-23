import React from 'react';
import { FontOption } from '../../constants/fonts/fontOptions';
import { FONT_CATEGORIES, FontCategory } from '../../constants/fonts/categories';

interface FontSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FontOption[];
  label: string;
}

export function FontSelect({ value, onChange, options, label }: FontSelectProps) {
  const groupedOptions = Object.values(FONT_CATEGORIES).map(category => ({
    category,
    fonts: options.filter(font => font.category === category)
  }));

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {groupedOptions.map(group => (
            group.fonts.length > 0 && (
              <optgroup key={group.category} label={group.category}>
                {group.fonts.map(font => (
                  <option
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </option>
                ))}
              </optgroup>
            )
          ))}
        </select>
      </div>
      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Preview:</p>
        <p 
          className="mt-1 text-lg"
          style={{ fontFamily: value }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  );
}