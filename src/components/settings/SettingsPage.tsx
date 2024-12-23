import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { RestaurantLinks } from './RestaurantLinks';
import { AccountSettings } from './AccountSettings';
import { CTASettings } from './CTASettings';

export function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="w-6 h-6 text-gray-700" />
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-8">
        <RestaurantLinks />
        <CTASettings />
        <AccountSettings />
      </div>
    </div>
  );
}