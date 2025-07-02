#!/usr/bin/env python3
"""
LeadWave™ Usage Examples
Demonstrates various ways to use the lead generation system
"""

from leadwave import LeadWave, BusinessLead
import asyncio
from typing import List

def example_restaurant_leads():
    """Example: Generate restaurant leads in specific zip codes"""
    print("🍽️  Example: Restaurant Lead Generation")
    print("-" * 40)
    
    leadwave = LeadWave()
    
    # Target high-end restaurant areas
    leads = leadwave.generate_leads(
        industry="fine dining restaurants",
        location="Manhattan, NY",
        zip_codes=["10001", "10002", "10003", "10004"],
        max_leads=25
    )
    
    # Filter for high-quality leads only
    premium_leads = [lead for lead in leads if lead.confidence_score >= 80]
    
    print(f"Generated {len(premium_leads)} premium restaurant leads")
    
    # Save with custom filename
    leadwave.save_leads("restaurant_leads_manhattan", format='excel')
    
    return premium_leads

def example_healthcare_leads():
    """Example: Generate healthcare professional leads"""
    print("🏥 Example: Healthcare Lead Generation")
    print("-" * 40)
    
    leadwave = LeadWave()
    
    # Target multiple healthcare niches
    healthcare_niches = [
        "dental practices",
        "medical clinics", 
        "physical therapy",
        "chiropractic offices"
    ]
    
    all_leads = []
    
    for niche in healthcare_niches:
        print(f"Searching {niche}...")
        
        leads = leadwave.generate_leads(
            industry=niche,
            location="Los Angeles, CA",
            max_leads=20
        )
        
        # Add niche tag to leads
        for lead in leads:
            lead.industry = niche
        
        all_leads.extend(leads)
    
    # Save combined results
    leadwave.leads = all_leads
    leadwave.save_leads("healthcare_leads_la", format='csv')
    
    print(f"Total healthcare leads: {len(all_leads)}")
    return all_leads

def example_service_business_leads():
    """Example: Generate home service business leads"""
    print("🔧 Example: Service Business Lead Generation")
    print("-" * 40)
    
    leadwave = LeadWave()
    
    # Target service businesses in suburban areas
    service_types = [
        "plumbing services",
        "electrical contractors", 
        "HVAC companies",
        "landscaping services"
    ]
    
    # Target multiple suburban markets
    markets = [
        "Plano, TX",
        "Scottsdale, AZ", 
        "Naperville, IL"
    ]
    
    all_leads = []
    
    for market in markets:
        for service in service_types:
            print(f"Searching {service} in {market}...")
            
            leads = leadwave.generate_leads(
                industry=service,
                location=market,
                max_leads=15
            )
            
            all_leads.extend(leads)
    
    # Filter for claimed Google listings (higher quality)
    claimed_leads = [lead for lead in all_leads if lead.google_claimed]
    
    leadwave.leads = claimed_leads
    leadwave.save_leads("service_business_leads", format='json')
    
    print(f"Service business leads with claimed listings: {len(claimed_leads)}")
    return claimed_leads

def example_retail_leads():
    """Example: Generate retail business leads"""
    print("🛍️  Example: Retail Business Lead Generation")
    print("-" * 40)
    
    leadwave = LeadWave()
    
    # Target retail businesses in shopping districts
    leads = leadwave.generate_leads(
        industry="boutique clothing stores",
        location="Beverly Hills, CA",
        max_leads=30
    )
    
    # Analyze lead quality
    high_quality = [l for l in leads if l.confidence_score >= 85]
    has_owner_info = [l for l in leads if l.owner_name]
    has_direct_contact = [l for l in leads if l.email and l.phone]
    
    print(f"Total leads: {len(leads)}")
    print(f"High quality (85%+): {len(high_quality)}")
    print(f"With owner names: {len(has_owner_info)}")
    print(f"With direct contact: {len(has_direct_contact)}")
    
    # Save detailed analysis
    leadwave.save_leads("retail_leads_analysis", format='excel')
    
    return leads

def example_multi_location_campaign():
    """Example: Multi-location lead generation campaign"""
    print("🌎 Example: Multi-Location Campaign")
    print("-" * 40)
    
    leadwave = LeadWave()
    
    # Target same industry across multiple markets
    industry = "auto repair shops"
    locations = [
        "Phoenix, AZ",
        "Austin, TX", 
        "Denver, CO",
        "Portland, OR"
    ]
    
    campaign_results = {}
    
    for location in locations:
        print(f"Processing {location}...")
        
        leads = leadwave.generate_leads(
            industry=industry,
            location=location,
            max_leads=20
        )
        
        # Analyze market metrics
        campaign_results[location] = {
            'total_leads': len(leads),
            'avg_confidence': sum(l.confidence_score for l in leads) / len(leads) if leads else 0,
            'claimed_percentage': len([l for l in leads if l.google_claimed]) / len(leads) * 100 if leads else 0,
            'with_websites': len([l for l in leads if l.website]) / len(leads) * 100 if leads else 0
        }
    
    # Print campaign summary
    print("\n📊 Campaign Results Summary:")
    for location, metrics in campaign_results.items():
        print(f"\n{location}:")
        print(f"  • Total leads: {metrics['total_leads']}")
        print(f"  • Avg confidence: {metrics['avg_confidence']:.1f}%")
        print(f"  • Claimed listings: {metrics['claimed_percentage']:.1f}%")
        print(f"  • With websites: {metrics['with_websites']:.1f}%")
    
    # Save campaign data
    leadwave.save_leads("multi_location_campaign", format='csv')
    
    return campaign_results

def example_niche_targeting():
    """Example: Highly specific niche targeting"""
    print("🎯 Example: Niche Targeting")
    print("-" * 40)
    
    leadwave = LeadWave()
    
    # Very specific niche with geographic precision
    leads = leadwave.generate_leads(
        industry="luxury wedding photographers",
        location="Napa Valley, CA",
        zip_codes=["94558", "94559", "94562"],
        max_leads=15
    )
    
    # Analyze niche-specific metrics
    premium_leads = []
    for lead in leads:
        # Additional filtering for luxury market
        if (lead.google_rating >= 4.5 and 
            lead.website and 
            lead.confidence_score >= 75):
            premium_leads.append(lead)
    
    print(f"Luxury wedding photographers found: {len(premium_leads)}")
    
    # Custom analysis for niche market
    for lead in premium_leads:
        print(f"\n📸 {lead.business_name}")
        print(f"   Owner: {lead.owner_name or 'Not found'}")
        print(f"   Rating: {lead.google_rating}/5.0")
        print(f"   Contact: {lead.email or 'No email'}")
        print(f"   Website: {lead.website or 'No website'}")
    
    leadwave.leads = premium_leads
    leadwave.save_leads("luxury_wedding_photographers", format='json')
    
    return premium_leads

def run_all_examples():
    """Run all example scenarios"""
    print("🌊 LeadWave™ - Complete Example Suite")
    print("=" * 50)
    
    examples = [
        example_restaurant_leads,
        example_healthcare_leads,
        example_service_business_leads,
        example_retail_leads,
        example_multi_location_campaign,
        example_niche_targeting
    ]
    
    results = {}
    
    for example_func in examples:
        try:
            print(f"\n{'='*50}")
            result = example_func()
            results[example_func.__name__] = result
            print("✅ Example completed successfully")
            
        except Exception as e:
            print(f"❌ Example failed: {e}")
            results[example_func.__name__] = None
    
    print(f"\n🎉 All examples completed!")
    print(f"Successful examples: {len([r for r in results.values() if r is not None])}")
    
    return results

if __name__ == "__main__":
    # Run individual example or all examples
    import sys
    
    if len(sys.argv) > 1:
        example_name = sys.argv[1]
        
        examples_map = {
            'restaurants': example_restaurant_leads,
            'healthcare': example_healthcare_leads,
            'services': example_service_business_leads,
            'retail': example_retail_leads,
            'campaign': example_multi_location_campaign,
            'niche': example_niche_targeting
        }
        
        if example_name in examples_map:
            examples_map[example_name]()
        else:
            print(f"Available examples: {', '.join(examples_map.keys())}")
    else:
        run_all_examples()
