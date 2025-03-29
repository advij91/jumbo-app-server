import Outlet from "../models/Outlet.mjs"; // Import the Outlet model

export const getOutlets = async (req, res) => {
  try {
    // Retrieve all outlets from the database
    const outlets = await Outlet.find({});
    return res.status(200).json(outlets);
  } catch (error) {
    console.error("Error fetching outlets:", error);
    return res.status(500).json({ message: "Error fetching outlets", error });
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
    return res.status(500).json({ message: "Error fetching outlet", error });
  }
};

export const addOutlet = async (req, res) => {
  try {
    const { name, address, city, pin, contact, alternateContact, socialMedia } = req.body;

    // Create a new outlet document
    const newOutlet = new Outlet({
      name,
      address,
      city,
      pin,
      contact,
      alternateContact,
      socialMedia,
    });

    // Save the outlet to the database
    const savedOutlet = await newOutlet.save();
    return res.status(201).json({ message: "Outlet added successfully!", data: savedOutlet });
  } catch (error) {
    console.error("Error adding outlet:", error);
    return res.status(500).json({ message: "Error adding outlet", error });
  }
};

export const updateOutlet = async (req, res) => {
  try {
    const { id } = req.params; // Get outlet ID from request parameters
    const updates = req.body; // Updated outlet data

    // Find outlet by ID and update it
    const updatedOutlet = await Outlet.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedOutlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }

    return res.status(200).json({ message: "Outlet updated successfully!", data: updatedOutlet });
  } catch (error) {
    console.error("Error updating outlet:", error);
    return res.status(500).json({ message: "Error updating outlet", error });
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

    return res.status(200).json({ message: "Outlet deleted successfully!", data: deletedOutlet });
  } catch (error) {
    console.error("Error deleting outlet:", error);
    return res.status(500).json({ message: "Error deleting outlet", error });
  }
};
