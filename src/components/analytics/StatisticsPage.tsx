import React, { useState, useEffect } from 'react';
import { BarChart, Clock, Trash2 } from 'lucide-react';
import { analyticsService } from '../../services/analytics';
import { motion } from 'framer-motion';

export function StatisticsPage() {
  const [stats, setStats] = useState(analyticsService.getStats());

  const handleClearStats = () => {
    analyticsService.clearStats();
    setStats([]);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart className="w-6 h-6" />
            Menu Analytics
          </h2>
          <p className="text-gray-600">Track customer interest in menu items</p>
        </div>
        
        <button
          onClick={handleClearStats}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear Data
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map(stat => (
          <motion.div
            key={stat.itemId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-white shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{stat.name || 'Unknown Item'}</h3>
                <p className="text-2xl font-bold">{stat.hoverCount}</p>
                <p className="text-sm text-gray-500">hover events</p>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(stat.lastHovered).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}