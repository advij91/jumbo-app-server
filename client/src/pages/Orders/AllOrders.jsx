import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getAllOrdersByDate } from "../../../services/ordersService";
import { getOutlets } from "../../../services/outletService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa";
import Header from "../../components/Header";
import OrderDetailsCard from "../../components/cards/order/OrderDetailsCard";

const statusColors = {
  Pending: "bg-red-500 text-white animate-pulse",
  Confirmed: "bg-green-500 text-white",
  "Ready to Pickup": "bg-yellow-500 text-white",
  "Out for Delivery": "bg-purple-500 text-white",
  Delivered: "bg-blue-400 text-white",
  Completed: "bg-blue-500 text-white",
};

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [selectedOutletId, setSelectedOutletId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("userName");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

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

  useEffect(() => {
    async function fetchOutlets() {
      const data = await getOutlets();
      setOutlets(data);
    }
    fetchOutlets();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (selectedDate) {
          const formattedDate = format(selectedDate, "yyyy-MM-dd");
          const data = await getAllOrdersByDate(formattedDate);
          setOrders(data); // Always set to orders
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [selectedDate]);

  // Unified filtering: outlet + search + filterBy
  useEffect(() => {
    let filtered = orders;

    if (selectedOutletId) {
      filtered = filtered.filter((o) => o.outletId === selectedOutletId);
    }

    if (searchQuery) {
      filtered = filtered.filter((order) =>
        order[filterBy]?.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, selectedOutletId, searchQuery, filterBy]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <>
      <Header />
      <div className="p-6">
        {/* Header with Date & Outlet Filter */}
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-semibold mr-6">All Orders</h1>
          <div className="flex gap-6 items-end">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholderText="Select a date"
            />
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
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-light p-4 rounded-md flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="text-gray-700 font-medium block">
              Search by{" "}
              {filterBy === "userName"
                ? "Name"
                : filterBy === "orderStatus"
                ? "Status"
                : "Contact"}
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder={`Enter ${filterBy}`}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="filterBy"
              className="text-gray-700 font-medium block"
            >
              Filter By
            </label>
            <select
              id="filterBy"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="userName">Name</option>
              <option value="orderStatus">Status</option>
              <option value="userContact">Contact</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Customer Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Contact</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Updated At</th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 &&
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {order.orderId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.userName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.userContact}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      <span
                        className={`px-3 py-1 rounded text-xs ${
                          statusColors[order.orderStatus]
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(order.updatedAt).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="View Order Details"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <FaEye className="inline-block text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <OrderDetailsCard
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onStatusUpdate={(orderId, newStatus) => {
                  setOrders((prev) =>
                    prev.map((order) =>
                      order._id === orderId
                        ? { ...order, orderStatus: newStatus }
                        : order
                    )
                  );
                }}
              />
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllOrders;
