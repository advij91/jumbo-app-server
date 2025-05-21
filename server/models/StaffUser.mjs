import mongoose from "mongoose";
import { authDB } from "../config/dbAuth.mjs";

const staffUserSchema = new mongoose.Schema({
  staffid: {
    type: Number,
    required: true,
    validate: {
      validator: v => /^\d{6}$/.test(v),
      message: props => `${props.value} is not a valid 6-digit staff ID!`,
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, // Should be hashed before saving
  },
  department: {
    type: String,
    required: true,
    enum: [
      "executive",
      "admin",
      "sales",
      "accounts",
      "humanresource",
      "housekeeping",
      "kitchen",
      "delivery partner",
    ],
  },
  level: {
    type: String,
    required: true,
    trim: true,
  },
  outlets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    required: true,
  }],
  address1: {
    type: String,
    required: true,
    trim: true,
  },
  address2: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: props => `${props.value} is not a valid 10-digit contact number!`,
    },
  },
  alternateContact: {
    type: String,
    validate: {
      validator: v => !v || /^\d{10}$/.test(v),
      message: props => `${props.value} is not a valid 10-digit alternate contact number!`,
    },
  },
  email: {
    type: String,
    validate: {
      validator: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: props => `${props.value} is not a valid email address!`,
    },
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Owner", "Manager", "Staff", "Partner", "Rider"],
    default: "Staff",
  },
  access: {
    type: [String],
    enum: [
      "View Outlet",
      "Manage Outlet",
      "View Staff",
      "Manage Staff",
      "View Inventory",
      "Manage Inventory",
      "View Orders",
      "Manage Orders",
      "View Reports",
      "Manage Reports",
      "View Customers",
      "Manage Customers",
      "View Payments",
      "Manage Payments",
      "View Settings",
      "Manage Settings",
    ],
    default: ["View Outlet"],
  }
}, { timestamps: true });

const StaffUser = authDB.model('StaffUser', staffUserSchema);

export default StaffUser;