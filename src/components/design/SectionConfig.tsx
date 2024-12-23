import React from 'react';
import { Layers } from 'lucide-react';
import { MenuDesignConfig } from '../../types/menu';

interface SectionConfigProps {
  config: MenuDesignConfig['sectionStyle'];
  onChange: (config: MenuDesignConfig['sectionStyle']) => void;
}

export function SectionConfig({ config, onChange }: SectionConfigProps) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 font-medium">
        <Layers className="w-5 h-5" />
        Section Styling
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Header Alignment</label>
          <select
            value={config.headerAlignment}
            onChange={e => onChange({ ...config, headerAlignment: e.target.value as any })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Header Style</label>
          <select
            value={config.headerStyle}
            onChange={e => onChange({ ...config, headerStyle: e.target.value as any })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="simple">Simple</option>
            <option value="underline">Underline</option>
            <option value="boxed">Boxed</option>
            <option value="accent">Accent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Section Spacing</label>
          <select
            value={config.spacing}
            onChange={e => onChange({ ...config, spacing: e.target.value as any })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="compact">Compact</option>
            <option value="normal">Normal</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
      </div>
    </div>
  );
}