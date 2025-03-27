import mongoose from "mongoose";

import { storeDB } from "../config/dbStore.mjs";

// Menu Schema
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Mandatory field
    trim: true,
  },
  outlet: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Outlet model
    ref: "Outlet",
    required: true, // Mandatory field
  },
  labels: {
    type: [String], // Array of strings for labels
    default: undefined, // Optional field
  },
  menuDetails: {
    type: [
      new mongoose.Schema({
        item: {
          type: mongoose.Schema.Types.ObjectId, // Reference to the Item model
          ref: "Item",
          required: true, // Mandatory field
        },
        price: {
          type: Number,
          required: true, // Numeric price, mandatory
          validate: {
            validator: function (v) {
              return v >= 0; // Ensures the price is not negative
            },
            message: (props) => `${props.value} is not a valid price!`,
          },
        },
        isAvailable: {
          type: Boolean,
          required: true, // Mandatory field for availability
        },
      }),
    ], // Change from single object to an array of objects
    required: true, // Ensure menuDetails is always present
  },
});

const Menu = storeDB.model('Menu', menuSchema);

export default Menu