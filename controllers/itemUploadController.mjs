import { upload, uploadToR2 } from "../middleware/uploadService.mjs";
import Item from "../models/Item.mjs";
import fs from "fs";

export const createItem = [
  upload.single("file"), // Middleware to handle file upload
  async (req, res) => {
    try {
      const { name, description, ingrediants, category, labels, price, isAvailableAt } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      // Upload the image to R2
      const imageUrl = await uploadToR2(req.file.path, req.file.filename);

      // Delete the local file after uploading to R2
      fs.unlinkSync(req.file.path);

      // Construct the item object
      const item = {
        name,
        description,
        ingrediants: ingrediants ? ingrediants.split(",") : [], // Convert ingredients to an array
        category,
        price: parseFloat(price), // Ensure price is a number
        labels: labels ? labels.split(",") : [], // Convert labels to an array
        imageUrl,
      };

      // Respond with the created item (you can save it to a database here)
      try {
        await Item.create(item);
        res.status(201).json({
          message: "Item created successfully",
          item,
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