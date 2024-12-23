import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp } from 'lucide-react';
import { parseMenuFile } from '../utils/menuParser';
import { MenuCategory } from '../types/menu';
import toast from 'react-hot-toast';

interface MenuImportProps {
  onImport: (categories: MenuCategory[]) => void;
}

export function MenuImport({ onImport }: MenuImportProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    try {
      toast.loading('Processing your menu...', { id: 'import' });
      const categories = await parseMenuFile(file);
      toast.success(`Successfully imported your menu!`, { id: 'import' });
      onImport(categories);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to import menu file';
      console.error('Menu import error:', error);
      toast.error(message, { id: 'import' });
    }
  }, [onImport]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Import Your Menu</h2>
        <p className="mt-2 text-gray-600">Drag and drop your menu file or click to browse</p>
      </div>

      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-200 ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <FileUp className={`mx-auto h-12 w-12 mb-4 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
        <input {...getInputProps()} />
        <p className="text-gray-600 font-medium">Drop your menu file here, or click to select</p>
        <p className="text-sm text-gray-500 mt-2">Supports PDF menus and CSV files</p>
      </div>

      <div className="text-sm text-gray-500">
        <p className="font-medium mb-2">Supported formats:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>CSV exports from POS systems</li>
          <li>PDF menu files</li>
        </ul>
      </div>
    </div>
  );
}