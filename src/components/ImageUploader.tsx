import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  itemId: string;
  currentImageUrl?: string;
  onImageUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
}

export function ImageUploader({ itemId, currentImageUrl, onImageUpload, isUploading = false }: ImageUploaderProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    try {
      await onImageUpload(file);
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast.error('Failed to upload image');
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative w-32 h-32 rounded-lg overflow-hidden cursor-pointer
        transition-all duration-200
        ${isDragActive ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}
        ${!currentImageUrl ? 'border-2 border-dashed border-gray-300' : ''}
        ${isUploading ? 'opacity-50 cursor-wait' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      {currentImageUrl ? (
        <>
          <img
            src={currentImageUrl}
            alt="Menu item"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
            <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
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

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <Loader className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      )}
    </div>
  );
}