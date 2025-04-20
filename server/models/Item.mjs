import mongoose from "mongoose";

import { storeDB } from "../config/dbStore.mjs";

// Define the Menu Item Schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Makes the name field required
    trim: true,
  },
  description: {
    type: String,
    required: true, // Makes the description field required
    trim: true,
  },
  ingredients: {
    type: [String],
    required: true, // Makes the ingrediants field required
    trim: true,
  },
  isVeg: {
    type: Boolean,
    default: true, // Specifies that isVeg is mandatory
  },
  imageUrl: {
    type: String,
    required: true, // Ensures the image path is provided
    trim: true,
  },
  category: {
    type: String,
    required: true, // Makes the category field required
  },
  labels: {
    type: [String], // Array of strings
    enum: ["bestseller", "new", "musttry" ], // Validates allowed values
    default: undefined, // Makes labels optional
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for creation
  },
  outletDetails: [
    new mongoose.Schema(
      {
        outletId: {
          type: mongoose.Schema.Types.ObjectId, // ObjectId reference to Outlet
          ref: "Outlet", // Reference to the Outlet model
        },
        price: {
          type: Number,
          required: true, // Makes the price field required
          min: 0, // Ensures price is non-negative
        },
        isAvailable: {
          type: Boolean, // Reference to the Outlet model
          default: true,
        },
      },
      { _id: false } // Disable _id generation for this subdocument
    ),
  ],
});

const Item = storeDB.model("Item", itemSchema);

export default Item;
