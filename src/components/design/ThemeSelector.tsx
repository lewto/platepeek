import React from 'react';
import { motion } from 'framer-motion';
import { MENU_THEMES } from '../../config/themes';
import { MenuTheme } from '../../types/theme';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeSelect: (theme: MenuTheme) => void;
}

export function ThemeSelector({ selectedTheme, onThemeSelect }: ThemeSelectorProps) {
  return (
    <div className="relative">
      {/* Theme Cards Grid */}
      <div className="grid grid-cols-5 gap-2">
        {MENU_THEMES.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => onThemeSelect(theme)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative group overflow-hidden aspect-[4/3]
              rounded-xl border-2 transition-all duration-200
              ${selectedTheme === theme.id 
                ? 'border-theme-accent ring-2 ring-theme-accent/20' 
                : 'border-white/10 hover:border-white/30'
              }
            `}
          >
            {/* Preview Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)]">
              <div 
                className={`absolute inset-0 ${theme.id}-theme opacity-80`}
                style={{
                  '--theme-primary': theme.colors.primary,
                  '--theme-secondary': theme.colors.secondary,
                  '--theme-accent': theme.colors.accent,
                } as React.CSSProperties}
              />
            </div>

            {/* Theme Info */}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xs font-medium text-white text-center">
                {theme.name}
              </p>
            </div>

            {/* Selection Indicator */}
            {selectedTheme === theme.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-theme-accent"
              />
            )}

            {/* Hover Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}