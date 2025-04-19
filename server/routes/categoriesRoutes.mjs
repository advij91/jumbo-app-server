import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController.mjs";

const router = express.Router();

// GET all categories
router.get("/categories", getCategories);

// GET a single category by ID
router.get("/categories/:id", getCategoryById);

// POST a new category
router.post("/categories", createCategory);

// PUT (update) a category by ID
router.put("/categories/:id", updateCategory);

// DELETE a category by ID
router.delete("/categories/:id", deleteCategory);

export default router;