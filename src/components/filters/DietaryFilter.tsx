import React from 'react';
import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export interface DietaryTag {
  id: string;
  label: string;
  color: string;
}

interface DietaryFilterProps {
  tags: DietaryTag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
}

export function DietaryFilter({ tags, selectedTags, onTagToggle }: DietaryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-700">Dietary Preferences</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <motion.button
            key={tag.id}
            onClick={() => onTagToggle(tag.id)}
            whileTap={{ scale: 0.95 }}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium
              transition-colors duration-200
              ${selectedTags.includes(tag.id)
                ? `bg-${tag.color}-100 text-${tag.color}-800 border border-${tag.color}-200`
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }
            `}
          >
            {tag.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}