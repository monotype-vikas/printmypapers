# Google Maps API Setup Guide

## 🗺️ How to Get Google Maps API Key

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top
4. Click "New Project"
5. Name it "PrintMyPapers" or similar
6. Click "Create"

### Step 2: Enable Required APIs

1. Go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - **Geocoding API** (for address lookup)
   - **Distance Matrix API** (for distance calculation)
   - **Maps JavaScript API** (for map display)

### Step 3: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### Step 4: Restrict API Key (Important for Security)

1. Click on the created API key
2. Under "Application restrictions" select "HTTP referrers"
3. Add your domains:
   - `localhost:3000/*` (for development)
   - `yourdomain.com/*` (for production)
4. Under "API restrictions" select "Restrict key"
5. Select the APIs you enabled above
6. Click "Save"

## 🔧 How to Add API Key to Your Code

### Option 1: Update Configuration File (Recommended)

1. Open `src/config/googleMaps.js`
2. Replace `"YOUR_API_KEY_HERE"` with your actual API key:

```javascript
export const GOOGLE_MAPS_CONFIG = {
  API_KEY: "AIzaSyYourActualApiKeyHere", // Your real API key
  // ... rest of config
};
```

### Option 2: Environment Variable (For Production)

1. Create a `.env` file in your project root
2. Add your API key:

```
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyYourActualApiKeyHere
```

3. Update `src/config/googleMaps.js`:

```javascript
export const GOOGLE_MAPS_CONFIG = {
  API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE",
  // ... rest of config
};
```

## 📍 Update Your Business Location

1. Open `src/config/googleMaps.js`
2. Update the business coordinates:

```javascript
BUSINESS_LOCATION: {
  lat: 28.5550538, // Replace with your actual latitude
  lng: 77.3439278  // Replace with your actual longitude
}
```

To find your coordinates:

1. Go to [Google Maps](https://maps.google.com)
2. Right-click on your business location
3. Select the coordinates that appear
4. Copy the latitude and longitude

## 🚀 Features You'll Get

With Google Maps API enabled, your app will have:

1. **Accurate Address Detection**: Real addresses instead of coordinates
2. **Precise Distance Calculation**: Road distance instead of straight-line
3. **Better User Experience**: More accurate delivery cost calculation
4. **Fallback Support**: Still works if API fails

## 💰 Google Maps API Pricing

- **Free Tier**: $200 credit per month
- **Geocoding API**: $5 per 1,000 requests
- **Distance Matrix API**: $5 per 1,000 requests
- **Maps JavaScript API**: $7 per 1,000 requests

For a small print business, you'll likely stay within the free tier.

## 🔒 Security Best Practices

1. **Always restrict your API key** to specific domains
2. **Never commit API keys** to public repositories
3. **Use environment variables** for production
4. **Monitor usage** in Google Cloud Console
5. **Set up billing alerts** to avoid unexpected charges

## 🛠️ Troubleshooting

### "This API project is not authorized"

- Make sure you've enabled the required APIs
- Check that your API key is correct

### "Request denied"

- Verify your API key restrictions
- Check that your domain is in the allowed referrers

### "Quota exceeded"

- Check your usage in Google Cloud Console
- Consider upgrading your billing plan

## 📞 Support

If you need help:

1. Check [Google Maps API Documentation](https://developers.google.com/maps)
2. Visit [Google Cloud Support](https://cloud.google.com/support)
3. Review your API usage in Google Cloud Console
