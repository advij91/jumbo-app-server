import Order from "../models/Order.mjs";
import { getIO } from "../middleware/socketService.mjs";

// Utility function for error responses
const handleError = (res, error, statusCode = 500) => {
  console.error(error.message || error);
  res.status(statusCode).json({ error: error.message || "Internal server error" });
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Emit the order creation event
    const io = getIO();
    io.emit("create-order", { order });

    res.status(201).json(order);
  } catch (error) {
    handleError(res, error, 400);
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().lean();
    res.status(200).json(orders);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all orders by user ID
export const getAllOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const orders = await Order.find({ userContact: userId }).lean();
    res.status(200).json(orders);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all orders by date
export const getAllOrdersByDate = async (req, res) => {
  try {
    const { date } = req.params;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const orders = await Order.find({ createdAt: { $gte: date } }).lean();
    res.status(200).json(orders);
  } catch (error) {
    handleError(res, error);
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Order ID is required" });

    const order = await Order.findById(id).populate("orderItems.itemId").populate("outletId");
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    handleError(res, error);
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Order ID is required" });

    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    handleError(res, error, 400);
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Order ID is required" });

    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) return res.status(400).json({ error: "Order ID and status are required" });

    const order = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Emit the status update event
    const io = getIO();
    io.emit("order-status-updated", { _id: id, orderStatus: status });

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    handleError(res, error);
  }
};