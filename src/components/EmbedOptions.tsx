import React, { useState } from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { MenuHostingService } from '../services/menuHosting';
import toast from 'react-hot-toast';

interface EmbedOptionsProps {
  menuData: {
    categories: MenuCategory[];
    design: MenuDesignConfig;
    restaurantId: string;
    restaurantName: string;
  };
}

export function EmbedOptions({ menuData }: EmbedOptionsProps) {
  const [activeTab, setActiveTab] = useState<'embed' | 'link'>('embed');
  
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard!');
  };

  const embedCode = MenuHostingService.generateEmbedCode(menuData);
  const linkCode = MenuHostingService.generateClickThroughCode(menuData);
  const menuUrl = MenuHostingService.generateMenuUrl(menuData.restaurantId);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('embed')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'embed'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Embed Menu
        </button>
        <button
          onClick={() => setActiveTab('link')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'link'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Menu Link
        </button>
      </div>

      {activeTab === 'embed' ? (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Embed Code</h3>
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{embedCode}</code>
            </pre>
            <button
              onClick={() => handleCopy(embedCode)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Add this code to your website where you want the menu to appear.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Menu Link</h3>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={menuUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-50 border rounded-lg"
            />
            <button
              onClick={() => handleCopy(menuUrl)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Copy className="w-4 h-4" />
            </button>
            <a
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{linkCode}</code>
            </pre>
            <button
              onClick={() => handleCopy(linkCode)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Use this HTML code to add a link to your menu on your website.
          </p>
        </div>
      )}
    </div>
  );
}