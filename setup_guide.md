# LeadWave™ Setup Guide for Replit

## 🚀 Quick Start Guide

### Step 1: Create Your Replit Project
1. Go to [Replit.com](https://replit.com) and create a free account
2. Click "Create Repl" and choose "Python"
3. Name your project "LeadWave"

### Step 2: Upload Files
1. Upload all LeadWave™ files to your Replit project
2. Make sure you have these files:
   - `leadwave.py` (main application)
   - `pyproject.toml` (dependencies)
   - `.env.example` (configuration template)
   - `setup_guide.md` (this file)

### Step 3: Install Dependencies
Run this command in the Replit shell:
```bash
poetry install
```

### Step 4: Configure API Keys (IMPORTANT!)

#### Get Google Maps API Key (FREE)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Google Maps JavaScript API
   - Google Places API
   - Google My Business API
4. Create credentials (API Key)
5. Copy your API key

#### Setup Environment Variables
1. Create a `.env` file in your project root
2. Copy contents from `.env.example`
3. Replace `your_google_maps_api_key_here` with your actual API key

Example `.env` file:
```
GOOGLE_MAPS_API_KEY=AIzaSyBvOkBo-bLzrFakmkz4SuTiQVuuzws
GOOGLE_PLACES_API_KEY=AIzaSyBvOkBo-bLzrFakmkz4SuTiQVuuzws
MAX_WORKERS=5
REQUEST_DELAY_MIN=2
REQUEST_DELAY_MAX=5
```

### Step 5: Run LeadWave™
```bash
python3 leadwave.py
```

## 🎯 How to Use LeadWave™

### Basic Usage
1. Run the application
2. Enter your target industry (e.g., "restaurants", "dentists", "lawyers")
3. Enter location (e.g., "New York, NY", "Los Angeles, CA")
4. Optionally specify zip codes for precise targeting
5. Set maximum number of leads to generate
6. Choose output format (CSV, JSON, or Excel)

### Example Searches
- **Restaurants in Miami**: Industry: "restaurants", Location: "Miami, FL"
- **Dentists in specific areas**: Industry: "dentists", Location: "Chicago, IL", Zip codes: "60601,60602"
- **Plumbers nationwide**: Industry: "plumbers", Location: "United States"

## 📊 Understanding Your Results

### Lead Quality Scores
- **90-100%**: Premium leads with complete information
- **80-89%**: High-quality leads with most details
- **70-79%**: Good leads with basic information
- **50-69%**: Acceptable leads (minimum threshold)

### Google Verification Status
- **Google Claimed**: Business has claimed their Google My Business listing
- **3-Pack Presence**: Business appears in Google's top 3 local results
- **Rating & Reviews**: Google rating and review count

### Data Fields Extracted
- Business name and owner name
- Direct email and phone number
- Complete address with zip code
- Website URL
- Social media profiles
- Google verification status
- Confidence score

## 🔧 Advanced Configuration

### Throttling Settings
Adjust in `.env` file:
```
REQUEST_DELAY_MIN=2  # Minimum delay between requests
REQUEST_DELAY_MAX=5  # Maximum delay between requests
MAX_WORKERS=5        # Concurrent processing threads
```

### Geographic Targeting
- **Country-level**: "United States", "Canada", "United Kingdom"
- **State-level**: "California", "Texas", "New York"
- **City-level**: "Los Angeles, CA", "Houston, TX"
- **Zip code-level**: Specify exact zip codes for precision

### Industry Keywords
LeadWave™ works with any industry:
- Professional services (lawyers, accountants, consultants)
- Healthcare (dentists, doctors, therapists)
- Home services (plumbers, electricians, contractors)
- Retail (stores, boutiques, markets)
- Food & beverage (restaurants, cafes, bars)
- Automotive (dealerships, repair shops)
- Beauty & wellness (salons, spas, gyms)

## 🛡️ Anti-Blocking Features

### Built-in Protection
- Random user agent rotation
- Intelligent request throttling
- Retry logic with exponential backoff
- Session management
- IP rotation support

### Best Practices
1. Don't run continuous scraping for hours
2. Use reasonable delays between requests
3. Respect robots.txt files
4. Monitor for rate limiting responses
5. Use different search criteria to vary patterns

## 📈 Scaling Your Lead Generation

### Daily Lead Generation
1. Set up different search criteria for each day
2. Target different geographic areas
3. Focus on different industries
4. Use the scheduling features in Replit

### Automation Tips
1. Create scripts for different niches
2. Set up automated exports
3. Use webhooks for real-time notifications
4. Integrate with CRM systems

## 🔍 Troubleshooting

### Common Issues

**"No businesses found"**
- Check your search criteria
- Try broader location terms
- Verify API keys are correct

**"API quota exceeded"**
- Google APIs have daily limits
- Wait 24 hours or upgrade your quota
- Use multiple API keys for higher volume

**"Connection errors"**
- Check internet connection
- Verify Replit is running properly
- Try reducing MAX_WORKERS

### Getting Help
1. Check the `leadwave.log` file for detailed errors
2. Verify all dependencies are installed
3. Ensure API keys are properly configured
4. Test with simple searches first

## 💡 Pro Tips

### Maximizing Lead Quality
1. Use specific industry terms
2. Target affluent zip codes
3. Focus on claimed Google listings
4. Prioritize businesses with websites
5. Look for 3-pack presence

### Data Validation
1. Cross-reference phone numbers
2. Verify email addresses
3. Check website availability
4. Validate business addresses
5. Confirm owner information

### Export Strategies
1. Use CSV for CRM imports
2. Use JSON for custom processing
3. Use Excel for manual review
4. Create separate files by criteria

## 🎉 Success Metrics

Track your LeadWave™ performance:
- **Lead volume**: Total leads generated
- **Quality score**: Average confidence rating
- **Contact rate**: Percentage with direct contact info
- **Verification rate**: Google claimed percentage
- **Conversion tracking**: Follow up on lead quality

## 🔄 Regular Maintenance

### Weekly Tasks
1. Update search criteria
2. Clean duplicate leads
3. Verify API key usage
4. Review success metrics

### Monthly Tasks
1. Update industry keywords
2. Expand geographic coverage
3. Analyze lead quality trends
4. Optimize search parameters

---

**🌊 LeadWave™ - Your Daily Lead Generation Solution**

Wake up to fresh, high-quality leads every day. No ads, no monthly fees, just results.
