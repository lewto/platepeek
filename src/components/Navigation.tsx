import React from 'react';
import { Import, Palette, Eye } from 'lucide-react';

type Tab = 'import' | 'design' | 'preview';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="flex justify-center gap-2 mb-8">
      <NavButton
        active={activeTab === 'import'}
        onClick={() => onTabChange('import')}
        icon={<Import className="w-4 h-4" />}
        label="Import"
      />
      <NavButton
        active={activeTab === 'design'}
        onClick={() => onTabChange('design')}
        icon={<Palette className="w-4 h-4" />}
        label="Design"
      />
      <NavButton
        active={activeTab === 'preview'}
        onClick={() => onTabChange('preview')}
        icon={<Eye className="w-4 h-4" />}
        label="Preview"
      />
    </div>
  );
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}