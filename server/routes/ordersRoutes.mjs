import express from "express";
import {
  createOrder,
  getAllOrders,
  getAllOrdersByUserId,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  getAllOrdersByDate
} from "../controllers/ordersController.mjs";

const router = express.Router();

// Create a new order
router.post("/orders", createOrder);

// Get all orders
router.get("/orders", getAllOrders);

// Get all orders by userId
router.get("/orders/user/:userId", getAllOrdersByUserId);

// Get all orders by date
router.get("/orders/date/:date", getAllOrdersByDate);

// Get a single order by ID
router.get("/orders/:id", getOrderById);

// Update an order
router.put("/orders/:id", updateOrder);

// Update order status via webhook
router.post("/orders/update-status/:id", updateOrderStatus);

// Delete an order
router.delete("/orders/:id", deleteOrder);

// Webhook to notify clients about order status changes
router.post("/webhook/order-status", updateOrderStatus);

export default router;