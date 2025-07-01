import axios from 'axios';
import * as cheerio from 'cheerio';

export class LeadScraper {
  constructor() {
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
  }

  async enhanceLeads(places) {
    const enhanced = await Promise.all(
      places.map(place => this.enhanceLead(place))
    );
    
    return enhanced.filter(lead => lead !== null);
  }

  async enhanceLead(place) {
    try {
      let emailData = null;
      let ownerInfo = null;
      let socialMedia = {};

      // Try to extract email and owner info from website
      if (place.website) {
        try {
          const websiteData = await this.scrapeWebsite(place.website);
          emailData = websiteData.emails;
          ownerInfo = websiteData.owner;
          socialMedia = websiteData.socialMedia;
        } catch (error) {
          console.warn(`Failed to scrape website ${place.website}:`, error.message);
        }
      }

      // Check if business appears in Google 3-pack
      const googlePackStatus = await this.checkGooglePack(place.name, place.address);

      return {
        ...place,
        emails: emailData || [],
        owner: ownerInfo,
        socialMedia,
        googlePackStatus,
        leadScore: this.calculateLeadScore(place, emailData, ownerInfo),
        scrapedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error(`Failed to enhance lead ${place.name}:`, error);
      return place;
    }
  }

  async scrapeWebsite(url) {
    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 10000,
        maxRedirects: 3
      });

      const $ = cheerio.load(response.data);
      
      // Extract emails
      const emails = this.extractEmails(response.data);
      
      // Extract owner/contact info
      const owner = this.extractOwnerInfo($);
      
      // Extract social media links
      const socialMedia = this.extractSocialMedia($);

      return { emails, owner, socialMedia };

    } catch (error) {
      throw new Error(`Website scraping failed: ${error.message}`);
    }
  }

  extractEmails(html) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = html.match(emailRegex) || [];
    
    // Filter out common non-business emails
    const filtered = emails.filter(email => {
      const domain = email.split('@')[1].toLowerCase();
      return !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain);
    });

    return [...new Set(filtered)]; // Remove duplicates
  }

  extractOwnerInfo($) {
    const ownerSelectors = [
      'meta[name="author"]',
      '.owner', '.founder', '.ceo', '.president',
      '[class*="owner"]', '[class*="founder"]', '[class*="ceo"]',
      'h1:contains("Owner")', 'h2:contains("Owner")', 'h3:contains("Owner")',
      '.about-owner', '.team-owner', '.leadership'
    ];

    for (const selector of ownerSelectors) {
      const element = $(selector).first();
      if (element.length) {
        const text = element.text().trim();
        if (text && text.length > 2 && text.length < 100) {
          return {
            name: text,
            source: selector
          };
        }
      }
    }

    return null;
  }

  extractSocialMedia($) {
    const socialMedia = {};
    
    $('a[href*="facebook.com"]').each((i, el) => {
      socialMedia.facebook = $(el).attr('href');
    });
    
    $('a[href*="twitter.com"], a[href*="x.com"]').each((i, el) => {
      socialMedia.twitter = $(el).attr('href');
    });
    
    $('a[href*="linkedin.com"]').each((i, el) => {
      socialMedia.linkedin = $(el).attr('href');
    });
    
    $('a[href*="instagram.com"]').each((i, el) => {
      socialMedia.instagram = $(el).attr('href');
    });

    return socialMedia;
  }

  async checkGooglePack(businessName, address) {
    try {
      // This would require additional Google API calls or web scraping
      // For now, return a placeholder implementation
      return {
        inThreePack: Math.random() > 0.7, // Simulate 30% chance
        claimed: Math.random() > 0.5,     // Simulate 50% chance
        checkedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        inThreePack: false,
        claimed: false,
        error: error.message
      };
    }
  }

  calculateLeadScore(place, emails, owner) {
    let score = 0;
    
    // Base score from Google data
    if (place.hasPhone) score += 20;
    if (place.hasWebsite) score += 20;
    if (place.isVerified) score += 15;
    if (place.rating >= 4.0) score += 10;
    if (place.totalReviews >= 10) score += 10;
    
    // Bonus for scraped data
    if (emails && emails.length > 0) score += 25;
    if (owner) score += 15;
    
    return Math.min(score, 100);
  }
}
