import React, { useState } from "react";

const ORDER_TYPE_LABELS = {
  dineIn: "Dine-In",
  takeAway: "Take-Away",
  delivery: "Delivery",
  inCar: "In-Car",
};

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function OutletOperationsForm({
  initialOrderTypes,
  initialDeliveryRestrictions = {},
  onSave,
  onCancel,
}) {
  const [orderTypes, setOrderTypes] = useState(
    JSON.parse(JSON.stringify(initialOrderTypes))
  );
  const [deliveryRestrictions, setDeliveryRestrictions] = useState({
    allowedPinCodes: initialDeliveryRestrictions.allowedPinCodes?.join(",") || "",
    deliveryRadiusInKm: initialDeliveryRestrictions.deliveryRadiusInKm || 5,
  });

  const handleDayToggle = (type, day) => {
    setOrderTypes((prev) => {
      const days = prev[type].workingDays || [];
      const newDays = days.includes(day)
        ? days.filter((d) => d !== day)
        : [...days, day];
      return {
        ...prev,
        [type]: { ...prev[type], workingDays: newDays },
      };
    });
  };

  const handleTimeChange = (type, field, value) => {
    setOrderTypes((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleSuspendToggle = (type) => {
    setOrderTypes((prev) => ({
      ...prev,
      [type]: { ...prev[type], suspend: !prev[type].suspend },
    }));
  };

  const handleEnabledToggle = (type) => {
    setOrderTypes((prev) => ({
      ...prev,
      [type]: { ...prev[type], enabled: !prev[type].enabled },
    }));
  };

  const handleDeliveryRestrictionsChange = (e) => {
    const { name, value } = e.target;
    setDeliveryRestrictions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(orderTypes, {
      allowedPinCodes: deliveryRestrictions.allowedPinCodes
        .split(",")
        .map((p) => p.trim())
        .filter((p) => /^\d{6}$/.test(p)),
      deliveryRadiusInKm: Number(deliveryRestrictions.deliveryRadiusInKm),
  });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.entries(orderTypes).map(([type, config]) => (
        <div key={type} className="border-b pb-4 last:border-b-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-primary">
              {ORDER_TYPE_LABELS[type] || type}
            </span>
            <label className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={config.enabled !== false}
                onChange={() => handleEnabledToggle(type)}
              />
              Enabled
            </label>
            <label className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={!!config.suspend}
                onChange={() => handleSuspendToggle(type)}
                disabled={config.enabled === false}
              />
              Suspend
            </label>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {WEEK_DAYS.map((day) => {
              const isActive = config.workingDays?.includes(day);
              return (
                <button
                  type="button"
                  key={day}
                  className={`px-2 py-0.5 rounded text-xs font-semibold border transition ${
                    isActive
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-red-100 text-red-600 border-red-300"
                  }`}
                  onClick={() => handleDayToggle(type, day)}
                  disabled={config.enabled === false || config.suspend}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm">
              Open:
              <input
                type="time"
                value={config.open || ""}
                onChange={(e) => handleTimeChange(type, "open", e.target.value)}
                className="ml-1 border rounded px-2 py-1"
                disabled={config.enabled === false || config.suspend}
              />
            </label>
            <label className="text-sm">
              Close:
              <input
                type="time"
                value={config.close || ""}
                onChange={(e) => handleTimeChange(type, "close", e.target.value)}
                className="ml-1 border rounded px-2 py-1"
                disabled={config.enabled === false || config.suspend}
              />
            </label>
          </div>
          {type === "delivery" && (
            <div className="border-t pt-4 mt-4">
              <h4 className="font-semibold text-primary mb-2">
                Delivery Restrictions
              </h4>
              <div className="mb-3">
                <label className="block text-gray-700 font-bold mb-1">
                  Allowed Pin Codes (comma separated)
                </label>
                <input
                  type="text"
                  name="allowedPinCodes"
                  value={deliveryRestrictions.allowedPinCodes}
                  onChange={handleDeliveryRestrictionsChange}
                  placeholder="e.g. 560001,560002"
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-bold mb-1">
                  Delivery Radius (km)
                </label>
                <input
                  type="number"
                  name="deliveryRadiusInKm"
                  value={deliveryRestrictions.deliveryRadiusInKm}
                  onChange={handleDeliveryRestrictionsChange}
                  min={0}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
        >
          Save
        </button>
      </div>
    </form>
  );
}