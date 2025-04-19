import express from "express";
import {
    createUser,
    getAllUsers,
    getUserByContact,
    updateUser,
    deleteUser,
} from "../controllers/usersController.mjs";

const router = express.Router();

// Route to create a user
router.post("/users", createUser);

// Route to get all users
router.get("/users", getAllUsers);

// Route to get a user by username
router.get("/users/:contact", getUserByContact);

// Route to update a user by ID
router.put("/users/:id", updateUser);

// Route to delete a user by ID
router.delete("/users/:id", deleteUser);

export default router;
