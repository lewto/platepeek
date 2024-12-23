import React, { useState } from 'react';
import { MenuItem } from '../../types/menu';
import { EditableField } from '../EditableField';
import { ImageUploader } from './ImageUploader';

interface MenuLineItemProps {
  item: MenuItem;
  onImageUpload: (itemId: string, file: File) => Promise<void>;
  onUpdate: (itemId: string, updates: Partial<MenuItem>) => void;
}

export function MenuLineItem({ item, onImageUpload, onUpdate }: MenuLineItemProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      await onImageUpload(item.id, file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="group flex items-start gap-4 py-3 px-4 hover:bg-gray-50 transition-colors rounded-lg">
      {/* Image Upload Area */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <ImageUploader
          imageUrl={item.imageUrl}
          onUpload={handleImageUpload}
          isUploading={isUploading}
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-medium text-gray-900">
            <EditableField
              value={item.name}
              onSave={(value) => onUpdate(item.id, { name: String(value) })}
            />
          </h3>
          <div className="flex-shrink-0 text-lg font-medium text-gray-900 whitespace-nowrap">
            $<EditableField
              value={item.price}
              type="number"
              onSave={(value) => onUpdate(item.id, { price: Number(value) })}
            />
          </div>
        </div>
        <div className="mt-1">
          <EditableField
            value={item.description}
            type="textarea"
            onSave={(value) => onUpdate(item.id, { description: String(value) })}
            className="text-sm text-gray-600 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}