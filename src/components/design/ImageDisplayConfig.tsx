import React from 'react';
import { Image } from 'lucide-react';
import { MenuDesignConfig } from '../../types/menu';

interface ImageDisplayConfigProps {
  config: MenuDesignConfig['images'];
  onChange: (config: MenuDesignConfig['images']) => void;
}

export function ImageDisplayConfig({ config, onChange }: ImageDisplayConfigProps) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900">
        <Image className="w-5 h-5" />
        Image Display
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Mode
          </label>
          <select
            value={config.mode}
            onChange={e => onChange({ ...config, mode: e.target.value as any })}
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="hover">Hover Preview</option>
            <option value="side">Side by Side</option>
            <option value="grid">Grid Layout</option>
            <option value="hidden">Hidden</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            {config.mode === 'hover' && 'Images appear when hovering over items'}
            {config.mode === 'side' && 'Images displayed next to item details'}
            {config.mode === 'grid' && 'Images shown above item details'}
            {config.mode === 'hidden' && 'Images are hidden'}
          </p>
        </div>

        {config.mode !== 'hidden' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Size
              </label>
              <select
                value={config.size}
                onChange={e => onChange({ ...config, size: e.target.value as any })}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius
              </label>
              <select
                value={config.borderRadius}
                onChange={e => onChange({ ...config, borderRadius: e.target.value as any })}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="full">Full (Circle)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aspect Ratio
              </label>
              <select
                value={config.aspectRatio}
                onChange={e => onChange({ ...config, aspectRatio: e.target.value as any })}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="1:1">Square (1:1)</option>
                <option value="4:3">Standard (4:3)</option>
                <option value="16:9">Widescreen (16:9)</option>
              </select>
            </div>

            {config.mode === 'hover' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hover Effect
                </label>
                <select
                  value={config.hoverEffect}
                  onChange={e => onChange({ ...config, hoverEffect: e.target.value as any })}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                  <option value="zoom">Zoom</option>
                </select>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}