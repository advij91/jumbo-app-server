import React, { useState, useEffect, useMemo } from "react";
import { getAllOrdersByDate } from "../../../services/ordersService";
import { getOutlets } from "../../../services/outletService";
import { format } from "date-fns";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import OrderFaceCard from "../../components/cards/order/OrderFaceCard";
import SectionHeader from "../../components/common/SectionHeader";
import NewOrderAudioEnableButton from "../../components/common/NewOrderAudioEnableButton";

const SOCKET_URL = "http://localhost:5000";

const Orders = () => {
  const [date] = useState(() => new Date());
  const [orders, setOrders] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [selectedOutletId, setSelectedOutletId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOutlets() {
      const data = await getOutlets();
      setOutlets(data);
    }
    fetchOutlets();
  }, []);

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
    return () => socket.disconnect();
  }, []);

  // Filter orders by selected outlet
  const filteredOrders = useMemo(
    () =>
      selectedOutletId
        ? orders.filter((order) => order.outletId === selectedOutletId)
        : orders,
    [orders, selectedOutletId]
  );

  const ordersNeedAction = useMemo(
    () => filteredOrders.filter((order) => order.orderStatus === "Pending"),
    [filteredOrders]
  );
  const ordersInProgress = useMemo(
    () => filteredOrders.filter((order) => order.orderStatus === "Confirmed"),
    [filteredOrders]
  );
  const ordersReadyToPickup = useMemo(
    () => filteredOrders.filter((order) => order.orderStatus === "Ready to Pickup"),
    [filteredOrders]
  );
  const ordersInDelivery = useMemo(
    () => filteredOrders.filter((order) => order.orderStatus === "Out for Delivery"),
    [filteredOrders]
  );

  return (
    <div>
      <Header />
      <div className="my-6 ml-4">
        <NewOrderAudioEnableButton />
      </div>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-primary mb-4">Orders</h1>
          <div className="flex gap-6 items-end">
            <div className="flex flex-col">
              <label
                htmlFor="outlet-select"
                className="text-gray-700 font-medium mb-1 ml-1"
              >
                Filter by Outlet
              </label>
              <select
                id="outlet-select"
                value={selectedOutletId}
                onChange={(e) => setSelectedOutletId(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition w-56"
              >
                <option value="">All Outlets</option>
                {outlets.map((outlet) => (
                  <option key={outlet._id} value={outlet._id}>
                    {outlet.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => navigate("/orders/all")}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition font-semibold shadow"
            >
              View All Orders
            </button>
          </div>
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