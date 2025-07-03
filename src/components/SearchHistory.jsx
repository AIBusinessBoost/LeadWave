import React, { useState, useEffect } from 'react';
import { Clock, Search, MapPin, Filter, Trash2, RefreshCw } from 'lucide-react';

export const SearchHistory = ({ onRerunSearch }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem('leadwave_search_history') || '[]');
    setSearchHistory(history);
  }, []);

  const addToHistory = (searchParams) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      query: searchParams.query,
      location: searchParams.location,
      category: searchParams.category,
      resultsCount: searchParams.resultsCount || 0
    };

    const updatedHistory = [newEntry, ...searchHistory.slice(0, 9)]; // Keep last 10 searches
    setSearchHistory(updatedHistory);
    localStorage.setItem('leadwave_search_history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all search history?')) {
      setSearchHistory([]);
      localStorage.removeItem('leadwave_search_history');
    }
  };

  const rerunSearch = (entry) => {
    onRerunSearch({
      query: entry.query,
      location: entry.location,
      category: entry.category
    });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  // Expose addToHistory function globally so it can be called from App component
  React.useEffect(() => {
    window.addToSearchHistory = addToHistory;
    return () => {
      delete window.addToSearchHistory;
    };
  }, [searchHistory]);

  if (searchHistory.length === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-400" />
          Recent Searches
        </h3>
        <button
          onClick={clearHistory}
          className="flex items-center space-x-2 px-3 py-1 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors text-sm"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear</span>
        </button>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {searchHistory.map((entry) => (
          <div key={entry.id} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-white font-medium">{entry.query}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  {entry.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{entry.location}</span>
                    </div>
                  )}
                  {entry.category && (
                    <div className="flex items-center space-x-1">
                      <Filter className="w-3 h-3" />
                      <span>{entry.category}</span>
                    </div>
                  )}
                  <span>{entry.resultsCount} results</span>
                  <span>{formatTimestamp(entry.timestamp)}</span>
                </div>
              </div>
              
              <button
                onClick={() => rerunSearch(entry)}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Rerun</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
