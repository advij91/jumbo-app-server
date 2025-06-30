import express from "express";
import {
  createOrder,
  getAllOrders,
  getAllOrdersByUserId,
  getLiveOrderByUserId,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  getAllOrdersByDate,
  assignRiderToOrder,
} from "../controllers/ordersController.mjs";

import { authenticate } from "../middleware/authenticate.mjs";
import { authorize } from "../middleware/authorize.mjs";

const router = express.Router();

// Create a new order
router.post("/orders", createOrder);

// Get all orders
// Allow user with "View Orders" access to see all orders
router.get("/orders", authenticate, authorize(["Admin"]), getAllOrders);

// Get Live orders by userId
router.get("/orders/live/:userId", getLiveOrderByUserId);

// Get all orders by userId
router.get("/orders/user/:userId", getAllOrdersByUserId);

// Get all orders by date
router.get(
  "/orders/date/:date",
  authenticate,
  authorize(["Admin"]),
  getAllOrdersByDate
);

// Get a single order by ID
router.get("/orders/:id", getOrderById);

// Update an order
router.put("/orders/:id", updateOrder);

// Update order status via webhook
router.post("/orders/update-status/:id", updateOrderStatus);

// Delete an order
router.delete("/orders/:id", deleteOrder);

router.post(
  "/orders/:orderId/assign-rider",
  authenticate,
  authorize(["Admin", "Owner", "Manager"]),
  assignRiderToOrder
);

// Webhook to notify clients about order status changes
router.post("/webhook/order-status", updateOrderStatus);

export default router;
