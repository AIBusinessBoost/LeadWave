import React from 'react';
import { Building, Mail, Phone, Globe, MapPin, Star, CheckCircle, XCircle } from 'lucide-react';

export function LeadResults({ leads }) {
  if (!leads || leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No leads found yet</h3>
        <p className="text-gray-500">Start a search to generate business leads</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lead Results ({leads.length})
        </h2>
      </div>

      {leads.map((lead, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-500" />
                {lead.businessName}
              </h3>
              {lead.ownerName && (
                <p className="text-gray-600 mt-1">Owner: {lead.ownerName}</p>
              )}
            </div>
            
            <div className="flex space-x-2">
              {lead.isInGooglePack && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  3-Pack
                </span>
              )}
              {lead.isClaimed ? (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Claimed
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <XCircle className="h-3 w-3 mr-1" />
                  Unclaimed
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {lead.email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-blue-500" />
                  <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors">
                    {lead.email}
                  </a>
                </div>
              )}
              
              {lead.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-green-500" />
                  <a href={`tel:${lead.phone}`} className="hover:text-green-600 transition-colors">
                    {lead.phone}
                  </a>
                </div>
              )}
              
              {lead.website && (
                <div className="flex items-center text-gray-600">
                  <Globe className="h-4 w-4 mr-2 text-purple-500" />
                  <a 
                    href={lead.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 transition-colors truncate"
                  >
                    {lead.website}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {lead.address && (
                <div className="flex items-start text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-red-500 mt-0.5" />
                  <span className="text-sm">{lead.address}</span>
                </div>
              )}
              
              {lead.rating && (
                <div className="flex items-center text-gray-600">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  <span className="text-sm">
                    {lead.rating} ({lead.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>

          {lead.description && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">{lead.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
