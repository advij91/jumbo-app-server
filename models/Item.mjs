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
  ingrediants: {
    type: String,
    required: true, // Makes the ingrediants field required
    trim: true,
  },
  isVeg: {
    type: Boolean,
    required: true, // Specifies that isVeg is mandatory
  },
  imageUrl: {
    type: String,
    required: true, // Ensures the image path is provided
    trim: true,
  },
  category: {
    type: String,
    required: true, // Makes the category field required
    enum: ["burger", "pizza", "desert", "sides", "chinese", "shakes", "juices", "noodles"], // Validates allowed values
  },
  labels: {
    type: [String], // Array of strings
    enum: ["bestseller", "new"], // Validates allowed values
    default: undefined, // Makes labels optional
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for creation
  },
});

const Item = storeDB.model('Item', itemSchema);

export default Item
