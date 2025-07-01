import { RateLimiterMemory } from 'rate-limiter-flexible';

export class ThrottleManager {
  constructor() {
    // Rate limiter for API requests
    this.rateLimiter = new RateLimiterMemory({
      keyPrefix: 'leadwave_api',
      points: 100, // Number of requests
      duration: 3600, // Per hour
    });

    // Rate limiter for Google API calls
    this.googleLimiter = new RateLimiterMemory({
      keyPrefix: 'leadwave_google',
      points: 1000, // Google Places API daily limit
      duration: 86400, // Per day
    });

    // Rate limiter for web scraping
    this.scrapeLimiter = new RateLimiterMemory({
      keyPrefix: 'leadwave_scrape',
      points: 10, // Requests per minute
      duration: 60,
    });
  }

  async checkLimit(identifier, type = 'api') {
    try {
      let limiter;
      
      switch (type) {
        case 'google':
          limiter = this.googleLimiter;
          break;
        case 'scrape':
          limiter = this.scrapeLimiter;
          break;
        default:
          limiter = this.rateLimiter;
      }

      await limiter.consume(identifier);
      return true;

    } catch (rejRes) {
      const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
      throw new Error(`Rate limit exceeded. Try again in ${secs} seconds.`);
    }
  }

  async getRemainingPoints(identifier, type = 'api') {
    let limiter;
    
    switch (type) {
      case 'google':
        limiter = this.googleLimiter;
        break;
      case 'scrape':
        limiter = this.scrapeLimiter;
        break;
      default:
        limiter = this.rateLimiter;
    }

    const resRateLimiter = await limiter.get(identifier);
    return resRateLimiter ? resRateLimiter.remainingPoints : limiter.points;
  }

  // Smart delay for web scraping
  async smartDelay() {
    const delay = Math.random() * 2000 + 1000; // 1-3 seconds
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
