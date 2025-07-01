import React from 'react';
import { Zap, Target, TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LeadWave™
              </h1>
              <p className="text-gray-600 text-sm">Professional Lead Generation</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Target className="h-5 w-5" />
              <span className="text-sm font-medium">Precision Targeting</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Real-time Results</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
