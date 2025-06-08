import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const geocodeAddress = async (req, res) => {
  try {
    const { latlng } = req.query;

    if (!latlng) {
      return res
        .status(400)
        .json({ error: "latlng query parameter is required" });
    }

    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );

    if (response.data.status !== "OK") {
      return res.status(500).json({
        error: "Failed to fetch data from Google Maps API",
        details: response.data.status,
      });
    }

    const areaDetails = response.data.results[0];
    if (!areaDetails) {
      return res
        .status(404)
        .json({ error: "No area details found for the provided latlng" });
    }

    // Extract city and formatted address
    const addressComponents = areaDetails.address_components;
    const cityComponent = addressComponents.find(component =>
      component.types.includes("locality")
    );
    const city = cityComponent ? cityComponent.long_name : "City not found";
    const formattedAddress = areaDetails.formatted_address;

    // Return only the required details
    res.json({
      city,
      formattedAddress,
      // You can add more fields if needed
    });
  } catch (error) {
    console.error("Error connecting to Google Maps API:", error);
    res.status(500).json({ error: "Failed to connect to Google Maps API" });
  }
}