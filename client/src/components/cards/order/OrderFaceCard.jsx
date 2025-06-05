import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import OrderDetailsCard from "./OrderDetailsCard";

const statusColors = {
  Pending: "bg-red-600 text-white animate-pulse",
  Confirmed: "bg-yellow-600 text-white",
  "Ready to Pickup": "bg-blue-600 text-white",
  "Out for Delivery": "bg-purple-600 text-white",
  Delivered: "bg-green-600 text-white",
};

const OrderFaceCard = ({ order }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 transition-all duration-300 hover:shadow-lg">
      {/* Order Header */}
      <div
        className={`flex justify-between items-center p-3 rounded-md cursor-pointer ${
          order.orderStatus === "Pending" ? "border-l-4 border-red-500" : "border-l-4 border-green-500"
        }`}
        onClick={() => setShowOrderDetails(!showOrderDetails)}
      >
        <div className="flex flex-col text-gray-800">
          <span className="font-semibold text-lg">Order ID: {order.orderId}</span>
          <span className={`text-xs px-3 py-1 rounded-md mt-1 ${statusColors[order.orderStatus]} inline-block`}>
            {order.orderStatus}
          </span>
        </div>

        {/* Info Icon */}
        <FaInfoCircle className="text-blue-500 cursor-pointer text-lg" title="Click to view order details" />
      </div>

      {/* Show Order Details on Toggle */}
      {showOrderDetails && <OrderDetailsCard 
      order={order} 
      onClose={() => setShowOrderDetails(false)} 
      />}
    </div>
  );
};

export default OrderFaceCard;