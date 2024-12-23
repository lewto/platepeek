import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface RestaurantSettings {
  name: string;
  email: string;
  phone: string;
  timezone: string;
  links: {
    booking: { platform: string; url: string }[];
    ordering: { platform: string; url: string }[];
  };
}

const DEFAULT_SETTINGS: RestaurantSettings = {
  name: '',
  email: '',
  phone: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  links: {
    booking: [],
    ordering: []
  }
};

const STORAGE_KEY = 'restaurant-settings';

export function useRestaurantSettings() {
  const [settings, setSettings] = useState<RestaurantSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSettings = (updates: Partial<RestaurantSettings>) => {
    try {
      const updated = {
        ...settings,
        ...updates,
        links: {
          ...settings.links,
          ...(updates.links || {})
        }
      };
      setSettings(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Failed to save settings');
    }
  };

  return {
    settings,
    saveSettings,
    isLoading
  };
}