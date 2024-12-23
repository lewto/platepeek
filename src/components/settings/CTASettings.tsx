import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useCTASettings } from '../../hooks/useCTASettings';

export function CTASettings() {
  const { settings, updateSettings } = useCTASettings();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-medium text-gray-900">Call to Action Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CTA Title
          </label>
          <input
            type="text"
            value={settings.title}
            onChange={(e) => updateSettings({ title: e.target.value })}
            placeholder="Ready to experience these dishes?"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Booking Button Text
          </label>
          <input
            type="text"
            value={settings.bookingText}
            onChange={(e) => updateSettings({ bookingText: e.target.value })}
            placeholder="Book a Table"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordering Button Text
          </label>
          <input
            type="text"
            value={settings.orderingText}
            onChange={(e) => updateSettings({ orderingText: e.target.value })}
            placeholder="Order Online"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CTA Style
          </label>
          <select
            value={settings.style}
            onChange={(e) => updateSettings({ style: e.target.value as any })}
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="modal">Modal Dialog</option>
            <option value="banner">Bottom Banner</option>
            <option value="floating">Floating Button</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trigger After
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={settings.triggerAfter}
              onChange={(e) => updateSettings({ triggerAfter: Number(e.target.value) })}
              min="1"
              max="20"
              className="w-24 px-3 py-2 border rounded-md text-sm"
            />
            <span className="text-sm text-gray-600">item views</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="showOnScroll"
            checked={settings.showOnScroll}
            onChange={(e) => updateSettings({ showOnScroll: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label htmlFor="showOnScroll" className="text-sm text-gray-700">
            Also show when user reaches bottom of menu
          </label>
        </div>
      </div>
    </div>
  );
}