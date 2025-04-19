import mongoose from 'mongoose';

import { storeDB } from "../config/dbStore.mjs";

// Define the schema for the Charge model
const chargeSchema = new mongoose.Schema(
    {
        chargeName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        applyOn: {
            type: String,
            enum: ['cart', 'item'],
            required: true,
        },
        chargeValue: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    // Ensure chargeValue starts with 'P' or 'R' followed by a number
                    return /^(P|R)\d+(\.\d+)?$/.test(value);
                },
                message: 'chargeValue must start with "P" or "R" followed by a numeric value.',
            },
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create the Charge model
const Charge = storeDB.model("Charge", chargeSchema);

export default Charge;