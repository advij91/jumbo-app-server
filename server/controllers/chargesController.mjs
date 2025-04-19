import mongoose from "mongoose";
import Charge from "../models/Charge.mjs";

// Get all charges
export const getCharges = async (req, res) => {
    try {
        const charges = await Charge.find().lean(); // Fetch all charges from the database
        if (!charges || charges.length === 0) {
            return res.status(404).json({ message: 'No charges found' });
        }
        res.status(200).json(charges); // Return the list of charges
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
export const getChargeById = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid charge ID' });
    }

    const charge = await Charge.findById(id); // Find the charge by ID
    if (!charge) {
        return res.status(404).json({ message: 'Charge not found' });
    }
    res.status(200).json(charge); // Return the charge details
}

// Create a new charge
export const createCharge = async (req, res) => {
    const { chargeName, applyOn, chargeValue } = req.body;

    // Validate input
    if (!chargeName || !applyOn || !chargeValue) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newCharge = new Charge({
        chargeName,
        applyOn,
        chargeValue,
    }); // Create a new charge instance

    await newCharge.save(); // Save the new charge to the database
    res.status(201).json(newCharge);
};

// Update an existing charge
export const updateCharge = async (req, res) => {
    const { id } = req.params;
    const { chargeName, applyOn, chargeValue } = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid charge ID' });
    }
    // Validate input
    if (!chargeName || !applyOn || !chargeValue) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedCharge = await Charge.findByIdAndUpdate(
        id,
        { chargeName, applyOn, chargeValue },
        { new: true } // Return the updated document
    );

    res.status(200).json(updatedCharge);
};

// Delete a charge
export const deleteCharge = async (req, res) => {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid charge ID' });
    }

    await Charge.findByIdAndDelete(id); // Delete the charge from the database
    res.status(204).send(); // Send a 204 No Content response
}