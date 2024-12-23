import React from 'react';
import { Plus } from 'lucide-react';
import { BOOKING_PLATFORMS, ORDERING_PLATFORMS, Platform } from '../../config/platforms';
import { PlatformSelector } from './PlatformSelector';
import { useRestaurantSettings } from '../../hooks/useRestaurantSettings';

export function RestaurantLinks() {
  const { settings, saveSettings } = useRestaurantSettings();

  const addPlatform = (platform: Platform, type: 'booking' | 'ordering') => {
    const newLink = { platform: platform.id, url: '' };
    const updated = {
      ...settings,
      links: {
        ...settings.links,
        [type]: [...settings.links[type], newLink]
      }
    };
    saveSettings(updated);
  };

  const updateLink = (type: 'booking' | 'ordering', index: number, url: string) => {
    const links = [...settings.links[type]];
    links[index] = { ...links[index], url };
    saveSettings({
      links: {
        ...settings.links,
        [type]: links
      }
    });
  };

  const removeLink = (type: 'booking' | 'ordering', index: number) => {
    const links = settings.links[type].filter((_, i) => i !== index);
    saveSettings({
      links: {
        ...settings.links,
        [type]: links
      }
    });
  };

  const renderPlatformSection = (
    title: string,
    platforms: Platform[],
    type: 'booking' | 'ordering'
  ) => {
    const activeLinks = settings.links[type];
    const availablePlatforms = platforms.filter(
      platform => !activeLinks.some(link => link.platform === platform.id)
    );

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          {availablePlatforms.length > 0 && (
            <div className="relative">
              <select
                onChange={(e) => {
                  const platform = platforms.find(p => p.id === e.target.value);
                  if (platform) {
                    addPlatform(platform, type);
                  }
                  e.target.value = '';
                }}
                className="appearance-none pl-2 pr-8 py-1 text-sm border rounded-md text-gray-600 cursor-pointer hover:border-gray-400"
                defaultValue=""
              >
                <option value="" disabled>Add Platform</option>
                {availablePlatforms.map(platform => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
              <Plus className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          {activeLinks.map((link, index) => {
            const platform = platforms.find(p => p.id === link.platform);
            if (!platform) return null;

            return (
              <PlatformSelector
                key={`${type}-${index}`}
                platform={platform}
                url={link.url}
                onUrlChange={(url) => updateLink(type, index, url)}
                onRemove={() => removeLink(type, index)}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Restaurant Links</h2>

      <div className="space-y-8">
        {renderPlatformSection('Booking Platforms', BOOKING_PLATFORMS, 'booking')}
        {renderPlatformSection('Ordering Platforms', ORDERING_PLATFORMS, 'ordering')}
      </div>
    </div>
  );
}