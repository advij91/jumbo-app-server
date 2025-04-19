import express from "express";
import {createUser, verifyUser, refreshTokens} from "../controllers/authController.mjs";

const router = express.Router();

router.post("/login", createUser); // Route to create a user generate otp
router.post("/verify", verifyUser); // Route to verify user otp and generate tokens
router.post("/refreshTokens", refreshTokens)

export default router;
