import React from 'react';
import { ListChecks } from 'lucide-react';
import { MenuDesignConfig } from '../../types/menu';

interface ItemStyleConfigProps {
  config: MenuDesignConfig['itemStyle'];
  onChange: (config: MenuDesignConfig['itemStyle']) => void;
}

export function ItemStyleConfig({ config, onChange }: ItemStyleConfigProps) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 font-medium">
        <ListChecks className="w-5 h-5" />
        Item Styling
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="showPrices"
            checked={config.showPrices}
            onChange={e => onChange({ ...config, showPrices: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label htmlFor="showPrices" className="text-sm">Show Prices</label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="showDescriptions"
            checked={config.showDescriptions}
            onChange={e => onChange({ ...config, showDescriptions: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label htmlFor="showDescriptions" className="text-sm">Show Descriptions</label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="highlightSpecials"
            checked={config.highlightSpecials}
            onChange={e => onChange({ ...config, highlightSpecials: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label htmlFor="highlightSpecials" className="text-sm">Highlight Specials</label>
        </div>

        <div>
          <label className="block text-sm mb-2">Divider Style</label>
          <select
            value={config.dividerStyle}
            onChange={e => onChange({ ...config, dividerStyle: e.target.value as any })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="none">None</option>
            <option value="line">Line</option>
            <option value="dots">Dots</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Price Alignment</label>
          <select
            value={config.priceAlignment}
            onChange={e => onChange({ ...config, priceAlignment: e.target.value as any })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="inline">Inline</option>
          </select>
        </div>
      </div>
    </div>
  );
}