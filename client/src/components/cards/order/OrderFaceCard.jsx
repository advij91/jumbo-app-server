import React, { useState, useEffect } from "react";
import { assignRiderToOrder, getRidersByOutletId } from "../../../../services/ordersService";
import { FaInfoCircle, FaUser, FaExchangeAlt, FaCheckCircle } from "react-icons/fa";
import OrderDetailsCard from "./OrderDetailsCard";

const statusColors = {
  Pending: "bg-red-500 text-white",
  Confirmed: "bg-yellow-500 text-white",
  "Ready to Pickup": "bg-blue-500 text-white",
  "Out for Delivery": "bg-purple-500 text-white",
  Delivered: "bg-green-500 text-white",
  Completed: "bg-gray-600 text-white",
  Cancelled: "bg-gray-400 text-white",
  Rejected: "bg-gray-400 text-white",
};

const OrderFaceCard = ({ order }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(order.deliveredBy || "");
  const [editRider, setEditRider] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [assignedRider, setAssignedRider] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch riders and update assignedRider when order or deliveredBy changes
  useEffect(() => {
    if (
      order.orderType === "delivery" &&
      !["Delivered", "Cancelled", "Rejected"].includes(order.orderStatus)
    ) {
      getRidersByOutletId(order.outletId).then((ridersList) => {
        setRiders(ridersList);
        const found = ridersList.find((r) => r._id === (order.deliveredBy || selectedRider));
        setAssignedRider(found || null);
      });
    }
  // eslint-disable-next-line
  }, [order, order.deliveredBy]);

  // Update assignedRider when selectedRider changes in edit mode
  useEffect(() => {
    if (editRider && selectedRider && riders.length > 0) {
      const found = riders.find((r) => r._id === selectedRider);
      setAssignedRider(found || null);
    }
  }, [selectedRider, editRider, riders]);

  const handleAssignRider = async () => {
    setAssigning(true);
    try {
      await assignRiderToOrder(order._id, selectedRider);
      setEditRider(false);
      setSuccess(true);
      // Update assignedRider immediately for UI feedback
      const found = riders.find((r) => r._id === selectedRider);
      setAssignedRider(found || null);
      // Optionally, update order.deliveredBy if you control the parent state
      order.deliveredBy = selectedRider;
      setTimeout(() => setSuccess(false), 1500);
    } catch (e) {
      console.error("Error assigning rider:", e);
      // Optionally, show an error message to the user
      alert("Failed to assign rider. Please try again.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md mb-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="font-bold text-lg text-primary">Order #{order.orderId}</span>
          <span
            className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.orderStatus]}`}
          >
            {order.orderStatus}
          </span>
        </div>
        <FaInfoCircle
          className="text-blue-500 cursor-pointer text-xl"
          title="View order details"
          onClick={() => setShowOrderDetails(!showOrderDetails)}
        />
      </div>

      {/* Customer & Type */}
      <div className="flex justify-between items-center mb-2 text-gray-700">
        <div>
          <span className="font-semibold">Customer:</span> {order.userName}
        </div>
        <div>
          <span className="font-semibold">Type:</span>{" "}
          <span className="capitalize">{order.orderType}</span>
        </div>
      </div>

      {/* Rider Assignment */}
      {order.orderType === "delivery" && (
        <div className="mt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <FaUser className="text-gray-500" />
            <span className="font-semibold">Rider:</span>
            <span className="ml-1">
              {assignedRider ? assignedRider.name : <span className="text-gray-400">Not Assigned</span>}
            </span>
            {success && (
              <span className="ml-2 text-green-600 flex items-center gap-1 text-xs">
                <FaCheckCircle /> Assigned!
              </span>
            )}
            {!["Delivered", "Cancelled", "Rejected"].includes(order.orderStatus) && (
              <>
                {!editRider ? (
                  <button
                    className="ml-3 px-2 py-1 bg-primary text-white rounded hover:bg-secondary text-xs flex items-center gap-1"
                    onClick={() => setEditRider(true)}
                  >
                    <FaExchangeAlt /> Change Rider
                  </button>
                ) : (
                  <>
                    <select
                      value={selectedRider}
                      onChange={(e) => setSelectedRider(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 text-sm mr-2"
                    >
                      <option value="">Select Rider</option>
                      {riders.map((rider) => (
                        <option key={rider._id} value={rider._id}>
                          {rider.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAssignRider}
                      className="px-3 py-1 bg-green-600 text-white rounded text-xs mr-2"
                      disabled={!selectedRider || assigning}
                    >
                      {assigning ? "Assigning..." : "Assign"}
                    </button>
                    <button
                      onClick={() => setEditRider(false)}
                      className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Show Order Details */}
      {showOrderDetails && (
        <OrderDetailsCard
          order={order}
          onClose={() => setShowOrderDetails(false)}
        />
      )}
    </div>
  );
};

export default OrderFaceCard;