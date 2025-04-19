import mongoose from "mongoose";

import { storeDB } from "../config/dbStore.mjs";

const outletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Mandatory field
    trim: true,
  },
  address: {
    type: String,
    required: true, // Mandatory field
    trim: true,
  },
  city: {
    type: String,
    required: true, // Mandatory field
    trim: true,
  },
  state: {
    type: String,
    required: true, // Mandatory field
    trim: true,
  },
  pin: {
    type: String,
    required: true, // 6-digit PIN validation
    validate: {
      validator: function (v) {
        return /^\d{6}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 6-digit PIN code!`,
    },
  },
  contact: {
    type: String,
    required: true, // 10-digit phone number
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 10-digit number!`,
    },
  },
  alternateContact: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 10-digit number!`,
    },
  },
  socialMedia: {
    type: new mongoose.Schema({
      media: { type: String, trim: true }, // Social platform name
      profileUrl: { type: String, trim: true }, // Profile URL
    }),
    default: undefined, // Optional field
  },
});

const Outlet = storeDB.model('Outlet', outletSchema);

export default Outlet