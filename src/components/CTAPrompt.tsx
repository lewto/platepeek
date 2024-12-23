import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useRestaurantSettings } from '../hooks/useRestaurantSettings';
import { useCTASettings } from '../hooks/useCTASettings';
import { BOOKING_PLATFORMS, ORDERING_PLATFORMS } from '../config/platforms';

interface CTAPromptProps {
  restaurantName: string;
  onClose: () => void;
}

export function CTAPrompt({ restaurantName, onClose }: CTAPromptProps) {
  const { settings: restaurantSettings } = useRestaurantSettings();
  const { settings: ctaSettings } = useCTASettings();
  
  const bookingLinks = restaurantSettings.links.booking;
  const orderingLinks = restaurantSettings.links.ordering;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{restaurantName}</h2>
            <p className="text-gray-600 mt-1">{ctaSettings.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {bookingLinks.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Reserve a Table</h3>
              <div className="grid gap-3">
                {bookingLinks.map((link, index) => {
                  const platform = BOOKING_PLATFORMS.find(p => p.id === link.platform);
                  if (!platform || !link.url) return null;

                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                      style={{ backgroundColor: `${platform.color}10` }}
                    >
                      <img 
                        src={platform.logo} 
                        alt={platform.name}
                        className="h-8 w-24 object-contain"
                      />
                      <span className="text-gray-700 font-medium">
                        {ctaSettings.bookingText} on {platform.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {orderingLinks.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Order Online</h3>
              <div className="grid gap-3">
                {orderingLinks.map((link, index) => {
                  const platform = ORDERING_PLATFORMS.find(p => p.id === link.platform);
                  if (!platform || !link.url) return null;

                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                      style={{ backgroundColor: `${platform.color}10` }}
                    >
                      <img 
                        src={platform.logo} 
                        alt={platform.name}
                        className="h-8 w-24 object-contain"
                      />
                      <span className="text-gray-700 font-medium">
                        {ctaSettings.orderingText} on {platform.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {bookingLinks.length === 0 && orderingLinks.length === 0 && (
            <p className="text-center text-gray-500">
              No booking or ordering links configured. Please add them in Settings.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}