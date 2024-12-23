import React from 'react';
import { Type } from 'lucide-react';
import { MenuDesignConfig } from '../../types/menu';
import { FontSelect } from './FontSelect';
import { FONT_OPTIONS } from '../../constants/fonts/fontOptions';

interface TypographyConfigProps {
  config: MenuDesignConfig['typography'];
  onChange: (config: MenuDesignConfig['typography']) => void;
}

export function TypographyConfig({ config, onChange }: TypographyConfigProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Type className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-medium text-gray-900">Typography</h3>
      </div>

      <div className="space-y-6">
        <FontSelect
          label="Heading Font"
          value={config.headingFont}
          onChange={value => onChange({ ...config, headingFont: value })}
          options={FONT_OPTIONS}
        />

        <FontSelect
          label="Body Font"
          value={config.bodyFont}
          onChange={value => onChange({ ...config, bodyFont: value })}
          options={FONT_OPTIONS}
        />

        <FontSelect
          label="Price Font"
          value={config.priceFont}
          onChange={value => onChange({ ...config, priceFont: value })}
          options={FONT_OPTIONS}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Scale
          </label>
          <select
            value={config.scale}
            onChange={e => onChange({ ...config, scale: e.target.value as any })}
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="compact">Compact</option>
            <option value="regular">Regular</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
      </div>
    </div>
  );
}