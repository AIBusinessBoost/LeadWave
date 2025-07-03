class LeadTracker {
  constructor() {
    this.trackedLeads = new Map();
    this.loadFromStorage();
  }

  // Load tracked leads from localStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('leadwave_tracked_leads');
      if (stored) {
        const data = JSON.parse(stored);
        this.trackedLeads = new Map(data);
      }
    } catch (error) {
      console.error('Error loading tracked leads:', error);
      this.trackedLeads = new Map();
    }
  }

  // Save tracked leads to localStorage
  saveToStorage() {
    try {
      const data = Array.from(this.trackedLeads.entries());
      localStorage.setItem('leadwave_tracked_leads', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving tracked leads:', error);
    }
  }

  // Generate a unique key for a lead
  generateLeadKey(lead) {
    // Use email as primary identifier, fallback to name + phone
    if (lead.email) {
      return `email:${lead.email.toLowerCase()}`;
    }
    if (lead.name && lead.phone) {
      return `name_phone:${lead.name.toLowerCase()}:${lead.phone}`;
    }
    return `id:${lead.id}`;
  }

  // Check if a lead is a duplicate or updated version
  isDuplicateOrUpdated(lead) {
    const key = this.generateLeadKey(lead);
    const existing = this.trackedLeads.get(key);
    
    if (!existing) {
      return { isDuplicate: false, isUpdated: false };
    }

    // Check if any important fields have changed
    const hasChanges = (
      existing.phone !== lead.phone ||
      existing.rating !== lead.rating ||
      existing.reviews !== lead.reviews ||
      existing.verified !== lead.verified ||
      existing.address !== lead.address ||
      existing.website !== lead.website
    );

    return {
      isDuplicate: !hasChanges,
      isUpdated: hasChanges,
      existing: existing
    };
  }

  // Add or update a lead in tracking
  trackLead(lead) {
    const key = this.generateLeadKey(lead);
    const leadData = {
      ...lead,
      firstSeen: this.trackedLeads.get(key)?.firstSeen || new Date().toISOString(),
      lastSeen: new Date().toISOString()
    };
    
    this.trackedLeads.set(key, leadData);
    this.saveToStorage();
  }

  // Filter out duplicates from a list of leads
  filterDuplicates(leads) {
    const results = {
      totalProcessed: leads.length,
      validLeads: [],
      duplicatesRejected: 0,
      newLeads: 0,
      updatedLeads: 0
    };

    leads.forEach(lead => {
      const check = this.isDuplicateOrUpdated(lead);
      
      if (check.isDuplicate) {
        results.duplicatesRejected++;
        console.log(`🚫 Duplicate rejected: ${lead.name} (${lead.email})`);
      } else if (check.isUpdated) {
        // Include updated lead with special marking
        const updatedLead = { ...lead, isUpdated: true };
        results.validLeads.push(updatedLead);
        results.updatedLeads++;
        this.trackLead(lead);
        console.log(`🔄 Lead updated: ${lead.name} (${lead.email})`);
      } else {
        // New lead
        const newLead = { ...lead, isNew: true };
        results.validLeads.push(newLead);
        results.newLeads++;
        this.trackLead(lead);
        console.log(`✅ New lead added: ${lead.name} (${lead.email})`);
      }
    });

    return results;
  }

  // Get tracking statistics
  getStats() {
    return {
      totalTracked: this.trackedLeads.size,
      lastUpdated: this.trackedLeads.size > 0 ? 
        Math.max(...Array.from(this.trackedLeads.values()).map(lead => new Date(lead.lastSeen).getTime())) : 
        null
    };
  }

  // Clear all tracked leads
  clearAllTrackedLeads() {
    this.trackedLeads.clear();
    this.saveToStorage();
    console.log('🗑️ All tracked leads cleared');
  }

  // Get all tracked leads
  getAllTrackedLeads() {
    return Array.from(this.trackedLeads.values());
  }
}

// Create and export singleton instance
export const leadTracker = new LeadTracker();
