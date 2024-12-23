import React, { useCallback } from 'react';
import { Image, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

interface LogoConfigProps {
  logo?: string;
  onChange: (logo?: string) => void;
}

export function LogoConfig({ logo, onChange }: LogoConfigProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo must be smaller than 2MB');
      return;
    }

    const url = URL.createObjectURL(file);
    onChange(url);
    toast.success('Logo uploaded successfully');
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.svg']
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024 // 2MB
  });

  const removeLogo = () => {
    onChange(undefined);
    toast.success('Logo removed');
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900">
        <Image className="w-5 h-5" />
        Restaurant Logo
      </h3>

      {logo ? (
        <div className="relative inline-block">
          <img
            src={logo}
            alt="Restaurant logo"
            className="max-h-24 rounded-lg shadow-sm"
          />
          <button
            onClick={removeLogo}
            className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title="Remove logo"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            cursor-pointer border-2 border-dashed rounded-lg p-6 text-center
            transition-colors
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
        >
          <input {...getInputProps()} />
          <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">
            Drag & drop your logo here, or click to select
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports JPG, PNG, WebP, and SVG (max 2MB)
          </p>
        </div>
      )}
    </div>
  );
}