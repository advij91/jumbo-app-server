import mongoose from "mongoose";

import { storeDB } from "../config/dbStore.mjs";

const userStaffSchema = new mongoose.Schema({
  staffid: {
    type: Number,
    required: true, // Mandatory 6-digit numeric value
    validate: {
      validator: function (v) {
        return /^\d{6}$/.test(v); // Ensures 6-digit numeric value
      },
      message: (props) => `${props.value} is not a valid 6-digit staff ID!`,
    },
  },
  name: {
    type: String,
    required: true, // Mandatory field
    trim: true,
  },
  password: {
    type: String,
    required: true, // Mandatory encrypted password
  },
  department: {
    type: String,
    required: true, // Mandatory field
    enum: [
      "executive",
      "admin",
      "sales",
      "accounts",
      "humanresource",
      "housekeeping",
      "kitchen",
      "delivery partner",
    ], // Allowed values
  },
  level: {
    type: String,
    required: true, // Mandatory field
    trim: true, // For clean input
  },
  outlet: {
    type: mongoose.Schema.Types.ObjectId, // Reference Outlet
    ref: "Outlet", // Explicitly use the Outlet schema
    required: true, // Ensure every UserStaff is linked to an Outlet
  },
    name: {
      type: String,
      required: true, // Outlet name
      trim: true,
    },
  address1: {
    type: String,
    required: true, // Mandatory field
    trim: true,
  },
  address2: {
    type: String,
    required: true, // Mandatory field
    trim: true,
  },
  contact: {
    type: String,
    required: true, // 10-digit phone number
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 10-digit contact number!`,
    },
  },
  alternateContact: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 10-digit alternate contact number!`,
    },
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email regex validation
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

const UserStaff = storeDB.model('UserStaff', userStaffSchema);

export default UserStaff