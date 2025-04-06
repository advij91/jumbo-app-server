import { upload, uploadToR2 } from "../middleware/uploadService.mjs";
import Item from "../models/Item.mjs";
import mongoose from "mongoose";
import fs from "fs";
const pubBucketURL = "https://pub-07aefead65ab4b5a9a9a264d668eef65.r2.dev"

export const createItem = [
  upload.single("file"), // Middleware to handle file upload
  async (req, res) => {
    try {
      const { name, description, ingredients, category, labels, outletDetails, isVeg } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      // Upload the image to R2
      const imageUrl = await uploadToR2(req.file.path, req.file.filename);

      // Delete the local file after uploading to R2
      fs.unlinkSync(req.file.path);

      // Parse and validate `outletDetails`
      let parsedOutletDetails = [];
      if (outletDetails) {
        try {
          parsedOutletDetails = JSON.parse(outletDetails).map((outlet) => ({
            outletId: outlet.outletId,
            price: parseFloat(outlet.price), // Ensure price is a number
            isAvailable: outlet.isAvailable !== undefined ? outlet.isAvailable : true, // Default to true
          }));
        } catch (parseError) {
          return res.status(400).json({ message: "Invalid outletDetails format" });
        }
      }

      // Construct the item object
      const item = {
        name,
        description,
        category,
        ingredients: ingredients ? ingredients.split(",").map((ing) => ing.trim()) : [], // Convert ingredients to an array and trim whitespaces
        labels: labels ? labels.split(",").map((label) => label.trim()) : [], // Convert labels to an array and trim whitespaces
        isVeg: isVeg !== undefined ? isVeg : true, // Default to true
        imageUrl,
        outletDetails: parsedOutletDetails,
      };

      // Save the item to the database
      try {
        const createdItem = await Item.create(item);
        res.status(201).json({
          message: "Item created successfully",
          item: createdItem,
        });
      } catch (dbError) {
        console.error("Error saving item to database:", dbError);
        return res.status(500).json({ message: "Failed to save item to database", error: dbError });
      }
    } catch (error) {
      console.error("Error creating item:", error);
      res.status(500).json({ message: "Failed to create item", error });
    }
  },
];

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().lean();
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }
    const updatedItems =  items.map((item) => ({
      ...item,
      imageUrl: item.imageUrl ? `${pubBucketURL}/${item.imageUrl.split('/').pop()}` : "", // Replace mainurl and bucket name with pubBucketURL
    }))
    res.status(200).json(updatedItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Failed to fetch items", error });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Find the item by ID
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    res.status(500).json({ message: "Failed to fetch item", error });
  }
};

export const updateItemById = [
  upload.single("file"), // Middleware to handle file upload
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, ingredients, category, labels, outletDetails, isVeg } = req.body;

      // Find the item by ID
      const existingItem = await Item.findById(id);
      if (!existingItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      let imageUrl = existingItem.imageUrl;

      // If a new file is uploaded, upload it to R2 and delete the old one
      if (req.file) {
        imageUrl = await uploadToR2(req.file.path, req.file.filename);
        fs.unlinkSync(req.file.path);

        // Optionally, delete the old image from R2 if needed
        // await deleteFromR2(existingItem.imageUrl);
      }

      // Parse and validate `outletDetails`
      let parsedOutletDetails = [];
      if (outletDetails) {
        try {
          parsedOutletDetails = JSON.parse(outletDetails).map((outlet) => ({
            outletId: outlet.outletId,
            price: parseFloat(outlet.price),
            isAvailable: outlet.isAvailable !== undefined ? outlet.isAvailable : true,
          }));
        } catch (parseError) {
          return res.status(400).json({ message: "Invalid outletDetails format" });
        }
      }

      // Update the item fields
      existingItem.name = name || existingItem.name;
      existingItem.description = description || existingItem.description;
      existingItem.category = category || existingItem.category;
      existingItem.ingredients = ingredients
        ? ingredients.split(",").map((ing) => ing.trim())
        : existingItem.ingredients;
      existingItem.labels = labels
        ? labels.split(",").map((label) => label.trim())
        : existingItem.labels;
      existingItem.isVeg = isVeg !== undefined ? isVeg : existingItem.isVeg;
      existingItem.imageUrl = imageUrl;
      existingItem.outletDetails = parsedOutletDetails.length
        ? parsedOutletDetails
        : existingItem.outletDetails;

      // Save the updated item to the database
      try {
        const updatedItem = await existingItem.save();
        res.status(200).json({
          message: "Item updated successfully",
          item: updatedItem,
        });
      } catch (dbError) {
        console.error("Error updating item in database:", dbError);
        return res.status(500).json({ message: "Failed to update item in database", error: dbError });
      }
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ message: "Failed to update item", error });
    }
  },
];

export const deleteItemById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Find the item by ID
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Optionally, delete the image from R2 if needed
    // await deleteFromR2(item.imageUrl);

    // Delete the item from the database
    await Item.findByIdAndDelete(id);

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Failed to delete item", error });
  }
};