import axios from 'axios';

export class GooglePlacesService {
  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY;
    this.baseUrl = 'https://maps.googleapis.com/maps/api/place';
  }

  async searchPlaces(query, location, radius = 50000, maxResults = 20) {
    try {
      const searchUrl = `${this.baseUrl}/textsearch/json`;
      
      const params = {
        query: `${query} in ${location}`,
        key: this.apiKey,
        radius,
        type: 'establishment'
      };

      const response = await axios.get(searchUrl, { params });
      
      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      const places = response.data.results.slice(0, maxResults);
      
      // Get detailed information for each place
      const detailedPlaces = await Promise.all(
        places.map(place => this.getPlaceDetails(place.place_id))
      );

      return detailedPlaces.filter(place => place !== null);

    } catch (error) {
      console.error('Google Places search error:', error);
      throw new Error('Failed to search places');
    }
  }

  async getPlaceDetails(placeId) {
    try {
      const detailsUrl = `${this.baseUrl}/details/json`;
      
      const params = {
        place_id: placeId,
        key: this.apiKey,
        fields: [
          'name',
          'formatted_address',
          'formatted_phone_number',
          'international_phone_number',
          'website',
          'business_status',
          'rating',
          'user_ratings_total',
          'price_level',
          'types',
          'geometry',
          'opening_hours',
          'reviews'
        ].join(',')
      };

      const response = await axios.get(detailsUrl, { params });
      
      if (response.data.status !== 'OK') {
        console.warn(`Place details error for ${placeId}: ${response.data.status}`);
        return null;
      }

      return this.formatPlaceData(response.data.result);

    } catch (error) {
      console.error(`Place details error for ${placeId}:`, error);
      return null;
    }
  }

  formatPlaceData(place) {
    return {
      placeId: place.place_id,
      name: place.name,
      address: place.formatted_address,
      phone: place.formatted_phone_number || place.international_phone_number,
      website: place.website,
      businessStatus: place.business_status,
      rating: place.rating,
      totalReviews: place.user_ratings_total,
      priceLevel: place.price_level,
      types: place.types,
      location: place.geometry?.location,
      openingHours: place.opening_hours,
      reviews: place.reviews?.slice(0, 3) || [],
      isVerified: place.business_status === 'OPERATIONAL',
      hasWebsite: !!place.website,
      hasPhone: !!place.formatted_phone_number
    };
  }
}
