import { useState, useEffect } from 'react';

export interface CTASettings {
  title: string;
  bookingText: string;
  orderingText: string;
  style: 'modal' | 'banner' | 'floating';
  triggerAfter: number;
  showOnScroll: boolean;
}

const DEFAULT_SETTINGS: CTASettings = {
  title: 'Ready to experience these dishes?',
  bookingText: 'Book a Table',
  orderingText: 'Order Online',
  style: 'modal',
  triggerAfter: 5,
  showOnScroll: true
};

const STORAGE_KEY = 'cta-settings';

export function useCTASettings() {
  const [settings, setSettings] = useState<CTASettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const updateSettings = (updates: Partial<CTASettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  };

  return { settings, updateSettings };
}