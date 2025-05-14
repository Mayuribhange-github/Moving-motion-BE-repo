import axios from "axios";
export const navigationMotion = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    try {
      const startCoords = await getCoordinates(start);
      const endCoords = await getCoordinates(end);
      console.log(endCoords);
      console.log(endCoords);
      // Make sure OSRM API uses correct format: "lon,lat"
      const routeData = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=full&geometries=geojson`
      );

      const coordinates = routeData.data.routes[0].geometry.coordinates.map(
        ([lng, lat]) => ({
          lat,
          lng,
        })
      );

      res.json({ route: coordinates });
    } catch (error) {
      res.status(500).json({ error: "Route fetching failed" });
    }
  } catch (error) {
    next(error);
  }
};

// const axiosInstance = axios.create({
//   timeout: 10000, // 10 सेकंड तक इंतजार करेगा
// });

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const getCoordinates = async (location) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: location,
          format: "json",
        },
      }
    );

    if (response.data.length === 0) {
      throw new Error("Invalid location");
    }

    const { lat, lon } = response.data[0];
    return { lat: parseFloat(lat), lon: parseFloat(lon) };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};
