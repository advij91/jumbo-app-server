import React, { useState } from "react";
import OutletOperationsForm from "../../OutletOperationsForm";
import Modal from "../../common/Modal";

const ORDER_TYPE_LABELS = {
  dineIn: "Dine-In",
  takeAway: "Take-Away",
  delivery: "Delivery",
  inCar: "In-Car",
};

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function OutletOperationsCard({ outlet, onOperationsUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [localOrderTypes, setLocalOrderTypes] = useState(outlet.orderTypes);
  const [localDeliveryRestrictions, setLocalDeliveryRestrictions] = useState(outlet.deliveryRestrictions);

  if (!outlet) return null;

  const { suspendAll } = outlet;

  // Handler for saving changes
  const handleSave = async (updatedOrderTypes, updatedDeliveryRestrictions) => {
    setShowModal(false);
    setLocalOrderTypes(updatedOrderTypes);
    setLocalDeliveryRestrictions(updatedDeliveryRestrictions);
    // Call parent handler to update in DB or parent state
    if (onOperationsUpdate) {
      await onOperationsUpdate(updatedOrderTypes, updatedDeliveryRestrictions);
    }
  };

  return (
    <>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-primary">Outlet Operations</h3>
          <button
            className="bg-primary text-white px-4 py-1 rounded hover:bg-secondary text-sm"
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>
        </div>
        {suspendAll ? (
          <div className="text-red-600 font-bold mb-2">All operations suspended</div>
        ) : (
          <div className="space-y-4">
            {Object.entries(localOrderTypes).map(([type, config]) => (
              <div
                key={type}
                className="border-b border-gray-200 pb-2 last:border-b-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-700">{ORDER_TYPE_LABELS[type] || type}:</span>
                  {config?.enabled === false ? (
                    <span className="text-gray-400 ml-2">Disabled</span>
                  ) : config?.suspend ? (
                    <span className="text-red-600 ml-2">Stopped</span>
                  ) : null}
                </div>
                {config?.enabled !== false && !config?.suspend && (
                  <>
                    <div className="flex items-center gap-1 mb-1">
                      {WEEK_DAYS.map((day) => {
                        const isActive = config?.workingDays?.includes(day);
                        return (
                          <span
                            key={day}
                            className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                              isActive
                                ? "bg-green-100 text-green-700 border-green-300"
                                : "bg-red-100 text-red-600 border-red-300"
                            }`}
                          >
                            {day}
                          </span>
                        );
                      })}
                    </div>
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold">Operational Hours:</span>{" "}
                      <span className="inline-block bg-gray-200 px-2 py-0.5 rounded">
                        {config?.open || "--:--"} - {config?.close || "--:--"}
                      </span>
                    </div>
                  </>
                )}
                {type === "delivery" && localDeliveryRestrictions && (
                  <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                    <h4 className="font-semibold text-primary mb-2">Delivery Restrictions</h4>
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold">Allowed Pin Codes:</span>{" "}
                      {localDeliveryRestrictions.allowedPinCodes?.length
                        ? localDeliveryRestrictions.allowedPinCodes.join(", ")
                        : <span className="text-gray-400">None</span>}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      <span className="font-semibold">Delivery Radius:</span>{" "}
                      {localDeliveryRestrictions.deliveryRadiusInKm
                        ? `${localDeliveryRestrictions.deliveryRadiusInKm} km`
                        : <span className="text-gray-400">Not set</span>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Edit Outlet Operations"
      >
        <OutletOperationsForm
          initialOrderTypes={localOrderTypes}
          initialDeliveryRestrictions={localDeliveryRestrictions}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
}