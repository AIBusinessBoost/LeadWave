import React from 'react';
import { Shield, CheckCircle, AlertTriangle, RefreshCw, Database } from 'lucide-react';

export const DuplicateStats = ({ duplicateResults, trackerStats }) => {
  if (!duplicateResults && !trackerStats) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-green-400" />
        Duplicate Prevention System
      </h3>
      
      {duplicateResults && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <Database className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{duplicateResults.totalProcessed}</div>
            <div className="text-gray-300 text-sm">Processed</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{duplicateResults.validLeads.length}</div>
            <div className="text-gray-300 text-sm">Valid Leads</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{duplicateResults.duplicatesRejected}</div>
            <div className="text-gray-300 text-sm">Duplicates Blocked</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <RefreshCw className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{duplicateResults.updatedLeads}</div>
            <div className="text-gray-300 text-sm">Updated</div>
          </div>
        </div>
      )}
      
      {trackerStats && (
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-gray-300 mb-2">System Statistics</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Total Tracked:</span>
              <span className="text-white ml-2 font-medium">{trackerStats.totalTracked}</span>
            </div>
            <div>
              <span className="text-gray-400">Last Updated:</span>
              <span className="text-white ml-2 font-medium">
                {trackerStats.lastUpdated ? new Date(trackerStats.lastUpdated).toLocaleString() : 'Never'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
