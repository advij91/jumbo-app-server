import mongoose from "mongoose";
import { storeDB } from "../config/dbStore.mjs";

// Sub-schema for Contact
const contactSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["email", "whatsapp", "contact", "alternateContact"], // Allowed contact types
  },
  value: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// Sub-schema for Address
const addressSchema = new mongoose.Schema({
  addressLine: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
    match: [/^\d{6}$/, "Pin must be exactly 6 digits"], // Validate pin code
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
  isDefault: {
    type: Boolean,
    default: false,
  },
});

// Main schema for Customer
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  loginId: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Login ID must be a 10-digit contact number"],
  },
  city: {
    type: String,
    required: true,
  },
  contacts: [contactSchema], // Array of contact subdocuments
  addresses: [addressSchema], // Array of address subdocuments
  isCustomerActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  otherCustomerDetails: {
    type: String,
    default: "",
  },
});

// Pre-save validation to ensure only one address is marked as default
customerSchema.pre("save", function (next) {
  const defaultCount = this.addresses.filter(
    (address) => address.isDefault
  ).length;

  if (defaultCount > 1) {
    return next(new Error("Only one address can be marked as default."));
  }
  next();
});

// Compile and export the Customer model
const Customer = storeDB.model("Customer", customerSchema);
export default Customer;
