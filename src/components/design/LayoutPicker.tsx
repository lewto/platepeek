import React from 'react';
import { LayoutGrid, List, Square } from 'lucide-react';

interface LayoutPickerProps {
  value: 'grid' | 'list' | 'cards';
  onChange: (layout: 'grid' | 'list' | 'cards') => void;
}

export function LayoutPicker({ value, onChange }: LayoutPickerProps) {
  const layouts = [
    { value: 'grid', icon: LayoutGrid, label: 'Grid' },
    { value: 'list', icon: List, label: 'List' },
    { value: 'cards', icon: Square, label: 'Cards' }
  ] as const;

  return (
    <div className="flex gap-2">
      {layouts.map(layout => {
        const Icon = layout.icon;
        const isSelected = value === layout.value;

        return (
          <button
            key={layout.value}
            onClick={() => onChange(layout.value)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
              transition-all duration-200
              ${isSelected 
                ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{layout.label}</span>
          </button>
        );
      })}
    </div>
  );
}