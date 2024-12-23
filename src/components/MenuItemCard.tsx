import React from 'react';
import { MenuItem } from '../types/menu';
import { ImagePlus } from 'lucide-react';
import toast from 'react-hot-toast';

interface MenuItemCardProps {
  item: MenuItem;
  onImageUpload: (itemId: string, file: File) => Promise<void>;
}

export function MenuItemCard({ item, onImageUpload }: MenuItemCardProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    try {
      await onImageUpload(item.id, file);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
      <div className="aspect-square relative bg-gray-50">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Add Photo</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {item.description}
          </p>
        )}
        <p className="text-lg font-semibold text-gray-900">
          ${item.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}