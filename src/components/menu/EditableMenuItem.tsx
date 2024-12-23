import React, { useState } from 'react';
import { MenuItem } from '../../types/menu';
import { ImageUploader } from '../ImageUploader';
import { EditableField } from '../EditableField';
import { Flame, Star, Clock } from 'lucide-react';

interface EditableMenuItemProps {
  item: MenuItem;
  onUpdate: (updates: Partial<MenuItem>) => void;
  onImageUpload: (file: File) => Promise<void>;
}

export function EditableMenuItem({ item, onUpdate, onImageUpload }: EditableMenuItemProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      await onImageUpload(file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200 hover:border-gray-300 transition-all">
      <div className="flex gap-4">
        {/* Image Upload */}
        <div className="flex-shrink-0">
          <ImageUploader
            itemId={item.id}
            currentImageUrl={item.imageUrl}
            onImageUpload={handleImageUpload}
            isUploading={isUploading}
          />
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          {/* Name and Price Row */}
          <div className="flex justify-between items-start gap-4 mb-3">
            <EditableField
              value={item.name}
              onSave={(value) => onUpdate({ name: String(value) })}
              className="text-lg font-medium"
            />
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-gray-500">$</span>
              <EditableField
                value={item.price}
                type="number"
                onSave={(value) => onUpdate({ price: Number(value) })}
                className="text-lg font-medium w-20"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <EditableField
              value={item.description}
              type="textarea"
              onSave={(value) => onUpdate({ description: String(value) })}
              className="w-full text-gray-600 min-h-[2.5rem]"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onUpdate({ isSpicy: !item.isSpicy })}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium transition-colors ${
                item.isSpicy
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Spicy</span>
            </button>

            <button
              onClick={() => onUpdate({ isPopular: !item.isPopular })}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium transition-colors ${
                item.isPopular
                  ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Popular</span>
            </button>

            <button
              onClick={() => onUpdate({ isNew: !item.isNew })}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium transition-colors ${
                item.isNew
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}