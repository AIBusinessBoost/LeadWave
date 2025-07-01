import React from 'react';
import { BarChart3, Target, TrendingUp } from 'lucide-react';

export function StatsPanel({ stats }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
        Search Statistics
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Total Searched</span>
          </div>
          <span className="text-lg font-bold text-blue-600">{stats.totalSearched}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Leads Found</span>
          </div>
          <span className="text-lg font-bold text-green-600">{stats.leadsFound}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Success Rate</span>
          </div>
          <span className="text-lg font-bold text-purple-600">{stats.successRate}%</span>
        </div>
      </div>
    </div>
  );
}
