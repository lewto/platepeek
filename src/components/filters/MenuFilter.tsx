import React from 'react';
import { motion } from 'framer-motion';
import { MENU_TAGS } from '../../constants/menuTags';
import { MenuTagId } from '../../constants/menuTags';

interface MenuFilterProps {
  selectedTags: MenuTagId[];
  onTagToggle: (tagId: MenuTagId) => void;
}

export function MenuFilter({ selectedTags, onTagToggle }: MenuFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Filter Menu Items</h3>
      
      <div className="flex flex-wrap gap-2">
        {MENU_TAGS.map(tag => {
          const Icon = tag.icon;
          const isSelected = selectedTags.includes(tag.id);
          
          return (
            <motion.button
              key={tag.id}
              onClick={() => onTagToggle(tag.id)}
              whileTap={{ scale: 0.95 }}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 
                rounded-full text-sm font-medium
                transition-colors duration-200
                ${isSelected
                  ? `bg-${tag.color}-100 text-${tag.color}-800 border border-${tag.color}-200`
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              {tag.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}