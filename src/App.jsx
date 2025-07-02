import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, Globe, Download, Filter, Zap, Target, TrendingUp, Users, Building, Star, ChevronRight, Play, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';
import { leadTracker } from './utils/leadTracker.js';
import { DuplicateStats } from './components/DuplicateStats.jsx';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [leads, setLeads] = useState([]);
  const [duplicateResults, setDuplicateResults] = useState(null);
  const [trackerStats, setTrackerStats] = useState(null);
  const [stats, setStats] = useState({
    totalLeads: 12847,
    activeSearches: 23,
    successRate: 94.2,
    avgResponseTime: '2.3s'
  });

  // Load tracker stats on component mount
  useEffect(() => {
    setTrackerStats(leadTracker.getStats());
  }, []);

  // Mock lead data for demonstration - with variations for testing duplicates
  const generateMockLeads = (query, loc, cat, searchCount = 0) => {
    const baseLeads = [
      {
        id: 1,
        name: "TechFlow Solutions",
        category: "Technology Services",
        phone: "(555) 123-4567",
        email: "contact@techflow.com",
        website: "www.techflow.com",
        address: "123 Innovation Drive, San Francisco, CA 94105",
        rating: 4.8,
        reviews: 127,
        verified: true
      },
      {
        id: 2,
        name: "Green Valley Restaurant",
        category: "Restaurant",
        phone: "(555) 234-5678",
        email: "info@greenvalley.com",
        website: "www.greenvalley.com",
        address: "456 Main Street, Austin, TX 78701",
        rating: 4.6,
        reviews: 89,
        verified: true
      },
      {
        id: 3,
        name: "Premier Healthcare Group",
        category: "Healthcare",
        phone: "(555) 345-6789",
        email: "admin@premierhc.com",
        website: "www.premierhealthcare.com",
        address: "789 Medical Center Blvd, Miami, FL 33101",
        rating: 4.9,
        reviews: 203,
        verified: true
      },
      {
        id: 4,
        name: "Urban Retail Co.",
        category: "Retail",
        phone: "(555) 456-7890",
        email: "sales@urbanretail.com",
        website: "www.urbanretail.com",
        address: "321 Shopping Plaza, New York, NY 10001",
        rating: 4.4,
        reviews: 156,
        verified: false
      },
      {
        id: 5,
        name: "Elite Consulting Services",
        category: "Professional Services",
        phone: "(555) 567-8901",
        email: "hello@eliteconsulting.com",
        website: "www.eliteconsulting.com",
        address: "654 Business Park, Chicago, IL 60601",
        rating: 4.7,
        reviews: 94,
        verified: true
      },
      {
        id: 6,
        name: "Coastal Marketing Agency",
        category: "Marketing",
        phone: "(555) 678-9012",
        email: "team@coastalmarketing.com",
        website: "www.coastalmarketing.com",
        address: "987 Creative District, Los Angeles, CA 90210",
        rating: 4.5,
        reviews: 78,
        verified: true
      }
    ];

    // Simulate some leads with changes on subsequent searches
    const mockLeads = baseLeads.map(lead => {
      if (searchCount > 0) {
        // Simulate some leads having updated information
        if (lead.id === 1 && searchCount % 2 === 0) {
          return { ...lead, reviews: lead.reviews + 5, rating: Math.min(5.0, lead.rating + 0.1) };
        }
        if (lead.id === 3 && searchCount % 3 === 0) {
          return { ...lead, phone: "(555) 345-6790", reviews: lead.reviews + 3 };
        }
        if (lead.id === 5 && searchCount % 4 === 0) {
          return { ...lead, verified: !lead.verified, reviews: lead.reviews + 2 };
        }
      }
      return lead;
    });

    // Filter based on category if selected
    let filteredLeads = mockLeads;
    if (cat && cat !== '') {
      filteredLeads = mockLeads.filter(lead => 
        lead.category.toLowerCase().includes(cat.toLowerCase())
      );
    }

    return filteredLeads.length > 0 ? filteredLeads : mockLeads;
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate mock results with potential duplicates
      const searchCount = stats.activeSearches;
      const rawLeads = generateMockLeads(searchQuery, location, category, searchCount);
      
      // Process leads through duplicate prevention system
      const results = leadTracker.filterDuplicates(rawLeads);
      
      // Update state with filtered leads and results
      setLeads(results.validLeads);
      setDuplicateResults(results);
      setTrackerStats(leadTracker.getStats());
      
      setStats(prev => ({
        ...prev,
        totalLeads: prev.totalLeads + results.validLeads.length,
        activeSearches: prev.activeSearches + 1
      }));
      
      setIsSearching(false);

      // Log results for debugging
      console.log('🔍 Search Results:', {
        totalProcessed: results.totalProcessed,
        validLeads: results.validLeads.length,
        duplicatesRejected: results.duplicatesRejected,
        newLeads: results.newLeads,
        updatedLeads: results.updatedLeads
      });
    }, 2000);
  };

  const exportLeads = () => {
    if (leads.length === 0) {
      alert('No leads to export');
      return;
    }

    try {
      // Create CSV content with proper escaping
      const csvHeaders = [
        'Name',
        'Category', 
        'Phone',
        'Email',
        'Website',
        'Address',
        'Rating',
        'Reviews',
        'Verified',
        'Status'
      ];

      const csvRows = leads.map(lead => {
        const status = lead.isNew ? 'New' : lead.isUpdated ? 'Updated' : 'Existing';
        return [
          `"${(lead.name || '').replace(/"/g, '""')}"`,
          `"${(lead.category || '').replace(/"/g, '""')}"`,
          `"${(lead.phone || '').replace(/"/g, '""')}"`,
          `"${(lead.email || '').replace(/"/g, '""')}"`,
          `"${(lead.website || '').replace(/"/g, '""')}"`,
          `"${(lead.address || '').replace(/"/g, '""')}"`,
          `"${lead.rating || ''}"`,
          `"${lead.reviews || ''}"`,
          `"${lead.verified ? 'Yes' : 'No'}"`,
          `"${status}"`
        ].join(',');
      });

      const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `leadwave-leads-${new Date().toISOString().split('T')[0]}.csv`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      console.log('✅ CSV export successful:', leads.length, 'leads exported');
    } catch (error) {
      console.error('❌ CSV export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const clearTrackedLeads = () => {
    if (confirm('Are you sure you want to clear all tracked leads? This will allow all leads to be imported again.')) {
      leadTracker.clearAllTrackedLeads();
      setTrackerStats(leadTracker.getStats());
      setDuplicateResults(null);
      alert('All tracked leads have been cleared.');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/leadwave-logo.svg" 
                alt="LeadWave Icon" 
                className="h-8 w-8"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  LeadWave™
                </h1>
                <p className="text-gray-300 text-xs">Professional Lead Generation</p>
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
              
              {trackerStats && trackerStats.totalTracked > 0 && (
                <button
                  onClick={clearTrackedLeads}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  title="Clear all tracked leads"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden md:inline">Reset Tracker</span>
                </button>
              )}
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
              Discover and connect with potential customers using our advanced lead generation platform with intelligent duplicate prevention.
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
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="" className="text-gray-900 bg-white">All Categories</option>
                  <option value="restaurant" className="text-gray-900 bg-white">Restaurants</option>
                  <option value="retail" className="text-gray-900 bg-white">Retail</option>
                  <option value="services" className="text-gray-900 bg-white">Services</option>
                  <option value="healthcare" className="text-gray-900 bg-white">Healthcare</option>
                  <option value="technology" className="text-gray-900 bg-white">Technology</option>
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

      {/* Duplicate Prevention Stats */}
      {duplicateResults && (
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <DuplicateStats 
              duplicateResults={duplicateResults} 
              trackerStats={trackerStats} 
            />
          </div>
        </section>
      )}

      {/* Results Section */}
      {leads.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Search Results</h3>
                <p className="text-gray-300">Found {leads.length} unique leads (duplicates filtered)</p>
              </div>
              
              <button
                onClick={exportLeads}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map((lead, index) => (
                <div key={lead.id || index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 relative">
                  {/* Status Badge */}
                  {(lead.isNew || lead.isUpdated) && (
                    <div className="absolute top-4 right-4">
                      {lead.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                      )}
                      {lead.isUpdated && (
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">UPDATED</span>
                      )}
                    </div>
                  )}

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
              <h4 className="text-xl font-semibold text-white mb-4">Duplicate Prevention</h4>
              <p className="text-gray-300">
                Intelligent tracking system prevents duplicate leads while allowing updates for changed information.
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
              <img 
                src="/leadwave-logo.svg" 
                alt="LeadWave Icon" 
                className="h-6 w-6"
              />
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LeadWave™
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              Professional Lead Generation Platform
            </p>
            <p className="text-gray-400 text-sm">
              © {currentYear} LeadWave™. All rights reserved. | Powered by <a href="https://ecliptai.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">ecliptAI.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
