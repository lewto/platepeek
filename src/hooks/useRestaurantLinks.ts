import { useState, useEffect } from 'react';
import { Platform } from '../config/platforms';
import toast from 'react-hot-toast';

interface RestaurantLink {
  id: string;
  platformId: string;
  url: string;
  type: 'booking' | 'ordering';
}

const STORAGE_KEY = 'restaurant-links';

export function useRestaurantLinks() {
  const [links, setLinks] = useState<RestaurantLink[]>([]);

  // Load links on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLinks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load restaurant links:', error);
    }
  }, []);

  // Save links whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    } catch (error) {
      console.error('Failed to save restaurant links:', error);
    }
  }, [links]);

  const addPlatformLink = (platform: Platform, type: 'booking' | 'ordering') => {
    const newLink: RestaurantLink = {
      id: crypto.randomUUID(),
      platformId: platform.id,
      url: '',
      type
    };
    setLinks(prev => [...prev, newLink]);
    toast.success(`Added ${platform.name}`);
  };

  const updateLink = (id: string, updates: Partial<RestaurantLink>) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ));
    toast.success('Link updated successfully');
  };

  const removeLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
    toast.success('Platform removed');
  };

  const getBookingLinks = () => links.filter(link => link.type === 'booking');
  const getOrderingLinks = () => links.filter(link => link.type === 'ordering');

  return {
    links,
    addPlatformLink,
    updateLink,
    removeLink,
    getBookingLinks,
    getOrderingLinks
  };
}