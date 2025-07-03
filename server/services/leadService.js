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
    
    // IMPORTANT: This is a demo version - replace with real Google Places API
    console.warn('⚠️  DEMO MODE: Using placeholder data. Connect Google Places API for real leads.');
    
    // Search Google Places for businesses
    const googleResults = await searchGooglePlaces(niche, location, country, maxResults);
    
    // Enrich with additional data
    const enrichedLeads = await enrichLeadsData(googleResults);
    
    return {
      leads: enrichedLeads,
      totalSearched: googleResults.length,
      leadsFound: enrichedLeads.length,
      successRate: googleResults.length > 0 ? Math.round((enrichedLeads.length / googleResults.length) * 100) : 0,
      isDemoData: true // Flag to indicate this is demo data
    };
  } catch (error) {
    console.error('Lead search error:', error);
    throw new Error(`Failed to search leads: ${error.message}`);
  }
}

async function searchGooglePlaces(niche, location, country, maxResults) {
  // DEMO DATA - Replace with actual Google Places API integration
  const demoLeads = [
    {
      businessName: `${niche} Pro Services`,
      ownerName: "Demo Owner",
      email: `info@${niche.toLowerCase().replace(/\s+/g, '')}pro.com`,
      phone: "+1-555-DEMO",
      website: `https://${niche.toLowerCase().replace(/\s+/g, '')}pro.com`,
      address: `123 Demo St, ${location}`,
      rating: 4.2,
      reviewCount: 25,
      isInGooglePack: false,
      isClaimed: true,
      description: `Professional ${niche} services in ${location}`,
      isDemoData: true
    },
    {
      businessName: `${location} ${niche} Solutions`,
      ownerName: "Sample Business Owner",
      email: `contact@${location.toLowerCase().replace(/\s+/g, '')}${niche.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: "+1-555-SAMPLE",
      website: `https://${location.toLowerCase().replace(/\s+/g, '')}${niche.toLowerCase().replace(/\s+/g, '')}.com`,
      address: `456 Sample Ave, ${location}`,
      rating: 4.7,
      reviewCount: 89,
      isInGooglePack: true,
      isClaimed: false,
      description: `Leading ${niche} provider in ${location}`,
      isDemoData: true
    }
  ];

  return demoLeads.slice(0, maxResults);
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
    // Demo enrichment - in production, this would scrape websites, verify emails, etc.
    const enrichedLead = {
      ...lead,
      lastUpdated: new Date().toISOString(),
      dataQuality: calculateDataQuality(lead),
      isDemoData: true
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
