import mongoose from 'mongoose';

import { storeDB } from "../config/dbStore.mjs";
import Item from "./Item.mjs"; // Assuming you have an Item model defined in Item.mjs

// Subschema for Addon Items
const addonItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Addon item name is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Addon item price is required"],
        min: [0, "Price must be a positive number"], // Ensure price is non-negative
    },
    isDefault: {
        type: Boolean,
        default: false, // Default value for isDefault
    },
});

// Main Addon Schema
const addonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Addon name is required"],
            unique: [true, "Addon name must be unique"],
            trim: true,
        },
        addonCategory: {
            type: String,
            required: [true, "Addon category is required"],
            trim: true,
        },
        addonPreference: {
            type: Number,
            required: [true, "Addon preference is required"],
            min: [0, "Addon preference must be a positive number"],
            max: [100, "Addon preference must be less than or equal to 100"],
        },
        addonItems: {
            type: [addonItemsSchema], // Array of addon items
            validate: {
                validator: function (v) {
                    return Array.isArray(v) && v.length > 0;
                },
                message: "Addon must have at least one addon item",
            },
        },
        isMultiAddonSelection: {
            type: Boolean,
            default: false,
        },
        applicableFor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                validate: {
                    validator: async function (v) {
                        const count = await Item.countDocuments({
                            _id: v,
                        });
                        return count > 0;
                    },
                    message: "Referenced Item does not exist",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Addon Model
const Addon = storeDB.model("Addon", addonSchema);

export default Addon;