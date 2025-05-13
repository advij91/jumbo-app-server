import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const geocodeAddress = async (req, res) => {
  try {
    const { latlng } = req.query;

    if (!latlng) {
      return res.status(400).json({ error: 'latlang query parameter is required' });
    }

    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    if (response.data.status !== 'OK') {
      return res.status(500).json({ error: 'Failed to fetch data from Google Maps API', details: response.data });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to Google Maps API:', error);
    res.status(500).json({ error: 'Failed to connect to Google Maps API' });
  }
};
