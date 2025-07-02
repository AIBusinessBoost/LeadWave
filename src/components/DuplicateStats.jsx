import React from 'react';
import { Shield, Database, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function DuplicateStats({ duplicateResults, trackerStats }) {
  if (!duplicateResults) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-green-400" />
        Duplicate Prevention Report
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-blue-500/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-300 mb-1">
            {duplicateResults.totalProcessed}
          </div>
          <div className="text-xs text-gray-300">Total Processed</div>
        </div>
        
        <div className="bg-green-500/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-300 mb-1">
            {duplicateResults.newLeads}
          </div>
          <div className="text-xs text-gray-300">New Leads</div>
        </div>
        
        <div className="bg-yellow-500/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-300 mb-1">
            {duplicateResults.updatedLeads}
          </div>
          <div className="text-xs text-gray-300">Updated Leads</div>
        </div>
        
        <div className="bg-red-500/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-300 mb-1">
            {duplicateResults.duplicatesRejected}
          </div>
          <div className="text-xs text-gray-300">Duplicates Blocked</div>
        </div>
      </div>

      {duplicateResults.duplicatesRejected > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
          <div className="flex items-center text-red-300 text-sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>
              {duplicateResults.duplicatesRejected} duplicate lead{duplicateResults.duplicatesRejected !== 1 ? 's' : ''} 
              {duplicateResults.duplicatesRejected === 1 ? ' was' : ' were'} blocked (no changes detected)
            </span>
          </div>
        </div>
      )}

      {duplicateResults.updatedLeads > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
          <div className="flex items-center text-yellow-300 text-sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span>
              {duplicateResults.updatedLeads} lead{duplicateResults.updatedLeads !== 1 ? 's' : ''} 
              {duplicateResults.updatedLeads === 1 ? ' was' : ' were'} updated (changes detected)
            </span>
          </div>
        </div>
      )}

      {trackerStats && (
        <div className="border-t border-white/20 pt-4">
          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              <span>Total Tracked: {trackerStats.totalTracked}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Recent Updates: {trackerStats.recentlyUpdated}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
