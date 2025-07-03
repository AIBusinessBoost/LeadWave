import React from 'react';
import { Download, RefreshCw, Trash2, BarChart3, Settings, Zap } from 'lucide-react';

export const QuickActions = ({ 
  onExport, 
  onRefresh, 
  onClearData, 
  onShowAnalytics, 
  onShowSettings, 
  leadsCount 
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-yellow-400" />
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <button
          onClick={onExport}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Export ({leadsCount})</span>
        </button>
        
        <button
          onClick={onRefresh}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm">Refresh</span>
        </button>
        
        <button
          onClick={onShowAnalytics}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm">Analytics</span>
        </button>
        
        <button
          onClick={onShowSettings}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600/20 text-gray-300 rounded-lg hover:bg-gray-600/30 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
        
        <button
          onClick={onClearData}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">Clear Data</span>
        </button>
      </div>
    </div>
  );
};
