import React, { useEffect, useRef } from 'react';
import { Platform } from '../../config/platforms';
import { ExternalLink, Trash2 } from 'lucide-react';

interface PlatformSelectorProps {
  platform: Platform;
  url: string;
  onUrlChange: (url: string) => void;
  onRemove: () => void;
}

export function PlatformSelector({ platform, url, onUrlChange, onRemove }: PlatformSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number>();

  // Debounce URL changes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleUrlChange = (value: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      onUrlChange(value);
    }, 500);
  };

  return (
    <div className="flex gap-3 items-center p-3 bg-white rounded-lg border border-gray-200">
      <div className="w-24 h-10 flex-shrink-0">
        <img 
          src={platform.logo} 
          alt={`${platform.name} logo`}
          className="h-full w-full object-contain"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{platform.name}</h3>
          <a
            href={platform.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <input
          ref={inputRef}
          type="url"
          defaultValue={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder={`Your ${platform.name} URL`}
          className="mt-1 w-full text-sm px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 p-1"
        title="Remove platform"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}