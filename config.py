"""
Configuration settings for Lead Generation Scraper
"""

import os
from typing import List, Dict

class Config:
    """Configuration class with error handling"""
    
    # Scraping settings
    MAX_WORKERS = int(os.getenv('MAX_WORKERS', '3'))
    REQUEST_TIMEOUT = int(os.getenv('REQUEST_TIMEOUT', '30'))
    MAX_RETRIES = int(os.getenv('MAX_RETRIES', '3'))
    DELAY_RANGE = (1, 3)  # Random delay between requests
    
    # File settings
    OUTPUT_DIR = os.getenv('OUTPUT_DIR', 'output')
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    
    # Error handling settings
    SKIP_ERRORS = ['404', '403', '500', '502', '503', '504']
    RETRYABLE_ERRORS = ['ConnectionError', 'Timeout', 'ReadTimeout']
    
    # Data validation
    MIN_EMAIL_LENGTH = 5
    MIN_PHONE_LENGTH = 10
    
    # Geographic settings (for future implementation)
    DEFAULT_COUNTRY = 'US'
    SUPPORTED_COUNTRIES = ['US', 'CA', 'UK', 'AU']
    
    @classmethod
    def validate_config(cls) -> bool:
        """Validate configuration settings"""
        try:
            # Create output directory if it doesn't exist
            os.makedirs(cls.OUTPUT_DIR, exist_ok=True)
            
            # Validate numeric settings
            assert cls.MAX_WORKERS > 0, "MAX_WORKERS must be positive"
            assert cls.REQUEST_TIMEOUT > 0, "REQUEST_TIMEOUT must be positive"
            assert cls.MAX_RETRIES >= 0, "MAX_RETRIES must be non-negative"
            
            return True
            
        except Exception as e:
            print(f"Configuration validation failed: {e}")
            return False

# Industry-specific search terms for lead generation
INDUSTRY_KEYWORDS = {
    'restaurants': ['restaurant', 'cafe', 'diner', 'bistro', 'eatery'],
    'retail': ['store', 'shop', 'boutique', 'retail', 'market'],
    'services': ['service', 'repair', 'maintenance', 'consulting'],
    'healthcare': ['clinic', 'medical', 'dental', 'healthcare', 'therapy'],
    'automotive': ['auto', 'car', 'automotive', 'mechanic', 'dealership'],
    'real_estate': ['real estate', 'realtor', 'property', 'homes', 'realty'],
    'fitness': ['gym', 'fitness', 'yoga', 'pilates', 'training'],
    'beauty': ['salon', 'spa', 'beauty', 'barber', 'cosmetic']
}

# Common business directory URLs (for future implementation)
BUSINESS_DIRECTORIES = [
    'yelp.com',
    'yellowpages.com',
    'google.com/maps',
    'foursquare.com',
    'bbb.org'
]
