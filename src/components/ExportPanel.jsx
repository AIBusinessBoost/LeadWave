import React from 'react';
import { Download, FileText, Table } from 'lucide-react';

export function ExportPanel({ onExport, leadsCount }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Download className="h-5 w-5 mr-2 text-blue-500" />
        Export Leads
      </h2>
      
      <p className="text-gray-600 text-sm mb-4">
        {leadsCount} leads ready for export
      </p>
      
      <div className="space-y-3">
        <button
          onClick={() => onExport('csv')}
          disabled={leadsCount === 0}
          className="w-full flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Table className="h-4 w-4 mr-2" />
          Export as CSV
        </button>
        
        <button
          onClick={() => onExport('json')}
          disabled={leadsCount === 0}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as JSON
        </button>
      </div>
    </div>
  );
}
