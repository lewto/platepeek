import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { getTimezoneOptions, getLocalTimezone } from '../../utils/timezones';

export function AccountSettings() {
  const [form, setForm] = useState({
    restaurantName: '',
    email: '',
    phone: '',
    timezone: ''
  });

  const [timezones] = useState(() => getTimezoneOptions());

  // Set local timezone as default on mount
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      timezone: getLocalTimezone()
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast.success('Settings saved successfully');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            value={form.restaurantName}
            onChange={e => setForm({ ...form, restaurantName: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timezone
          </label>
          <select
            value={form.timezone}
            onChange={e => setForm({ ...form, timezone: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="">Select timezone...</option>
            {timezones.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </form>
    </div>
  );
}