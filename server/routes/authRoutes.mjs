import express from "express";
import {createUser, verifyUser, refreshTokens, staffSignup, staffLogin, refreshStaffTokens, staffMe} from "../controllers/authController.mjs";
import { authenticate } from "../middleware/authenticate.mjs";

const router = express.Router();

router.post("/login", createUser); // Route to create a user generate otp
router.post("/verify", verifyUser); // Route to verify user otp and generate tokens
router.post("/refresh-token", refreshTokens)
router.post("/staff/signup", staffSignup); // Staff signup route
router.post("/staff/login", staffLogin); // Staff login route
router.post("/staff/refresh-token", refreshStaffTokens); // Staff refresh tokens route
router.get("/staff/me",  authenticate, staffMe); // Get staff details route

export default router;
