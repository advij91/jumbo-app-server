import User from "../models/User.mjs"; // Assuming your schema is in a separate file
import StaffUser from "../models/StaffUser.mjs";
import bcrypt from "bcryptjs";

import { generateOTP, verifyOTP } from "../middleware/otpService.mjs";
import {
  generateAuthToken,
  generateRefreshToken,
  validateRefreshToken,
} from "../middleware/tokenService.mjs";
import { sendVerificationCode } from "../middleware/waMessageService.mjs";

export const createUser = async (req, res) => {
  try {
    const { contact } = req.body;
    let user = await User.findOne({ contact });
    if (user) {
      const { otp } = generateOTP(user.otpSecret);
      // await sendVerificationCode(`91${contact}`, otp);
      res.status(200).json({ otp, message: "OTP generated for existing user" });
    } else {
      const { otpSecret, otp } = generateOTP();
      await sendVerificationCode(`91${contact}`, otp);
      const userPayload = new User({
        contact,
        otpSecret,
      });
      try {
        await userPayload.save();
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error in creating the user", error });
      }
      res
        .status(200)
        .json({ otp, message: "New user created and OTP generated" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error generating OTP", error });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { contact, otp } = req.body;
    // step 1: find the user
    const user = await User.findOne({ contact });
    // step 2: verify the otp
    const isValidOTP = verifyOTP({ otpSecret: user.otpSecret, otp });
    if (!isValidOTP) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    // step 3: genrate tokens
    const payload = { contact: user.contact, userId: user._id };
    const authToken = generateAuthToken(payload);
    const refreshToken = generateRefreshToken(payload);
    // step 4: save tokens to datbase
    user.authToken = authToken;
    user.refreshToken = refreshToken;
    res.status(200).json({
      authToken,
      refreshToken,
      message: "Tokens generated and saved successfully!",
    });
  } catch {
    res.status(500).json({ message: "Error generating tokens", error });
  }
};

export const refreshTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Step 1: Validate the refresh token
    const decoded = validateRefreshToken(refreshToken);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    // Step 2: Find the user
    const user = await User.findOne({ contact: decoded.contact });
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json({ message: "Refresh token mismatch or user not found" });
    }

    // Step 3: Generate new tokens
    const payload = { contact: user.contact, userId: user._id };
    const newAuthToken = generateAuthToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Step 4: Save new tokens to database
    user.authToken = newAuthToken;
    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      authToken: newAuthToken,
      refreshToken: newRefreshToken,
      message: "Tokens refreshed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error refreshing tokens", error });
  }
};

export const staffSignup = async (req, res) => {
  try {
    const {
      staffid,
      name,
      password,
      department,
      level,
      outlets,
      address1,
      address2,
      contact,
      alternateContact,
      email,
      role,
      access,
    } = req.body;
    const existingStaff = await StaffUser.findOne({ staffid });
    if (existingStaff) {
      return res.status(400).json({ message: "Staff ID already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new StaffUser({
      staffid,
      name,
      password: hashedPassword,
      department,
      level,
      outlets,
      address1,
      address2,
      contact,
      alternateContact,
      email,
      role,
      access,
    });
    await newStaff.save();
    res.status(201).json({ message: "Staff registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering staff", error });
  }
};

export const staffLogout = async (req, res) => {
  try {
    const { staffid } = req.body;
    const staff = await StaffUser.findOne({ staffid });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    staff.authToken = null;
    staff.refreshToken = null;
    await staff.save();
    res.status(200).json({ message: "Staff logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out staff", error });
  }
};

export const staffLogin = async (req, res) => {
  try {
    const { staffid, password } = req.body;
    const staff = await StaffUser.findOne({ staffid });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate tokens (reuse existing token logic if needed)
    const payload = {
      staffid: staff.staffid,
      role: staff.role,
      access: staff.access,
    };
    const authToken = generateAuthToken(payload);
    const refreshToken = generateRefreshToken(payload);
    staff.authToken = authToken;
    staff.refreshToken = refreshToken;
    await staff.save();
    res.status(200).json({
      authToken,
      refreshToken,
      staff: {
        staffid: staff.staffid,
        name: staff.name,
        role: staff.role,
        access: staff.access,
        outlets: staff.outlets,
      },
      message: "Staff login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in staff", error });
  }
};

export const refreshStaffTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Step 1: Validate the refresh token
    const decoded = validateRefreshToken(refreshToken);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    // Step 2: Find the staff user
    const staff = await StaffUser.findOne({ staffid: decoded.staffid });
    // if (!staff || staff.refreshToken !== refreshToken) {
    if (!staff) {
      return res
        .status(403)
        .json({ message: "Refresh token mismatch or user not found" });
    }

    // Step 3: Generate new tokens
    const payload = {
      staffid: staff.staffid,
      role: staff.role,
      access: staff.access,
    };
    const newAuthToken = generateAuthToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Step 4: Save new tokens to database
    staff.authToken = newAuthToken;
    staff.refreshToken = newRefreshToken;
    await staff.save();

    res.status(200).json({
      authToken: newAuthToken,
      refreshToken: newRefreshToken,
      message: "Tokens refreshed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error refreshing tokens", error });
  }
};

export const staffMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};
