import React, { useState } from 'react';
import { Search, MapPin, Globe, Users, AlertCircle } from 'lucide-react';

export function SearchForm({ onSearch, isLoading }) {
  const [formData, setFormData] = useState({
    niche: '',
    location: '',
    country: 'US',
    maxResults: 50
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.niche && formData.location) {
      onSearch(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Demo Warning */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
        <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
        <div>
          <h4 className="font-semibold text-blue-800 mb-1">Demo Version</h4>
          <p className="text-blue-700 text-sm">
            This is a demonstration version using sample data. To get real business leads, you'll need to:
          </p>
          <ul className="text-blue-700 text-sm mt-2 ml-4 list-disc">
            <li>Connect Google Places API</li>
            <li>Set up web scraping services</li>
            <li>Configure email verification</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Search className="h-6 w-6 mr-2 text-blue-500" />
        Find Business Leads
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="h-4 w-4 inline mr-1" />
              Business Niche
            </label>
            <input
              type="text"
              name="niche"
              value={formData.niche}
              onChange={handleChange}
              placeholder="e.g., restaurants, dentists, plumbers"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., New York, Los Angeles"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="h-4 w-4 inline mr-1" />
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Results
            </label>
            <select
              name="maxResults"
              value={formData.maxResults}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={10}>10 leads</option>
              <option value={25}>25 leads</option>
              <option value={50}>50 leads</option>
              <option value={100}>100 leads</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.niche || !formData.location}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching for leads...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Generate Demo Leads
            </>
          )}
        </button>
      </form>
    </div>
  );
}
