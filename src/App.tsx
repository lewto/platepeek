import React, { useState } from 'react';
import { MenuImport } from './components/MenuImport';
import { BrandDesigner } from './components/BrandDesigner';
import { EmbedCodeGenerator } from './components/EmbedCodeGenerator';
import { SettingsPage } from './components/settings/SettingsPage';
import { MenuCategory, MenuItem, MenuDesignConfig } from './types/menu';
import { defaultDesignConfig } from './config/designConfig';
import { Toaster } from 'react-hot-toast';
import { Utensils, ChevronRight } from 'lucide-react';

type Tab = 'import' | 'design' | 'settings';

export default function App() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [designConfig, setDesignConfig] = useState<MenuDesignConfig>(defaultDesignConfig);
  const [activeTab, setActiveTab] = useState<Tab>('import');

  const handleImport = (importedCategories: MenuCategory[]) => {
    setCategories(importedCategories);
    setActiveTab('design');
  };

  const handleUpdateItem = (categoryIndex: number, itemId: string, updates: Partial<MenuItem>) => {
    setCategories(prev => prev.map((category, idx) => 
      idx === categoryIndex
        ? {
            ...category,
            items: category.items.map(item =>
              item.id === itemId ? { ...item, ...updates } : item
            )
          }
        : category
    ));
  };

  const handleConfigChange = (newConfig: MenuDesignConfig) => {
    setDesignConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-xl shadow-lg shadow-blue-600/20">
              <Utensils className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              Plate Peek
            </h1>
          </div>
          <p className="text-center mt-2 text-gray-600">
            Create beautiful, customizable menus for your restaurant
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center gap-4 mb-8">
          {/* ... Navigation buttons ... */}
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {activeTab === 'import' && (
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
              <MenuImport onImport={handleImport} />
            </div>
          )}
          
          {activeTab === 'design' && (
            <BrandDesigner 
              config={designConfig}
              onChange={handleConfigChange}
              categories={categories}
              onUpdateItem={handleUpdateItem}
            />
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
              <SettingsPage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}