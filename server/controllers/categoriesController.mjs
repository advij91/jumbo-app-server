import Category from '../models/Category.mjs'; // Assuming you have a Category model
import mongoose from 'mongoose';
import { upload, uploadToR2 } from "../middleware/uploadService.mjs";
import fs, { cp } from "fs";
const pubBucketURL = "https://pub-07aefead65ab4b5a9a9a264d668eef65.r2.dev"

// Helper function to convert strings to Pascal Case
const toPascalCase = (str) => {
    return str
        .toLowerCase()
        .replace(/(?:^|\s|_)(\w)/g, (_, c) => c.toUpperCase());
};

// Create a new category
export const createCategory = [
    upload.single("file"), // Middleware to handle file upload

    async (req, res) => {
        try {
            const { category, description, subCategory } = req.body;
            console.log(req.body, req.file);
    
            // Validation
            if (!/^[a-zA-Z]+$/.test(category) || !/^[a-zA-Z]+$/.test(subCategory)) {
                return res.status(400).json({ error: 'Category and Sub-category names must contain only letters.' });
            }
    
            // Convert names to Pascal Case
            const formattedCategory = toPascalCase(category);
            const formattedSubCategory = toPascalCase(subCategory);
    
            // Upload image to Cloudflare R2
            const imageUrl = await uploadToR2(req.file.path, req.file.filename);
    
            // Delete the local file after uploading to R2
            fs.unlinkSync(req.file.path);
    
            // Save to database
            const categoryItem = new Category({
                category: formattedCategory,
                description,
                subCategory: formattedSubCategory,
                imageUrl: imageUrl,
            });
    
            await categoryItem.save();
            res.status(201).json({ message: 'Category created successfully', category });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }
]

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().lean();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        const updatedCategories = categories.map((category) => ({
            ...category,
            imageUrl: category.imageUrl ? `${pubBucketURL}/${category.imageUrl.split('/').pop()}` : "", // Replace mainurl and bucket name with pubBucketURL
        }));
        res.status(200).json(updatedCategories);
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Failed to fetch categories", error });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }
        // Find the category by ID
        const category = await Category.findById(id);
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const updatedCategory = {
            ...category.toObject(),
            imageUrl: category.imageUrl ? `${pubBucketURL}/${category.imageUrl.split('/').pop()}` : "", // Replace mainurl and bucket name with pubBucketURL
        };
        // Convert image URL to public URL
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Update a category
export const updateCategory = [
    upload.single("file"), // Middleware to handle file upload
    async (req, res) => {
        try {
            const { id } = req.params;
            // Validate the ID format
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid category ID' });
            }
            const { category, subCategory, description } = req.body;
            const file = req.file;
    
            // Validation
            if (category && !/^[a-zA-Z]+$/.test(category)) {
                return res.status(400).json({ error: 'Category name must contain only letters.' });
            }
            if (subCategory && !/^[a-zA-Z]+$/.test(subCategory)) {
                return res.status(400).json({ error: 'Sub-category name must contain only letters.' });
            }
    
            const updateData = {};
            if (category) updateData.category = toPascalCase(category);
            if (subCategory) updateData.subCategory = toPascalCase(subCategory);
            if (description) updateData.description = description;
            if (file) {
                        const imageUrl = await uploadToR2(req.file.path, req.file.filename);
                        updateData.imageUrl = imageUrl;
                        fs.unlinkSync(req.file.path);
            }
    
            const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
    
            res.status(200).json({ message: 'Category updated successfully', updatedCategory });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }
]

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};