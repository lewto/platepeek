import React, { useState } from 'react';
import { MenuItem } from '../types/menu';
import { ImageUploader } from './menu/ImageUploader';
import { EditableField } from './EditableField';
import { Flame, Star, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuLineItemProps {
  item: MenuItem;
  onImageUpload: (file: File) => Promise<void>;
  onUpdate: (updates: Partial<MenuItem>) => void;
}

const DIETARY_OPTIONS = [
  'Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free',
  'Keto', 'Halal', 'Kosher'
];

export function MenuLineItem({ item, onImageUpload, onUpdate }: MenuLineItemProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      await onImageUpload(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = item.dietary || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    onUpdate({ dietary: newTags });
  };

  return (
    <motion.div
      layout
      className="p-6 rounded-xl bg-white shadow-sm border border-gray-200 hover:border-gray-300 transition-all"
    >
      <div className="flex gap-6">
        {/* Image Upload */}
        <div className="flex-shrink-0">
          <ImageUploader
            imageUrl={item.imageUrl}
            onUpload={handleImageUpload}
            isUploading={isUploading}
          />
        </div>

        {/* Item Details */}
        <div className="flex-1 space-y-4">
          {/* Name and Price */}
          <div className="flex justify-between items-start gap-4">
            <EditableField
              value={item.name}
              onSave={(value) => onUpdate({ name: String(value) })}
              className="text-lg font-medium"
            />
            <div className="flex items-center gap-2">
              <span className="text-gray-500">$</span>
              <EditableField
                value={item.price}
                type="number"
                onSave={(value) => onUpdate({ price: Number(value) })}
                className="text-lg font-medium w-24"
              />
            </div>
          </div>

          {/* Description */}
          <EditableField
            value={item.description}
            type="textarea"
            onSave={(value) => onUpdate({ description: String(value) })}
            className="w-full text-gray-600"
          />

          {/* Special Badges */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onUpdate({ isSpicy: !item.isSpicy })}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                item.isSpicy
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              <Flame className="w-4 h-4" />
              Spicy
            </button>

            <button
              onClick={() => onUpdate({ isPopular: !item.isPopular })}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                item.isPopular
                  ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              <Star className="w-4 h-4" />
              Popular
            </button>

            <button
              onClick={() => onUpdate({ isNew: !item.isNew })}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                item.isNew
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              New
            </button>
          </div>

          {/* Dietary Tags */}
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  item.dietary?.includes(tag)
                    ? 'bg-green-50 text-green-600 border border-green-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}