import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Clock, Award } from 'lucide-react';

interface MenuItemBadgeProps {
  type: 'spicy' | 'popular' | 'new' | 'featured';
  level?: 1 | 2 | 3; // For spicy levels
}

export function MenuItemBadge({ type, level = 1 }: MenuItemBadgeProps) {
  const getBadgeContent = () => {
    switch (type) {
      case 'spicy':
        return {
          icon: <Flame className="w-3 h-3" />,
          text: '🌶️'.repeat(level),
          class: 'bg-red-50 text-red-600 border-red-200'
        };
      case 'popular':
        return {
          icon: <Star className="w-3 h-3" />,
          text: 'Popular',
          class: 'bg-yellow-50 text-yellow-600 border-yellow-200'
        };
      case 'new':
        return {
          icon: <Clock className="w-3 h-3" />,
          text: 'New',
          class: 'bg-blue-50 text-blue-600 border-blue-200'
        };
      case 'featured':
        return {
          icon: <Award className="w-3 h-3" />,
          text: 'Featured',
          class: 'bg-purple-50 text-purple-600 border-purple-200'
        };
    }
  };

  const content = getBadgeContent();

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        inline-flex items-center gap-1 px-2 py-1
        rounded-full text-xs font-medium border
        ${content.class}
      `}
    >
      {content.icon}
      <span>{content.text}</span>
    </motion.div>
  );
}