import axios from "axios";
import Outlet from "../models/Outlet.mjs"; // Import the Outlet model

export const getOutlets = async (req, res) => {
  try {
    // Retrieve all outlets from the database
    const outlets = await Outlet.find({});
    return res.status(200).json(outlets);
  } catch (error) {
    console.error("Error fetching outlets:", error);
    return res
      .status(500)
      .json({ message: "Error fetching outlets", error: error.message });
  }
};

export const getOutletById = async (req, res) => {
  try {
    const { id } = req.params; // Get outlet ID from request parameters

    // Find outlet by ID
    const outlet = await Outlet.findById(id);

    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }

    return res.status(200).json(outlet);
  } catch (error) {
    console.error("Error fetching outlet:", error);
    return res
      .status(500)
      .json({ message: "Error fetching outlet", error: error.message });
  }
};

export const addOutlet = async (req, res) => {
  try {
    const {
      name,
      address,
      location,
      city,
      state,
      pin,
      contact,
      alternateContact,
      socialMedia,
    } = req.body;

    // Create a new outlet document
    const newOutlet = new Outlet({
      name,
      address,
      location,
      city,
      state,
      pin,
      contact,
      alternateContact,
      socialMedia,
    });

    // Save the outlet to the database
    const savedOutlet = await newOutlet.save();
    return res
      .status(201)
      .json({ message: "Outlet added successfully!", data: savedOutlet });
  } catch (error) {
    console.error("Error adding outlet:", error);
    return res
      .status(500)
      .json({ message: "Error adding outlet", error: error.message });
  }
};

export const updateOutlet = async (req, res) => {
  try {
    const { id } = req.params; // Get outlet ID from request parameters
    const updates = req.body; // Updated outlet data

    // Find outlet by ID and update it
    const updatedOutlet = await Outlet.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedOutlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }

    return res
      .status(200)
      .json({ message: "Outlet updated successfully!", data: updatedOutlet });
  } catch (error) {
    console.error("Error updating outlet:", error);
    return res
      .status(500)
      .json({ message: "Error updating outlet", error: error.message });
  }
};

export const deleteOutlet = async (req, res) => {
  try {
    const { id } = req.params; // Get outlet ID from request parameters

    // Find outlet by ID and delete it
    const deletedOutlet = await Outlet.findByIdAndDelete(id);

    if (!deletedOutlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }

    return res
      .status(200)
      .json({ message: "Outlet deleted successfully!", data: deletedOutlet });
  } catch (error) {
    console.error("Error deleting outlet:", error);
    return res
      .status(500)
      .json({ message: "Error deleting outlet", error: error.message });
  }
};

export const validateDeliveryAddress = async (req, res) => {
  try {
    const { addressPinCode, addressLocation } = req.body;
    const { outletId } = req.params;

    // Fetch outlet and its delivery restrictions
    const outlet = await Outlet.findById(outletId).lean();
    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }
    const restrictions = outlet.deliveryRestrictions || {};

    // Pin code restriction
    if (
      Array.isArray(restrictions.allowedPinCodes) &&
      restrictions.allowedPinCodes.length > 0 &&
      !restrictions.allowedPinCodes.includes(addressPinCode)
    ) {
      return res.status(200).json({
        success: false,
        message: "Delivery not allowed to this pin code.",
      });
    }

    // Distance restriction
    let distanceAllowed = true;
    let distanceInKms = null;
    let travelTimeInMinutes = null;

    if (
      restrictions.deliveryRadiusInKm &&
      outlet.location &&
      Array.isArray(outlet.location.coordinates) &&
      outlet.location.coordinates.length === 2 &&
      addressLocation &&
      Array.isArray(addressLocation.coordinates) &&
      addressLocation.coordinates.length === 2
    ) {
      const outletLat = outlet.location.coordinates[1];
      const outletLng = outlet.location.coordinates[0];
      const addressLat = addressLocation.coordinates[1];
      const addressLng = addressLocation.coordinates[0];

      // Google Maps Distance Matrix API
      const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${outletLat},${outletLng}&destinations=${addressLat},${addressLng}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await axios.get(url);
      const data = response.data;

      if (
        data.status === "OK" &&
        data.rows &&
        data.rows[0] &&
        data.rows[0].elements &&
        data.rows[0].elements[0].status === "OK"
      ) {
        const meters = data.rows[0].elements[0].distance.value;
        distanceInKms = meters / 1000;
        const travelTimeInSeconds = data.rows[0].elements[0].duration.value;
        travelTimeInMinutes = travelTimeInSeconds / 60;
        if (distanceInKms > restrictions.deliveryRadiusInKm) {
          distanceAllowed = false;
        }
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch distance from Google Maps API",
        });
      }
    }

    if (!distanceAllowed) {
      return res.status(200).json({
        success: false,
        message: "Delivery address is outside allowed radius.",
        distanceInKms,
        travelTimeInMinutes
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery allowed",
      distanceInKms,
      travelTimeInMinutes
    });
  } catch (error) {
    console.error("Error validating delivery address:", error);
    res.status(500).json({
      success: false,
      message: "Error validating delivery address",
      error: error.message,
    });
  }
};
