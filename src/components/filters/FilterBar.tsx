import React from 'react';
import { Tag, Star, Clock, Flame, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuTagId } from '../../constants/menuTags';
import { MenuDesignConfig } from '../../types/menu';

interface FilterBarProps {
  selectedTags: MenuTagId[];
  onTagToggle: (tagId: MenuTagId) => void;
  config: MenuDesignConfig;
}

export function FilterBar({ selectedTags, onTagToggle, config }: FilterBarProps) {
  const filterGroups = [
    {
      label: 'Dietary',
      tags: [
        { id: 'vegan', label: 'Vegan', icon: Tag },
        { id: 'vegetarian', label: 'Vegetarian', icon: Tag },
        { id: 'gluten-free', label: 'Gluten-Free', icon: Tag },
        { id: 'dairy-free', label: 'Dairy-Free', icon: Tag },
        { id: 'keto', label: 'Keto', icon: Tag },
        { id: 'halal', label: 'Halal', icon: Tag },
        { id: 'kosher', label: 'Kosher', icon: Tag }
      ]
    },
    {
      label: 'Special',
      tags: [
        { id: 'popular', label: 'Popular', icon: Star },
        { id: 'new', label: 'New', icon: Clock },
        { id: 'spicy', label: 'Spicy', icon: Flame },
        { id: 'special', label: 'Special', icon: Award }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {filterGroups.map((group) => (
        <div key={group.label} className="space-y-2">
          <h3 
            className="text-sm font-medium"
            style={{ 
              color: config.colors.text,
              fontFamily: config.typography.headingFont
            }}
          >
            {group.label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => {
              const Icon = tag.icon;
              const isSelected = selectedTags.includes(tag.id as MenuTagId);
              
              return (
                <motion.button
                  key={tag.id}
                  onClick={() => onTagToggle(tag.id as MenuTagId)}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div 
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 
                      rounded-full text-sm font-medium backdrop-blur-sm
                      transition-all duration-200
                      ${isSelected 
                        ? 'bg-white/20 shadow-lg border border-white/30' 
                        : 'bg-white/10 hover:bg-white/15 border border-white/10'
                      }
                    `}
                    style={{
                      color: config.colors.text,
                      fontFamily: config.typography.bodyFont
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tag.label}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}