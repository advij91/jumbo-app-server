import React, { useState, useEffect } from "react";
import { getAllOrdersByDate } from "../../../services/ordersSerivce";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Header from "../../components/Header";
import OrderFaceCard from "../../components/cards/order/OrderFaceCard";
import SectionHeader from "../../components/common/SectionHeader";
import NewOrderAudioEnableButton from "../../components/common/NewOrderAudioEnableButton";

const Orders = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [orders, setOrders] = useState([]);
  const [ordersNeedAction, setOrdersNeedAction] = useState([]);
  const [ordersInProgress, setOrdersInProgress] = useState([]);
  const [ordersReadyToPickup, setOrdersReadyToPickup] = useState([]);
  const [ordersInDelivery, setOrdersInDelivery] = useState([]);
  const [ordersCancelled, setOrdersCancelled] = useState([]);
  const [ordersCompleted, setOrdersCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrdersByDate(date);
        setOrders(response);
        setOrdersNeedAction(
          response.filter((order) => order.orderStatus === "Pending")
        );
        setOrdersInProgress(
          response.filter((order) => order.orderStatus === "Confirmed")
        );
        setOrdersReadyToPickup(
          response.filter((order) => order.orderStatus === "Ready to Pickup")
        );
        setOrdersInDelivery(
          response.filter((order) => order.orderStatus === "Out for Delivery")
        );
        setOrdersCancelled(
          response.filter((order) => order.orderStatus === "Cancelled")
        );
        setOrdersCompleted(
          response.filter((order) => order.orderStatus === "Delivered")
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orders, date]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // Listen for socket messages
    socket.on("order-status-updated", (updatedOrder) => {
      // Update the state with the new order data
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="my-6 ml-4">
      <NewOrderAudioEnableButton /> {/* Include the audio button here */}
      </div>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-4">Orders</h1>
          <button
            onClick={() => navigate("/orders/all")} // Navigate to the "View All Orders" page
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
          >
            View All Orders
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        <SectionHeader text="New Orders" />
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders &&
              ordersNeedAction.map((order) => (
                <OrderFaceCard key={order._id} order={order} />
              ))}
          </div>
        )}

        <SectionHeader text="Orders In Progress" />
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders &&
              ordersInProgress.map((order) => (
                <OrderFaceCard key={order._id} order={order} />
              ))}
          </div>
        )}

        <SectionHeader text="Orders Ready to Pick" />
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders &&
              ordersReadyToPickup.map((order) => (
                <OrderFaceCard key={order._id} order={order} />
              ))}
          </div>
        )}

        <SectionHeader text="Orders Out For Delivery" />
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders &&
              ordersInDelivery.map((order) => (
                <OrderFaceCard key={order._id} order={order} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
