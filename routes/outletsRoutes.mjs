import express from "express";
import { getOutlets, addOutlet, updateOutlet, deleteOutlet } from "../controllers/outletsController.mjs";

const router = express.Router();

// Route to get all outlets
router.get("/outlets", getOutlets);

// Route to add a new outlet
router.post("/outlets", addOutlet);

// Route to update an existing outlet
router.put("/outlets/:id", updateOutlet);

// Route to delete an outlet
router.delete("/outlets/:id", deleteOutlet);

export default router;
