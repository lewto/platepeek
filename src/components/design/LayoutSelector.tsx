import React from 'react';
import { Grid2X2, List } from 'lucide-react';

interface LayoutSelectorProps {
  value: 'grid' | 'list';
  onChange: (layout: 'grid' | 'list') => void;
}

export function LayoutSelector({ value, onChange }: LayoutSelectorProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onChange('grid')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
          value === 'grid'
            ? 'bg-blue-50 border-blue-500 text-blue-700'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Grid2X2 className="w-5 h-5" />
        <span>Grid</span>
      </button>
      <button
        onClick={() => onChange('list')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
          value === 'list'
            ? 'bg-blue-50 border-blue-500 text-blue-700'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <List className="w-5 h-5" />
        <span>List</span>
      </button>
    </div>
  );
}