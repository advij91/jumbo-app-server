import express from "express";
import { getMenus, addMenu, updateMenu, deleteMenu } from "../controllers/menusController.mjs";

const router = express.Router();

// Route to get all menus
router.get("/menus", getMenus);

// Route to create a new menu
router.post("/menus", addMenu);

// Route to update an existing menu
router.put("/menus/:id", updateMenu);

// Route to delete a menu
router.delete("/menus/:id", deleteMenu);

export default router;
