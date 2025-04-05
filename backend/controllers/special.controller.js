import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const ORS_API_KEY = process.env.ORS_API_KEY; // Correctly use the API key from .env
const API_KEY = process.env.API_KEY;

export const getCoordinates = async (location) => {
    try {
      const response = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
        params: {
          api_key: ORS_API_KEY,
          text: `${location} Sri Lanka`
        }
      });
  
      if (response.data.features.length > 0) {
        const { coordinates } = response.data.features[0].geometry;
        return { lng: coordinates[0], lat: coordinates[1] };
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      throw new Error(`Error fetching coordinates: ${error.message}`);
    }
};
  
export const getRouteDetails = async (coordinatesArray) => {
    try {
      // Fetch route data from OpenRouteService API
      const response = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car',
        { coordinates: coordinatesArray },
        { headers: { 'Authorization': `Bearer ${ORS_API_KEY}`, 'Content-Type': 'application/json' } }
      );

      if (response.data.routes.length > 0) {
        const route = response.data.routes[0];
        
        // Route analysis: Checking weather and fuel/charging stops
        const routeAnalysis = await analyzeRoute(route);

        return { route, routeAnalysis };
      } else {
        throw new Error("Route not found");
      }
    } catch (error) {
      throw new Error(`Error fetching route details: ${error.message}`);
    }
};

const analyzeRoute = async (route) => {
  const { summary } = route;

  const distance = summary.distance / 1000; // Convert meters to kilometers
  const duration = summary.duration;

  // Get weather data
  const weatherData = await getWeatherData(route);

  // Get fuel/charging stops
  const stopsData = await getFuelChargingStops(route);

  return {
    distance,
    duration,
    weather: weatherData,
    stops: stopsData
  };
};

const getWeatherData = async (route) => {
  // Implement weather API
  return { temperature: 25, conditions: "Rain" };
};

const getFuelChargingStops = async (route) => {
  return { stops: ["Station1", "Station2"] };
};
  
export const getLocationCoordinates = async (req, res) => {
  const { location } = req.params;

  try {
    const coordinates = await getCoordinates(location);
    res.json({ success: true, coordinates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoute = async (req, res) => {
  const { start, destination } = req.params;

  try {
    const startCoordinates = await getCoordinates(start);
    const destinationCoordinates = await getCoordinates(destination);

    if (startCoordinates && destinationCoordinates) {
      const coordinatesArray = [
        [startCoordinates.lng, startCoordinates.lat],
        [destinationCoordinates.lng, destinationCoordinates.lat]
      ];

      const { route, routeAnalysis } = await getRouteDetails(coordinatesArray);
      const recommendedVehicles = await suggestVehicles(routeAnalysis, start, destination);

      res.json({
        success: true,
        routeDetails: route,
        analysis: routeAnalysis,
        recommendedVehicles
      });
    } else {
      res.status(404).json({ success: false, message: "Coordinates not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Define a list of destinations that are OK for electric vehicles
const evFriendlyDestinations = [
  "colombo",
  "kandy",
  "galle",
  "negombo",
  "mount lavinia"
];

const suggestVehicles = async (routeAnalysis, start, destination) => {
  const { distance } = routeAnalysis;
  let includeCategories = [];
  let excludeCategories = [];

  // Apply filtering logic
  if (distance > 100) {
    includeCategories.push("SUV", "sedan"); // Prefer SUVs & Sedans for long distances
  }
  if (evFriendlyDestinations.includes(destination.toLowerCase())) {
    excludeCategories.push("SUV"); // Avoid SUVs for EV-friendly locations
  }
  if (!evFriendlyDestinations.includes(start.toLowerCase()) && !evFriendlyDestinations.includes(destination.toLowerCase())) {
    excludeCategories.push("Electric"); // Avoid EVs if neither location is EV-friendly
  }

  // Construct query with both include ($in) and exclude ($nin)
  let query = {};
  if (includeCategories.length > 0) query.category = { $in: includeCategories };
  if (excludeCategories.length > 0) query.category = { ...(query.category || {}), $nin: excludeCategories };

  try {
    console.log("🚀 Fetching vehicles with query:", query); // Debugging

    const vehiclesResponse = await axios.get("http://localhost:5000/api/getVehicles", {
      params: query,
      paramsSerializer: (params) => {
        return new URLSearchParams(params).toString(); // Ensures proper array serialization
      },
    });

    return vehiclesResponse.data.vehicles || [];
  } catch (error) {
    console.error("❌ Error fetching vehicles:", error);
    return [{ name: "Default Car", type: "General", mileage: 12 }]; // Fallback option
  }
};


//Weather
export const getWeather = async (req, res) => {
  const { city } = req.params;

  try {
    // Make the request to OpenWeatherMap API
    const response = await axios.get("https://pro.openweathermap.org/data/2.5/forecast/daily", {
      params: {
        q: city,
        appid: API_KEY, 
        units: "metric",
        cnt: 2
      }
    });

    res.json(response.data); 

  } catch (error) {
    console.error("Error fetching weather data:", error.message);

    res.status(500).json({
      error: "Error fetching weather data",
      message: error.message
    });
  }
};



