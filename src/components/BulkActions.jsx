import React, { useState } from 'react';
import { CheckSquare, Square, Send, Download, Trash2, Tag, Users, Mail } from 'lucide-react';

export const BulkActions = ({ leads, onBulkEmail, onBulkExport, onBulkDelete }) => {
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);

  const toggleLead = (leadId) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const selectAll = () => {
    if (selectedLeads.size === leads.length) {
      setSelectedLeads(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedLeads(new Set(leads.map(lead => lead.id)));
      setShowBulkActions(true);
    }
  };

  const handleBulkEmail = () => {
    const selectedLeadData = leads.filter(lead => selectedLeads.has(lead.id));
    onBulkEmail(selectedLeadData);
  };

  const handleBulkExport = () => {
    const selectedLeadData = leads.filter(lead => selectedLeads.has(lead.id));
    onBulkExport(selectedLeadData);
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedLeads.size} selected leads?`)) {
      onBulkDelete(Array.from(selectedLeads));
      setSelectedLeads(new Set());
      setShowBulkActions(false);
    }
  };

  return (
    <div className="mb-6">
      {/* Selection Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={selectAll}
              className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
            >
              {selectedLeads.size === leads.length ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              <span className="text-sm">
                {selectedLeads.size === leads.length ? 'Deselect All' : 'Select All'}
              </span>
            </button>
            
            {selectedLeads.size > 0 && (
              <div className="text-sm text-gray-300">
                {selectedLeads.size} of {leads.length} leads selected
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Users className="w-4 h-4" />
            <span>{leads.length} Total Leads</span>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-xl p-4 border border-blue-500/30 mb-4 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">
                Bulk Actions ({selectedLeads.size} selected)
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBulkEmail}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Send Emails</span>
              </button>
              
              <button
                onClick={handleBulkExport}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              
              <button
                onClick={handleBulkDelete}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selection Checkboxes for Leads */}
      <div className="hidden">
        {leads.map(lead => (
          <input
            key={lead.id}
            type="checkbox"
            checked={selectedLeads.has(lead.id)}
            onChange={() => toggleLead(lead.id)}
            data-lead-id={lead.id}
          />
        ))}
      </div>
    </div>
  );
};
