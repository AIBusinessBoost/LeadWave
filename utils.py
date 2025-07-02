"""
Utility functions for Lead Generation Scraper
"""

import re
import logging
from typing import List, Dict, Optional
from urllib.parse import urlparse, urljoin
import phonenumbers
from phonenumbers import NumberParseException

logger = logging.getLogger(__name__)

class DataValidator:
    """Data validation utilities with error handling"""
    
    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email address with error handling"""
        try:
            if not email or len(email) < 5:
                return False
            
            # Basic email regex
            pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            
            if not re.match(pattern, email):
                return False
            
            # Check for common invalid patterns
            invalid_patterns = [
                'noreply', 'no-reply', 'donotreply', 'example.com',
                'test@', '@test', 'admin@localhost'
            ]
            
            email_lower = email.lower()
            return not any(pattern in email_lower for pattern in invalid_patterns)
            
        except Exception as e:
            logger.error(f"Email validation error: {e}")
            return False
    
    @staticmethod
    def validate_phone(phone: str, country_code: str = 'US') -> bool:
        """Validate phone number with error handling"""
        try:
            if not phone or len(phone) < 10:
                return False
            
            # Try to parse with phonenumbers library
            try:
                parsed = phonenumbers.parse(phone, country_code)
                return phonenumbers.is_valid_number(parsed)
            except NumberParseException:
                # Fallback to basic validation
                cleaned = re.sub(r'[^\d]', '', phone)
                return 10 <= len(cleaned) <= 15
                
        except Exception as e:
            logger.error(f"Phone validation error: {e}")
            return False
    
    @staticmethod
    def clean_business_name(name: str) -> str:
        """Clean and normalize business name"""
        try:
            if not name:
                return ""
            
            # Remove common suffixes from title tags
            suffixes_to_remove = [
                ' - Home', ' | Home', ' - Welcome', ' | Welcome',
                ' - Official Site', ' | Official Site'
            ]
            
            cleaned = name.strip()
            for suffix in suffixes_to_remove:
                if cleaned.endswith(suffix):
                    cleaned = cleaned[:-len(suffix)]
            
            return cleaned.strip()
            
        except Exception as e:
            logger.error(f"Business name cleaning error: {e}")
            return name

class URLProcessor:
    """URL processing utilities with error handling"""
    
    @staticmethod
    def normalize_url(url: str) -> Optional[str]:
        """Normalize URL with error handling"""
        try:
            if not url:
                return None
            
            # Add protocol if missing
            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url
            
            parsed = urlparse(url)
            
            # Basic validation
            if not parsed.netloc:
                return None
            
            return url
            
        except Exception as e:
            logger.error(f"URL normalization error: {e}")
            return None
    
    @staticmethod
    def extract_domain(url: str) -> Optional[str]:
        """Extract domain from URL with error handling"""
        try:
            parsed = urlparse(url)
            return parsed.netloc.lower()
        except Exception as e:
            logger.error(f"Domain extraction error: {e}")
            return None
    
    @staticmethod
    def is_valid_business_url(url: str) -> bool:
        """Check if URL is likely a business website"""
        try:
            domain = URLProcessor.extract_domain(url)
            if not domain:
                return False
            
            # Skip common non-business domains
            skip_domains = [
                'facebook.com', 'twitter.com', 'instagram.com',
                'linkedin.com', 'youtube.com', 'google.com',
                'wikipedia.org', 'github.com'
            ]
            
            return not any(skip in domain for skip in skip_domains)
            
        except Exception as e:
            logger.error(f"URL validation error: {e}")
            return False

class TextProcessor:
    """Text processing utilities with error handling"""
    
    @staticmethod
    def extract_addresses(text: str) -> List[str]:
        """Extract potential addresses from text"""
        try:
            # Pattern for US addresses
            address_patterns = [
                r'\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Court|Ct|Place|Pl)\s*,?\s*[A-Za-z\s]+,?\s*[A-Z]{2}\s*\d{5}',
                r'\d+\s+[A-Za-z\s]+,\s*[A-Za-z\s]+,\s*[A-Z]{2}\s*\d{5}'
            ]
            
            addresses = []
            for pattern in address_patterns:
                matches = re.findall(pattern, text, re.IGNORECASE)
                addresses.extend(matches)
            
            return list(set(addresses))
            
        except Exception as e:
            logger.error(f"Address extraction error: {e}")
            return []
    
    @staticmethod
    def extract_zip_codes(text: str) -> List[str]:
        """Extract ZIP codes from text"""
        try:
            # US ZIP code patterns
            zip_patterns = [
                r'\b\d{5}(?:-\d{4})?\b',  # 12345 or 12345-6789
                r'\b[A-Z]\d[A-Z]\s*\d[A-Z]\d\b'  # Canadian postal codes
            ]
            
            zip_codes = []
            for pattern in zip_patterns:
                matches = re.findall(pattern, text)
                zip_codes.extend(matches)
            
            return list(set(zip_codes))
            
        except Exception as e:
            logger.error(f"ZIP code extraction error: {e}")
            return []

def safe_get_text(element, default: str = "") -> str:
    """Safely extract text from BeautifulSoup element"""
    try:
        return element.get_text().strip() if element else default
    except Exception as e:
        logger.error(f"Text extraction error: {e}")
        return default

def safe_get_attribute(element, attr: str, default: str = "") -> str:
    """Safely extract attribute from BeautifulSoup element"""
    try:
        return element.get(attr, default) if element else default
    except Exception as e:
        logger.error(f"Attribute extraction error: {e}")
        return default
