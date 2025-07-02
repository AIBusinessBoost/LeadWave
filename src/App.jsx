import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, Globe, Download, Filter, Zap, Target, TrendingUp, Users, Building, Star, ChevronRight, Play, CheckCircle } from 'lucide-react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 12847,
    activeSearches: 23,
    successRate: 94.2,
    avgResponseTime: '2.3s'
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Make actual API call to backend
      const response = await fetch('/api/search-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          location: location,
          category: category
        })
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
        setStats(prev => ({
          ...prev,
          totalLeads: prev.totalLeads + (data.leads?.length || 0),
          activeSearches: prev.activeSearches + 1
        }));
      } else {
        console.error('API request failed:', response.statusText);
        setLeads([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setLeads([]);
    } finally {
      setIsSearching(false);
    }
  };

  const exportLeads = () => {
    const csvContent = leads.map(lead => 
      `${lead.name},${lead.category},${lead.phone},${lead.email},${lead.website},${lead.address}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leadwave-leads.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12C22 12 19 16 12 16C5 16 2 12 2 12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="currentColor"/>
                  <path d="M2 12C4 8 8 6 12 6C16 6 20 8 22 12" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <path d="M2 12C4 16 8 18 12 18C16 18 20 16 22 12" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LeadWave™</h1>
                <p className="text-xs text-gray-300">Professional Lead Generation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
                <span>{stats.totalLeads.toLocaleString()} Leads Generated</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Generate High-Quality
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Business Leads
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover and connect with potential customers using our advanced lead generation platform powered by Google Places API.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">{stats.totalLeads.toLocaleString()}</div>
              <div className="text-gray-300 text-sm">Total Leads</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">{stats.activeSearches}</div>
              <div className="text-gray-300 text-sm">Active Searches</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">{stats.successRate}%</div>
              <div className="text-gray-300 text-sm">Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">{stats.avgResponseTime}</div>
              <div className="text-gray-300 text-sm">Avg Response</div>
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for businesses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location (city, state)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  style={{ color: '#d1d5db' }}
                >
                  <option value="" style={{ color: '#374151', backgroundColor: '#ffffff' }}>All Categories</option>
                  <option value="restaurant" style={{ color: '#374151', backgroundColor: '#ffffff' }}>Restaurants</option>
                  <option value="retail" style={{ color: '#374151', backgroundColor: '#ffffff' }}>Retail</option>
                  <option value="services" style={{ color: '#374151', backgroundColor: '#ffffff' }}>Services</option>
                  <option value="healthcare" style={{ color: '#374151', backgroundColor: '#ffffff' }}>Healthcare</option>
                  <option value="technology" style={{ color: '#374151', backgroundColor: '#ffffff' }}>Technology</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Generate Leads</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {leads.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Search Results</h3>
                <p className="text-gray-300">Found {leads.length} potential leads</p>
              </div>
              
              <button
                onClick={exportLeads}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map((lead, index) => (
                <div key={lead.id || index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-white">{lead.name}</h4>
                        {lead.verified && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <p className="text-blue-300 text-sm mb-2">{lead.category}</p>
                      <div className="flex items-center space-x-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">{lead.rating}</span>
                        <span className="text-gray-300 text-sm">({lead.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{lead.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{lead.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Globe className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{lead.website}</span>
                    </div>
                    
                    <div className="flex items-start space-x-3 text-gray-300">
                      <MapPin className="w-4 h-4 text-red-400 mt-0.5" />
                      <span className="text-sm">{lead.address}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Why Choose LeadWave™?</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced features designed to supercharge your lead generation efforts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Precision Targeting</h4>
              <p className="text-gray-300">
                Advanced filtering and search capabilities to find exactly the leads you need for your business.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Real-time Data</h4>
              <p className="text-gray-300">
                Access up-to-date business information with real-time verification and contact details.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Bulk Export</h4>
              <p className="text-gray-300">
                Export thousands of leads in various formats including CSV, Excel, and JSON for easy integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12C22 12 19 16 12 16C5 16 2 12 2 12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="currentColor"/>
                  <path d="M2 12C4 8 8 6 12 6C16 6 20 8 22 12" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <path d="M2 12C4 16 8 18 12 18C16 18 20 16 22 12" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">LeadWave™</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional Lead Generation Platform
            </p>
            <p className="text-gray-400 text-sm">
              © 2024 LeadWave™. All rights reserved. | Powered by Google Places API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
