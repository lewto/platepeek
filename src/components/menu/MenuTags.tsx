import React from 'react';
import { motion } from 'framer-motion';

export interface Tag {
  id: string;
  label: string;
  type: 'dietary' | 'spicy' | 'popular' | 'new' | 'special';
}

interface MenuTagsProps {
  tags: Tag[];
}

export function MenuTags({ tags }: MenuTagsProps) {
  const getTagStyles = (type: Tag['type']) => {
    switch (type) {
      case 'dietary':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'spicy':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'popular':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'special':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <motion.span
          key={tag.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`
            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
            border backdrop-blur-sm
            ${getTagStyles(tag.type)}
          `}
        >
          {tag.label}
        </motion.span>
      ))}
    </div>
  );
}