import mongoose from "mongoose";

import { storeDB } from "../config/dbStore.mjs";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userContact: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    outletAddress: {
      type: String,
      required: true,
    },
    outletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet",
      required: true,
    },
    orderType: {
      type: String,
      enum: ["delivery", "pickup"],
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Ready to Pickup",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
    orderItems: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        itemName: {
          type: String,
          required: true,
        },
        itemPrice: {
          type: Number,
          required: true,
        },
        quantity: { type: Number, required: true },
        totalItemPrice: { type: Number, required: true },
        addons: [
          {
            category: String,
            addonItems: [
              {
                name: String,
                price: Number,
              },
            ],
          },
        ],
      },
    ],
    charges: [
      {
        name: String,
        amount: Number,
      },
    ],
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastOrder = await storeDB.model("Order").findOne({}, {}, { sort: { orderId: -1 } });
    this.orderId = lastOrder ? lastOrder.orderId + 1 : 1;
  }
  next();
});

const Order = storeDB.model("Order", orderSchema);
export default Order;
