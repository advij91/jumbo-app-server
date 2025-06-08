import express from "express";
import {
  getOutlets,
  addOutlet,
  updateOutlet,
  deleteOutlet,
  getOutletById,
} from "../controllers/outletsController.mjs";

const router = express.Router();

// Route to get all outlets
router.get("/outlets", getOutlets);

// Route to get a single outlet by ID
router.get("/outlets/:id", getOutletById);

// Route to add a new outlet
router.post("/outlets", addOutlet);

// Route to update an existing outlet
router.patch("/outlets/:id", updateOutlet);

// Route to delete an outlet
router.delete("/outlets/:id", deleteOutlet);

export default router;
