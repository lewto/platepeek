import React, { useState } from 'react';
import { MenuItem } from '../types/menu';
import { Camera, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditableMenuItemProps {
  item: MenuItem;
  onUpdate: (updates: Partial<MenuItem>) => void;
}

export function EditableMenuItem({ item, onUpdate }: EditableMenuItemProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = URL.createObjectURL(file);
      onUpdate({ imageUrl });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-200 hover:border-gray-300 transition-all">
      <div className="flex gap-6">
        {/* Image Upload Area */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <label 
            className={`
              relative block w-full h-full rounded-lg overflow-hidden cursor-pointer
              ${!item.imageUrl ? 'border-2 border-dashed border-gray-300' : ''}
              ${isUploading ? 'opacity-50' : ''}
            `}
          >
            {item.imageUrl ? (
              <>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 text-center">
                  {isUploading ? 'Uploading...' : 'Drop image here'}
                </p>
                <p className="text-xs text-gray-500">or click to browse</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </label>

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
              <Loader className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4 mb-4">
            <input
              type="text"
              value={item.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="text-lg font-medium bg-transparent border-b border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none px-1"
              placeholder="Item name"
            />
            <div className="flex items-center gap-2">
              <span className="text-gray-500">$</span>
              <input
                type="number"
                value={item.price}
                onChange={(e) => onUpdate({ price: Number(e.target.value) })}
                step="0.01"
                min="0"
                className="text-lg font-medium w-24 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none px-1"
              />
            </div>
          </div>

          <textarea
            value={item.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Add a description..."
            className="w-full bg-transparent border rounded-md p-2 text-gray-600 hover:border-gray-300 focus:border-blue-500 focus:outline-none resize-none"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}