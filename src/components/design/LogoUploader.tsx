import React, { useCallback } from 'react';
import { Image, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

interface LogoUploaderProps {
  logo?: string;
  onLogoChange: (logo?: string) => void;
}

export function LogoUploader({ logo, onLogoChange }: LogoUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo must be smaller than 2MB');
      return;
    }

    const url = URL.createObjectURL(file);
    onLogoChange(url);
    toast.success('Logo uploaded successfully');
  }, [onLogoChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.svg']
    },
    maxFiles: 1
  });

  return (
    <div className="flex justify-center">
      {logo ? (
        <div className="relative inline-block">
          <img
            src={logo}
            alt="Restaurant logo"
            className="h-24 object-contain rounded-lg"
          />
          <button
            onClick={() => onLogoChange(undefined)}
            className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            cursor-pointer w-full max-w-md p-8 rounded-xl text-center
            border-2 border-dashed transition-colors
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50/10' 
              : 'border-white/30 hover:border-white/50'
            }
          `}
        >
          <input {...getInputProps()} />
          <Image className="w-8 h-8 mx-auto mb-2 text-white/80" />
          <p className="text-white/80">
            Drag & drop your logo here, or click to select
          </p>
          <p className="text-sm text-white/60 mt-1">
            Supports JPG, PNG, WebP, and SVG (max 2MB)
          </p>
        </div>
      )}
    </div>
  );
}