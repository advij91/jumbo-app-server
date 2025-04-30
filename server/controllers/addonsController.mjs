import Addon from "../models/Addon.mjs";

// Create a new addon
export const createAddon = async (req, res) => {
    try {
        const { name, addonCategory, addonItems, isMultiAddonSelection, applicableFor } = req.body;

        // Create a new addon
        const newAddon = new Addon({
            name,
            addonCategory,
            addonItems,
            isMultiAddonSelection,
            applicableFor,
        });
        // Save the addon to the database
        const savedAddon = await newAddon.save();
        res.status(201).json({ success: true, data: savedAddon });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update an addon by ID
export const updateAddonById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find and update the addon
        const updatedAddon = await Addon.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        if (!updatedAddon) {
            return res.status(404).json({ success: false, message: "Addon not found" });
        }

        res.status(200).json({ success: true, data: updatedAddon });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all addons
export const getAllAddons = async (req, res) => {
    try {
        // Fetch all addons from the database
        const addons = await Addon.find().populate("applicableFor");

        res.status(200).json({ success: true, data: addons });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get an addon by ID
export const getAddonById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the addon by ID
        const addon = await Addon.findById(id).populate("applicableFor");

        if (!addon) {
            return res.status(404).json({ success: false, message: "Addon not found" });
        }

        res.status(200).json({ success: true, data: addon });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get addons by associated item
export const getAddonsByItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        // Find addons associated with the given item
        const addons = await Addon.find({ applicableFor: itemId }).populate("applicableFor");

        res.status(200).json({ success: true, data: addons });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete an addon by ID
export const deleteAddonById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the addon
        const deletedAddon = await Addon.findByIdAndDelete(id);

        if (!deletedAddon) {
            return res.status(404).json({ success: false, message: "Addon not found" });
        }

        res.status(200).json({ success: true, message: "Addon deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};