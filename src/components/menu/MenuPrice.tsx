import React from 'react';
import { motion } from 'framer-motion';

interface MenuPriceProps {
  price: number;
  isSpecial?: boolean;
  originalPrice?: number;
  font: string;
}

export function MenuPrice({ price, isSpecial, originalPrice, font }: MenuPriceProps) {
  return (
    <div className="flex items-center gap-2" style={{ fontFamily: font }}>
      {isSpecial && originalPrice && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="text-sm line-through text-gray-500"
        >
          ${originalPrice.toFixed(2)}
        </motion.span>
      )}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          text-lg font-medium
          ${isSpecial 
            ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
          }
        `}
      >
        ${price.toFixed(2)}
      </motion.span>
      {isSpecial && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
        >
          Special
        </motion.span>
      )}
    </div>
  );
}