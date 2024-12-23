import React from 'react';
import { MenuDesignConfig } from '../../types/menu';
import { ThemePreview } from './ThemePreview';
import { ThemeControls } from './ThemeControls';

interface ThemeBarProps {
  config: MenuDesignConfig;
  onConfigChange: (updates: Partial<MenuDesignConfig>) => void;
}

export function ThemeBar({ config, onConfigChange }: ThemeBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <ThemePreview 
            config={config}
            onConfigChange={onConfigChange}
          />
          <ThemeControls 
            config={config}
            onConfigChange={onConfigChange}
          />
        </div>
      </div>
    </div>
  );
}