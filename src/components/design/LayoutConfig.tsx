import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { MenuDesignConfig } from '../../types/menu';

interface LayoutConfigProps {
  config: MenuDesignConfig['layout'];
  onChange: (config: MenuDesignConfig['layout']) => void;
}

export function LayoutConfig({ config, onChange }: LayoutConfigProps) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 font-medium">
        <LayoutGrid className="w-5 h-5" />
        Layout
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Layout Style</label>
          <select
            value={config.style}
            onChange={e => onChange({ ...config, style: e.target.value as any })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="list">List View</option>
            <option value="grid">Grid View</option>
            <option value="cards">Card View (with shadows)</option>
            <option value="minimal">Minimal (no borders)</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            {config.style === 'cards' && 'Cards: Items displayed as elevated cards with shadows'}
            {config.style === 'minimal' && 'Minimal: Clean layout without borders or backgrounds'}
            {config.style === 'grid' && 'Grid: Items arranged in a grid with borders'}
            {config.style === 'list' && 'List: Items stacked vertically'}
          </p>
        </div>

        {config.style !== 'list' && (
          <div>
            <label className="block text-sm mb-2">Columns</label>
            <select
              value={config.columns}
              onChange={e => onChange({ ...config, columns: Number(e.target.value) as any })}
              className="w-full p-2 border rounded-lg"
            >
              <option value={1}>Single Column</option>
              <option value={2}>Two Columns</option>
              <option value={3}>Three Columns</option>
              <option value={4}>Four Columns</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm mb-2">Spacing</label>
          <select
            value={config.spacing}
            onChange={e => onChange({ ...config, spacing: e.target.value as any })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="tight">Tight</option>
            <option value="normal">Normal</option>
            <option value="relaxed">Relaxed</option>
          </select>
        </div>
      </div>
    </div>
  );
}