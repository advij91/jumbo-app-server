import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { updateOrderStatus } from "../../../../services/ordersSerivce";

const OrderDetailsCard = ({ order }) => {
  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-md shadow-inner">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Order Details</h3>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-800">
        <p><span className="font-semibold">Type:</span> {order.orderType}</p>
        <p><span className="font-semibold">Delivery:</span> {order.deliveryAddress}</p>
        <p><span className="font-semibold">Outlet:</span> {order.outletAddress}</p>
        <p><span className="font-semibold">Contact:</span> {order.userContact}</p>
      </div>

      <h4 className="text-sm font-semibold text-gray-700 mt-4">Items:</h4>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        {order.orderItems.map((item) => (
          <li key={item.itemId}>
            {item.itemName} - ₹{item.itemPrice}
            {item.addons.length > 0 && (
              <span className="text-gray-500">
                ({item.addons.map(addon => `${addon.category}: ${addon.addonItems.map(ai => ai.name).join(", ")}`).join(" | ")})
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm font-semibold text-gray-800">
        Total: <span className="text-green-600">₹{order.totalAmount}</span>
      </p>

      {/* Action Buttons with Status-Based Colors */}
      <div className="flex flex-wrap gap-4 mt-4">
        {order.orderStatus === "Pending" && (
          <>
            <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600" onClick={() => updateOrderStatus(order._id, "Confirmed")}>
              <FaCheck /> Confirm
            </button>
            <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              <FaTimes /> Reject
            </button>
          </>
        )}
        {order.orderStatus === "Confirmed" && (
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => updateOrderStatus(order._id, "Ready to Pickup")}>
            <FaCheck /> Ready to Pickup
          </button>
        )}
        {order.orderStatus === "Ready to Pickup" && (
          <button className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600" onClick={() => updateOrderStatus(order._id, "Out for Delivery")}>
            <FaCheck /> Out for Delivery
          </button>
        )}
        {order.orderStatus === "Out for Delivery" && (
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={() => updateOrderStatus(order._id, "Delivered")}>
            <FaCheck /> Delivered
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsCard;