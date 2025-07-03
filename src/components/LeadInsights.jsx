import React from 'react';
import { TrendingUp, Users, Star, MapPin, Building, Award, Target, Zap } from 'lucide-react';

export const LeadInsights = ({ leads }) => {
  if (!leads || leads.length === 0) return null;

  // Calculate insights
  const insights = {
    totalLeads: leads.length,
    avgRating: (leads.reduce((sum, lead) => sum + lead.rating, 0) / leads.length).toFixed(1),
    verifiedCount: leads.filter(lead => lead.verified).length,
    topCategory: getTopCategory(leads),
    topLocation: getTopLocation(leads),
    highValueLeads: leads.filter(lead => lead.rating >= 4.5 && lead.verified).length,
    newLeads: leads.filter(lead => lead.isNew).length,
    updatedLeads: leads.filter(lead => lead.isUpdated).length
  };

  function getTopCategory(leads) {
    const categories = {};
    leads.forEach(lead => {
      categories[lead.category] = (categories[lead.category] || 0) + 1;
    });
    return Object.entries(categories).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  }

  function getTopLocation(leads) {
    const locations = {};
    leads.forEach(lead => {
      const city = lead.address?.split(',')[1]?.trim() || 'Unknown';
      locations[city] = (locations[city] || 0) + 1;
    });
    return Object.entries(locations).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  }

  const verificationRate = ((insights.verifiedCount / insights.totalLeads) * 100).toFixed(1);
  const highValueRate = ((insights.highValueLeads / insights.totalLeads) * 100).toFixed(1);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-purple-400" />
        Lead Insights & Analytics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{insights.totalLeads}</div>
          <div className="text-gray-300 text-sm">Total Leads</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{insights.avgRating}</div>
          <div className="text-gray-300 text-sm">Avg Rating</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Award className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{verificationRate}%</div>
          <div className="text-gray-300 text-sm">Verified</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{highValueRate}%</div>
          <div className="text-gray-300 text-sm">High Value</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Building className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-gray-300">Top Category</span>
          </div>
          <div className="text-lg font-semibold text-white">{insights.topCategory}</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-gray-300">Top Location</span>
          </div>
          <div className="text-lg font-semibold text-white">{insights.topLocation}</div>
        </div>
      </div>
      
      {(insights.newLeads > 0 || insights.updatedLeads > 0) && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-sm">
            {insights.newLeads > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{insights.newLeads} New Leads</span>
              </div>
            )}
            {insights.updatedLeads > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">{insights.updatedLeads} Updated Leads</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
