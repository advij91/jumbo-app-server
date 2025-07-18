import Coupon from "../models/Coupon.mjs";
import Order from "../models/Order.mjs"
import mongoose from "mongoose";
import { upload, uploadToR2 } from "../middleware/uploadService.mjs";
import fs from "fs";
const pubBucketURL = "https://pub-07aefead65ab4b5a9a9a264d668eef65.r2.dev";

// Create a new coupon
export const createCoupon = [
  upload.single("file"), // Middleware to handle file upload
  async (req, res) => {
    try {
      const {
        code,
        description,
        startAt,
        endAt,
        allowedFrequency,
        couponConditions,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      // Upload the image to R2
      const imageUrl = await uploadToR2(req.file.path, req.file.filename);

      // Delete the local file after uploading to R2
      fs.unlinkSync(req.file.path);

      // Construct the coupon object
      const couponData = {
        code,
        description,
        startAt,
        endAt,
        allowedFrequency: JSON.parse(allowedFrequency),
        couponConditions: JSON.parse(couponConditions),
        imageUrl,
      };
      try {
        const createdCoupon = await Coupon.create(couponData);
        res.status(201).json({
          message: "Coupon created successfully",
          coupon: createdCoupon,
        });
      } catch (dbError) {
        console.error("Error saving coupon to database:", dbError);
        return res.status(500).json({
          message: "Failed to save coupon to database",
          error: dbError,
        });
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
      res
        .status(500)
        .json({ message: "Failed to create coupon", error: error.message });
    }
  },
];

// Get all coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().lean();
    if (!coupons || coupons.length === 0) {
      return res.status(204).json({
        success: false,
        message: "No coupons found",
      });
    }
    const updatedCoupons = coupons.map((coupon) => ({
      ...coupon,
      imageUrl: coupon.imageUrl
        ? `${pubBucketURL}/${coupon.imageUrl.split("/").pop()}`
        : "",
    }));
    res.status(200).json(updatedCoupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ message: "Failed to fetch coupons", error });
  }
};

// Get a single coupon by ID
export const getCouponById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid item ID" });
  }

  try {
    const coupon = await Coupon.findById(id).lean();
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const updatedCoupon = {
      ...coupon,
      imageUrl: coupon.imageUrl
        ? `${pubBucketURL}/${coupon.imageUrl.split("/").pop()}`
        : "",
    };

    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.error("Error fetching coupon by ID:", error);
    res.status(500).json({ message: "Failed to fetch coupon", error });
  }
};

// Get live coupons
export const getLiveCoupons = async (req, res) => {
  try {
    const currentDate = new Date();
    const coupons = await Coupon.find({
      startAt: { $lte: currentDate },
      endAt: { $gte: currentDate },
    }).lean();

    if (!coupons || coupons.length === 0) {
      return res.status(204).json({
        success: true,
        message: "No live coupons found",
      });
    }

    const updatedCoupons = coupons.map((coupon) => ({
      ...coupon,
      imageUrl: coupon.imageUrl
        ? `${pubBucketURL}/${coupon.imageUrl.split("/").pop()}`
        : "",
    }));
    res.status(200).json(updatedCoupons);
  } catch (error) {
    console.error("Error fetching live coupons:", error);
    res.status(500).json({ message: "Failed to fetch live coupons", error });
  }
};

// Update a coupon by ID
export const updateCoupon = [
  upload.single("file"), // Middleware to handle file upload
  async (req, res) => {
    try {
      const { id } = req.params;

      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid coupon ID" });
      }

      // Find the coupon by ID
      const coupon = await Coupon.findById(id);
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }

      // Update the coupon fields
      const updatedFields = {
        code: req.body.code || coupon.code,
        description: req.body.description || coupon.description,
        startAt: req.body.startAt || coupon.startAt,
        endAt: req.body.endAt || coupon.endAt,
        allowedFrequency: JSON.parse(
          req.body.allowedFrequency || coupon.allowedFrequency
        ),
        couponConditions:
          JSON.parse(req.body.couponConditions) || coupon.couponConditions,
      };

      // If a new file is uploaded, upload it to R2 and update the imageUrl
      if (req.file) {
        const imageUrl = await uploadToR2(req.file.path, req.file.filename);
        fs.unlinkSync(req.file.path); // Delete the local file after uploading
        updatedFields.imageUrl = imageUrl;
      }

      // Update the coupon in the database
      const updatedCoupon = await Coupon.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });

      res.status(200).json({
        message: "Coupon updated successfully",
        coupon: updatedCoupon,
      });
    } catch (error) {
      console.error("Error updating coupon:", error);
      res.status(500).json({ message: "Failed to update coupon", error });
    }
  },
];
// Delete a coupon by ID
export const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid coupon ID" });
  }

  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting coupon",
      error: error.message,
    });
  }
};

// Utility to get the start date for a given frequency type
function getFrequencyStartDate(type) {
  const now = new Date();
  switch (type) {
    case "hourly":
      return new Date(now.getTime() - 60 * 60 * 1000);
    case "daily":
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case "weekly": {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      return new Date(now.setDate(diff));
    }
    case "monthly":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "yearly":
      return new Date(now.getFullYear(), 0, 1);
    default:
      return null;
  }
}

export const getCouponApplicability = async (req, res) => {
  const { couponCode, user, cartValue, charges, items, orderType } = req.body;
  if (!couponCode || !user || !cartValue || !charges || !items || !orderType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const coupon = await Coupon.findOne({
    code: couponCode,
    startAt: { $lte: new Date() },
    endAt: { $gte: new Date() },
  });
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found or expired" });
  }

  // Frequency check (fixed, hourly, daily, weekly, monthly, yearly)
  const { type, limit } = coupon.allowedFrequency;
  let usageCount = 0;
  if (type === "fixed") {
    usageCount = await Order.countDocuments({
      userContact: user.loginId,
      "discountDetails.couponCode": couponCode,
    });
  } else {
    const startDate = getFrequencyStartDate(type);
    if (startDate) {
      usageCount = await Order.countDocuments({
        userContact: user.loginId,
        "discountDetails.couponCode": couponCode,
        createdAt: { $gte: startDate },
      });
    }
  }
  if (usageCount >= limit) {
    return res
      .status(200)
      .json({ success: false, message: "Coupon usage limit reached" });
  }

  // Add additional coupon condition checks here (min cart, orderType, etc.)
  if (coupon.couponConditions.minCartAmount && cartValue < coupon.couponConditions.minCartAmount) {
    return res.status(200).json({
      success: false,
      message: `Minimum cart value for this coupon is ${coupon.couponConditions.minCartAmount}`,
    });
  }

  return res.status(200).json({ success: true, message: "Coupon is applicable", coupon });
};
