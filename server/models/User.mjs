import mongoose from "mongoose";

// Importing the database connection
import { authDB } from "../config/dbAuth.mjs";

// Define the User Schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
    },
    contact: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Contact number must be 10 digits"], // Regex for a valid 10-digit number
    },
    email: {
        type: String,
        unique: true,
        lowercase: true, // Ensures consistent formatting
        sparse: true //// Ignore null values when enforcing uniqueness
    },
    otpSecret: {
        type: String, // Stores the secret key for OTP generation
    },
    authToken: {
        type: String, // Stores JWT token for authentication
    },
    refreshToken: {
        type: String, // Stores the refresh token for session management
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update `updatedAt` on save
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Middleware to update `updatedAt` on update operations
userSchema.pre("findOneAndUpdate", function (next) {
    this._update.updatedAt = Date.now();
    next();
});

// Export the User model
const User = authDB.model("User", userSchema);
export default User;
