import React, { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { LeadResults } from './components/LeadResults';
import { Waves, Zap, Target, BarChart3 } from 'lucide-react';

function App() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/leads/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setLeads(data.leads);
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LeadWave™</h1>
                <p className="text-sm text-gray-600">Enterprise Lead Generation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1 text-green-500" />
                  <span>AI Scoring</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>Bulk Operations</span>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1 text-blue-500" />
                  <span>Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          
          {searchResults && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{searchResults.totalSearched}</div>
                  <div className="text-sm text-gray-600">Businesses Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{searchResults.leadsFound}</div>
                  <div className="text-sm text-gray-600">Quality Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{searchResults.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {searchResults.isDemoData ? 'DEMO' : 'LIVE'}
                  </div>
                  <div className="text-sm text-gray-600">Data Mode</div>
                </div>
              </div>
            </div>
          )}
          
          <LeadResults leads={leads} isDemoData={searchResults?.isDemoData} />
        </div>
      </main>
    </div>
  );
}

export default App;
