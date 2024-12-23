import React from 'react';
import { MenuItem as MenuItemType, MenuDesignConfig } from '../../types/menu';
import { motion } from 'framer-motion';
import { Flame, Star, Clock } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  config: MenuDesignConfig;
  onHover?: (itemId: string) => void;
}

export function MenuItem({ item, config, onHover }: MenuItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="theme-card theme-interactive relative p-6 rounded-xl"
      style={{
        fontFamily: config.typography.bodyFont,
        color: config.colors.text,
        borderColor: config.colors.border
      }}
      onMouseEnter={() => onHover?.(item.id)}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <h3 
            className="text-lg font-medium"
            style={{ fontFamily: config.typography.headingFont }}
          >
            {item.name}
          </h3>
          <span 
            className="font-medium"
            style={{ fontFamily: config.typography.priceFont }}
          >
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        {config.itemStyle.showDescriptions && item.description && (
          <p className="text-sm opacity-80">{item.description}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.isSpicy && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
              <Flame className="w-3 h-3" />
              Spicy
            </span>
          )}
          {item.isPopular && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
              <Star className="w-3 h-3" />
              Popular
            </span>
          )}
          {item.isNew && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
              <Clock className="w-3 h-3" />
              New
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}