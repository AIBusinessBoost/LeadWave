import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { LeadResults } from './components/LeadResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { StatsPanel } from './components/StatsPanel';
import { ExportPanel } from './components/ExportPanel';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchStats, setSearchStats] = useState({
    totalSearched: 0,
    leadsFound: 0,
    successRate: 0
  });

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/leads/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLeads(data.leads || []);
      setSearchStats({
        totalSearched: data.totalSearched || 0,
        leadsFound: data.leads?.length || 0,
        successRate: data.successRate || 0
      });
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await fetch(`/api/leads/export?format=${format}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leads }),
      });

      if (!response.ok) {
        throw new Error(`Export failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `leadwave-export.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(`Export failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Panel */}
          <div className="lg:col-span-1">
            <SearchForm onSearch={handleSearch} loading={loading} />
            <StatsPanel stats={searchStats} />
            <ExportPanel onExport={handleExport} leadsCount={leads.length} />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
            {!loading && !error && <LeadResults leads={leads} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
