import mongoose from "mongoose";

import { storeDB } from "../config/dbStore.mjs";

// Define the Menu Item Schema
const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true, // Makes the name field required
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  subCategory: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true, // Ensures the image path is provided
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for creation
  },
});

const Category = storeDB.model("Category", categorySchema);

export default Category;
