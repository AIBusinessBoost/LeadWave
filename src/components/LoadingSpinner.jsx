import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <Loader2 className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Generating Leads...</h3>
      <p className="text-gray-500">Searching for business contacts and information</p>
      <div className="mt-4 bg-gray-200 rounded-full h-2">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
      </div>
    </div>
  );
}
