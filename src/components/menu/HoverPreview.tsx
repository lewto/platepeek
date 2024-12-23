import React from 'react';
import { motion } from 'framer-motion';
import { Portal } from './Portal';

interface HoverPreviewProps {
  imageUrl: string;
  alt: string;
  x: number;
  y: number;
}

export function HoverPreview({ imageUrl, alt, x, y }: HoverPreviewProps) {
  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          transform: 'translate(-50%, -100%) translateY(-16px)',
          perspective: '1000px'
        }}
      >
        <div 
          className="bg-white rounded-lg shadow-2xl overflow-hidden p-1"
          style={{
            width: '200px',
            height: '200px',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
          />
        </div>
      </motion.div>
    </Portal>
  );
}