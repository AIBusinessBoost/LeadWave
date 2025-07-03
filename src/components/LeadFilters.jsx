import React, { useState } from 'react';
import { Filter, Star, Shield, Tag } from 'lucide-react';

export const LeadFilters = ({ leads, onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    verified: 'All',
    status: 'All'
  });

  const categories = [...new Set(leads.map(lead => lead.category))];
  const ratings = ['4.5+', '4.0+', '3.5+', '3.0+'];
  const verificationOptions = ['All', 'Verified Only', 'Unverified Only'];
  const statusOptions = ['All', 'New', 'Updated', 'Existing'];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      rating: '',
      verified: 'All',
      status: 'All'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Filter className="w-5 h-5 mr-2 text-blue-400" />
          Advanced Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-300 hover:text-white transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Tag className="w-4 h-4 inline mr-1" />
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="" className="text-gray-900 bg-white">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category} className="text-gray-900 bg-white">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Star className="w-4 h-4 inline mr-1" />
            Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="" className="text-gray-900 bg-white">All Ratings</option>
            {ratings.map(rating => (
              <option key={rating} value={rating} className="text-gray-900 bg-white">
                {rating}
              </option>
            ))}
          </select>
        </div>

        {/* Verification Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Shield className="w-4 h-4 inline mr-1" />
            Verification
          </label>
          <select
            value={filters.verified}
            onChange={(e) => handleFilterChange('verified', e.target.value)}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {verificationOptions.map(option => (
              <option key={option} value={option} className="text-gray-900 bg-white">
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Filter className="w-4 h-4 inline mr-1" />
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {statusOptions.map(option => (
              <option key={option} value={option} className="text-gray-900 bg-white">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
