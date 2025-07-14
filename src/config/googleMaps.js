// Google Maps API Configuration
// Replace YOUR_API_KEY_HERE with your actual Google Maps API key

export const GOOGLE_MAPS_CONFIG = {
  API_KEY: "YOUR_API_KEY_HERE", // Replace with your actual API key

  // Business location coordinates (update these to your actual location)
  BUSINESS_LOCATION: {
    lat: 28.5550538, // Your business latitude
    lng: 77.3439278, // Your business longitude
  },

  // API endpoints
  ENDPOINTS: {
    GEOCODING: "https://maps.googleapis.com/maps/api/geocode/json",
    DISTANCE_MATRIX: "https://maps.googleapis.com/maps/api/distancematrix/json",
  },
};

// Instructions for setting up Google Maps API:
/*
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable these APIs:
   - Geocoding API
   - Distance Matrix API
   - Maps JavaScript API
4. Create API key in Credentials section
5. Restrict the API key for security:
   - Application restrictions: HTTP referrers
   - Add: localhost:3000/* (for development)
   - API restrictions: Select the enabled APIs
6. Replace YOUR_API_KEY_HERE with your actual API key
*/
