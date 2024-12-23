import React from 'react';
import { MenuDesignConfig } from '../../types/menu';
import { MENU_THEMES } from '../../config/themes';

interface ThemePreviewProps {
  config: MenuDesignConfig;
  onConfigChange: (updates: Partial<MenuDesignConfig>) => void;
}

export function ThemePreview({ config, onConfigChange }: ThemePreviewProps) {
  if (!config) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-1">
        {MENU_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onConfigChange({
              colors: theme.colors,
              typography: theme.typography
            })}
            className={`
              relative w-14 h-14 rounded-lg overflow-hidden
              transition-all duration-200 hover:scale-105
              ${config.colors.primary === theme.colors.primary ? 'ring-2 ring-blue-500 scale-105' : ''}
            `}
          >
            <div 
              className={`absolute inset-0 ${theme.id}-theme`}
              style={{
                '--theme-primary': theme.colors.primary,
                '--theme-secondary': theme.colors.secondary,
                '--theme-accent': theme.colors.accent
              } as React.CSSProperties}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-1 left-1 right-1 text-[10px] text-white text-center font-medium">
              {theme.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}