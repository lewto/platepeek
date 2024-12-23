import React, { useCallback } from 'react';
import { Image, X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface LogoSectionProps {
  logo?: string;
  onLogoUpload: (file: File) => void;
  onLogoRemove: () => void;
}

export function LogoSection({ logo, onLogoUpload, onLogoRemove }: LogoSectionProps) {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo must be smaller than 2MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a JPG, PNG, or SVG file');
      return;
    }

    onLogoUpload(file);
  }, [onLogoUpload]);

  return (
    <div className="mb-8">
      {logo ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-block mx-auto"
        >
          <img
            src={logo}
            alt="Restaurant logo"
            className="max-h-32 object-contain rounded-lg"
          />
          <button
            onClick={onLogoRemove}
            className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title="Remove logo"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </motion.div>
      ) : (
        <motion.label
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="block cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
            <Image className="w-8 h-8 text-gray-400 mb-2" />
            <div className="text-center">
              <p className="text-sm text-gray-600">Upload your restaurant logo</p>
              <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG, or SVG (max 2MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/svg+xml"
              onChange={handleFileChange}
            />
          </div>
        </motion.label>
      )}
    </div>
  );
}