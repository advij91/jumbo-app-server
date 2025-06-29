import React, { useState, useEffect, useMemo } from "react";
import { getAllOrdersByDate } from "../../../services/ordersSerivce";
import { format } from "date-fns";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import OrderFaceCard from "../../components/cards/order/OrderFaceCard";
import SectionHeader from "../../components/common/SectionHeader";
import NewOrderAudioEnableButton from "../../components/common/NewOrderAudioEnableButton";

// Set your socket URL here or import from a config file
const SOCKET_URL = "http://localhost:5000";

const Orders = () => {
  const [date] = useState(() => new Date());
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch orders for the selected date
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    const fetchOrders = async () => {
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const response = await getAllOrdersByDate(formattedDate);
        if (isMounted) {
          setOrders(Array.isArray(response) ? response : []);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, [date]);

  // Socket connection for real-time updates
  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("create-order", ({ order }) => {
      setOrders((prevOrders) => [order, ...prevOrders]);
    });

    socket.on("order-status-updated", (updatedOrder) => {
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

  // Derive filtered order lists from orders state
  const ordersNeedAction = useMemo(
    () => orders.filter((order) => order.orderStatus === "Pending"),
    [orders]
  );
  const ordersInProgress = useMemo(
    () => orders.filter((order) => order.orderStatus === "Confirmed"),
    [orders]
  );
  const ordersReadyToPickup = useMemo(
    () => orders.filter((order) => order.orderStatus === "Ready to Pickup"),
    [orders]
  );
  const ordersInDelivery = useMemo(
    () => orders.filter((order) => order.orderStatus === "Out for Delivery"),
    [orders]
  );

  return (
    <div>
      <Header />
      <div className="my-6 ml-4">
        <NewOrderAudioEnableButton />
      </div>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-4">Orders</h1>
          <button
            onClick={() => navigate("/orders/all")}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
          >
            View All Orders
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        <SectionHeader text="New Orders" />
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ordersNeedAction.map((order) => (
              <OrderFaceCard key={order._id} order={order} />
            ))}
          </div>
        )}
        <SectionHeader text="Orders In Progress" />
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ordersInProgress.map((order) => (
              <OrderFaceCard key={order._id} order={order} />
            ))}
          </div>
        )}
        <SectionHeader text="Orders Ready to Pick" />
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ordersReadyToPickup.map((order) => (
              <OrderFaceCard key={order._id} order={order} />
            ))}
          </div>
        )}
        <SectionHeader text="Orders Out For Delivery" />
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ordersInDelivery.map((order) => (
              <OrderFaceCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
