import mongoose from "mongoose";
import { storeDB } from "../config/dbStore.mjs";

const orderTypeSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: true }, // Is this order type allowed at all?
  suspend: { type: Boolean, default: false }, // Temporarily suspend this order type
  workingDays: {
    type: [String], // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  open: { type: String, default: "09:00" },  // Opening time (24h format)
  close: { type: String, default: "22:00" }  // Closing time (24h format)
}, { _id: false });

const outletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 2 && v.every((coord) => typeof coord === "number");
        },
        message: (props) => `${props.value} is not a valid coordinates array!`,
      },
    },
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pin: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{6}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 6-digit PIN code!`,
    },
  },
  contact: {
    type: String,
    required: true,
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
      media: { type: String, trim: true },
      profileUrl: { type: String, trim: true },
    }),
    default: undefined,
  },
    orderTypes: {
    dineIn: { type: orderTypeSchema, default: () => ({}) },
    takeAway: { type: orderTypeSchema, default: () => ({}) },
    delivery: { type: orderTypeSchema, default: () => ({}) },
    inCar: { type: orderTypeSchema, default: () => ({}) }
  },
  orderETAInMinutes: {
      prepTime: { type: Number, default: 20 },
      otherTime: { type: Number, default: 0 },
    },
  suspendAll: { type: Boolean, default: false }, // Suspend all operations for this outlet
  deliveryRestrictions: {
    allowedPinCodes: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.every(pin => /^\d{6}$/.test(pin));
        },
        message: (props) => `${props.value} contains invalid PIN codes!`
      },
      default: []
    },
    deliveryRadiusInKm: {
      type: Number,
      min: 0,
      default: 5, // Default delivery radius in kilometers
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) => `Delivery radius must be a non-negative number!`
      }
    }
  }
});

// Add 2dsphere index for geospatial queries
outletSchema.index({ location: "2dsphere" });

const Outlet = storeDB.model("Outlet", outletSchema);

export default Outlet;