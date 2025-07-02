// Lead tracking and duplicate prevention system
class LeadTracker {
  constructor() {
    this.storageKey = 'leadwave_tracked_leads';
    this.trackedLeads = this.loadTrackedLeads();
  }

  // Load previously tracked leads from localStorage
  loadTrackedLeads() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading tracked leads:', error);
      return {};
    }
  }

  // Save tracked leads to localStorage
  saveTrackedLeads() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.trackedLeads));
    } catch (error) {
      console.error('Error saving tracked leads:', error);
    }
  }

  // Generate unique identifier for a lead
  generateLeadId(lead) {
    // Use combination of name, phone, and email for unique identification
    const identifier = `${lead.name?.toLowerCase().trim()}_${lead.phone?.replace(/\D/g, '')}_${lead.email?.toLowerCase().trim()}`;
    return identifier.replace(/[^a-z0-9_]/g, '');
  }

  // Create fingerprint of lead data for change detection
  createLeadFingerprint(lead) {
    const relevantFields = {
      name: lead.name?.trim(),
      category: lead.category?.trim(),
      phone: lead.phone?.replace(/\D/g, ''), // Remove formatting
      email: lead.email?.toLowerCase().trim(),
      website: lead.website?.toLowerCase().trim(),
      address: lead.address?.trim(),
      rating: lead.rating,
      reviews: lead.reviews,
      verified: lead.verified
    };

    // Create hash-like string from relevant fields
    return JSON.stringify(relevantFields);
  }

  // Check if lead is duplicate or has changes
  processLead(lead) {
    const leadId = this.generateLeadId(lead);
    const currentFingerprint = this.createLeadFingerprint(lead);
    
    if (!leadId) {
      console.warn('Could not generate ID for lead:', lead.name);
      return { isDuplicate: false, hasChanges: false, lead };
    }

    const existingLead = this.trackedLeads[leadId];

    if (!existingLead) {
      // New lead - track it
      this.trackedLeads[leadId] = {
        fingerprint: currentFingerprint,
        firstSeen: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        importCount: 1
      };
      this.saveTrackedLeads();
      
      return { 
        isDuplicate: false, 
        hasChanges: false, 
        lead: { ...lead, isNew: true }
      };
    }

    // Existing lead - check for changes
    if (existingLead.fingerprint === currentFingerprint) {
      // Exact duplicate - reject
      console.log(`🚫 Duplicate rejected: ${lead.name} (no changes detected)`);
      return { 
        isDuplicate: true, 
        hasChanges: false, 
        lead: null 
      };
    }

    // Lead has changes - update tracking and allow
    this.trackedLeads[leadId] = {
      ...existingLead,
      fingerprint: currentFingerprint,
      lastUpdated: new Date().toISOString(),
      importCount: existingLead.importCount + 1,
      previousFingerprint: existingLead.fingerprint
    };
    this.saveTrackedLeads();

    console.log(`✅ Lead updated: ${lead.name} (changes detected)`);
    return { 
      isDuplicate: false, 
      hasChanges: true, 
      lead: { ...lead, isUpdated: true, lastSeen: existingLead.firstSeen }
    };
  }

  // Process array of leads and filter duplicates
  filterDuplicates(leads) {
    const results = {
      validLeads: [],
      duplicatesRejected: 0,
      newLeads: 0,
      updatedLeads: 0,
      totalProcessed: leads.length
    };

    leads.forEach(lead => {
      const result = this.processLead(lead);
      
      if (!result.isDuplicate && result.lead) {
        results.validLeads.push(result.lead);
        
        if (result.hasChanges) {
          results.updatedLeads++;
        } else {
          results.newLeads++;
        }
      } else {
        results.duplicatesRejected++;
      }
    });

    return results;
  }

  // Get statistics about tracked leads
  getStats() {
    const totalTracked = Object.keys(this.trackedLeads).length;
    const recentlyUpdated = Object.values(this.trackedLeads).filter(
      lead => new Date(lead.lastUpdated) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length;

    return {
      totalTracked,
      recentlyUpdated,
      oldestLead: this.getOldestLeadDate(),
      newestLead: this.getNewestLeadDate()
    };
  }

  getOldestLeadDate() {
    const dates = Object.values(this.trackedLeads).map(lead => new Date(lead.firstSeen));
    return dates.length > 0 ? new Date(Math.min(...dates)).toISOString() : null;
  }

  getNewestLeadDate() {
    const dates = Object.values(this.trackedLeads).map(lead => new Date(lead.lastUpdated));
    return dates.length > 0 ? new Date(Math.max(...dates)).toISOString() : null;
  }

  // Clear all tracked leads (for testing/reset)
  clearAllTrackedLeads() {
    this.trackedLeads = {};
    this.saveTrackedLeads();
    console.log('🗑️ All tracked leads cleared');
  }

  // Export tracked leads data
  exportTrackedLeads() {
    return {
      leads: this.trackedLeads,
      stats: this.getStats(),
      exportedAt: new Date().toISOString()
    };
  }
}

// Create singleton instance
export const leadTracker = new LeadTracker();
