import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
