import React, { useState } from 'react';
import { Search, MapPin, Building, Globe } from 'lucide-react';

export function SearchForm({ onSearch, loading }) {
  const [formData, setFormData] = useState({
    niche: '',
    location: '',
    country: 'US',
    maxResults: 50
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.niche.trim() || !formData.location.trim()) {
      return;
    }
    onSearch(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'SE', name: 'Sweden' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Search className="h-5 w-5 mr-2 text-blue-500" />
        Lead Search
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building className="h-4 w-4 inline mr-1" />
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
            placeholder="e.g., New York, NY or London"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

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
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
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
            <option value={25}>25 Results</option>
            <option value={50}>50 Results</option>
            <option value={100}>100 Results</option>
            <option value={200}>200 Results</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Generate Leads
            </>
          )}
        </button>
      </form>
    </div>
  );
}
