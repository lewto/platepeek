import React from 'react';
import { motion } from 'framer-motion';

interface MenuItemDescriptionProps {
  description: string;
  font: string;
  ingredients?: string[];
}

export function MenuItemDescription({ description, font, ingredients }: MenuItemDescriptionProps) {
  return (
    <div className="space-y-2">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-600 leading-relaxed"
        style={{ fontFamily: font }}
      >
        {description}
      </motion.p>
      
      {ingredients && ingredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-1"
        >
          {ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs
                        bg-gray-100 text-gray-600 border border-gray-200"
            >
              {ingredient}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}