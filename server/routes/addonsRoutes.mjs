import express from "express";
import {
    createAddon,
    updateAddonById,
    getAllAddons,
    getAddonById,
    getAddonsByItem,
    deleteAddonById,
} from "../controllers/addonsController.mjs";

const router = express.Router();

// Route to create a new addon
router.post("/addons", createAddon);

// Route to update an addon by ID
router.put("/addons/:id", updateAddonById);

// Route to get all addons
router.get("/addons", getAllAddons);

// Route to get addons by associated item
router.get("/addons/item/:itemId", getAddonsByItem);

// Route to get an addon by ID
router.get("/addons/:id", getAddonById);

// Route to delete an addon by ID
router.delete("/addons/:id", deleteAddonById);

export default router;