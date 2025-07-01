import axios from 'axios';
import * as cheerio from 'cheerio';
import Bottleneck from 'bottleneck';

// Rate limiter to prevent being blocked
const limiter = new Bottleneck({
  minTime: 1000, // 1 second between requests
  maxConcurrent: 2
});

export async function searchLeads({ niche, location, country, maxResults }) {
  try {
    console.log(`🔍 Searching for ${niche} in ${location}, ${country}`);
    
    // Search Google Places for businesses
    const googleResults = await searchGooglePlaces(niche, location, country, maxResults);
    
    // Enrich with additional data
    const enrichedLeads = await enrichLeadsData(googleResults);
    
    return {
      leads: enrichedLeads,
      totalSearched: googleResults.length,
      leadsFound: enrichedLeads.length,
      successRate: googleResults.length > 0 ? Math.round((enrichedLeads.length / googleResults.length) * 100) : 0
    };
  } catch (error) {
    console.error('Lead search error:', error);
    throw new Error(`Failed to search leads: ${error.message}`);
  }
}

async function searchGooglePlaces(niche, location, country, maxResults) {
  // Mock data for development - replace with actual Google Places API
  const mockLeads = [
    {
      businessName: "Joe's Pizza Palace",
      ownerName: "Joe Martinez",
      email: "joe@joespizza.com",
      phone: "+1-555-0123",
      website: "https://joespizza.com",
      address: "123 Main St, New York, NY 10001",
      rating: 4.5,
      reviewCount: 127,
      isInGooglePack: true,
      isClaimed: true,
      description: "Authentic New York style pizza since 1985"
    },
    {
      businessName: "Downtown Dental Care",
      ownerName: "Dr. Sarah Johnson",
      email: "info@downtowndental.com",
      phone: "+1-555-0456",
      website: "https://downtowndental.com",
      address: "456 Oak Ave, New York, NY 10002",
      rating: 4.8,
      reviewCount: 89,
      isInGooglePack: false,
      isClaimed: true,
      description: "Complete dental care for the whole family"
    },
    {
      businessName: "Quick Fix Plumbing",
      ownerName: "Mike Thompson",
      email: "mike@quickfixplumbing.com",
      phone: "+1-555-0789",
      website: "https://quickfixplumbing.com",
      address: "789 Pine St, New York, NY 10003",
      rating: 4.2,
      reviewCount: 45,
      isInGooglePack: true,
      isClaimed: false,
      description: "24/7 emergency plumbing services"
    }
  ];

  // Filter mock data based on niche
  const filteredLeads = mockLeads.filter(lead => 
    lead.businessName.toLowerCase().includes(niche.toLowerCase()) ||
    lead.description.toLowerCase().includes(niche.toLowerCase())
  );

  return filteredLeads.slice(0, maxResults);
}

async function enrichLeadsData(leads) {
  const enrichedLeads = [];
  
  for (const lead of leads) {
    try {
      // Add rate limiting
      const enrichedLead = await limiter.schedule(() => enrichSingleLead(lead));
      enrichedLeads.push(enrichedLead);
    } catch (error) {
      console.error(`Failed to enrich lead ${lead.businessName}:`, error);
      // Include the original lead even if enrichment fails
      enrichedLeads.push(lead);
    }
  }
  
  return enrichedLeads;
}

async function enrichSingleLead(lead) {
  try {
    // Mock enrichment - in production, this would scrape websites, verify emails, etc.
    const enrichedLead = {
      ...lead,
      lastUpdated: new Date().toISOString(),
      dataQuality: calculateDataQuality(lead)
    };
    
    return enrichedLead;
  } catch (error) {
    console.error(`Enrichment error for ${lead.businessName}:`, error);
    return lead;
  }
}

function calculateDataQuality(lead) {
  let score = 0;
  const fields = ['businessName', 'email', 'phone', 'website', 'address'];
  
  fields.forEach(field => {
    if (lead[field] && lead[field].trim()) {
      score += 20;
    }
  });
  
  return Math.min(score, 100);
}
