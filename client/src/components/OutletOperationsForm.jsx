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
  initialETAInMinutes = {},
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
  const [ETAInMinutes, setETAInMinutes] = useState({
    prepTime: initialETAInMinutes.prepTime || 20,
    otherTime: initialETAInMinutes.otherTime || 0,
  });

  const handleETAChange = (e) => {
    const { name, value } = e.target;
    setETAInMinutes((prevETA) => ({
      ...prevETA,
      [name]: value,
    }));
  };

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
      deliveryRadiusInKm: Number(deliveryRestrictions.deliveryRadiusInKm)
    },
      {
        prepTime: Number(ETAInMinutes.prepTime),
        otherTime: Number(ETAInMinutes.otherTime),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4">
        <label className="block font-semibold text-primary mb-3">
          Set Total Order Prep Time
        </label>
        <div className="flex gap-2">
          <div className="flex flex-col min-w-[80px]">
            <label className="text-xs text-gray-600 mb-1">Prep Time (min)</label>
            <input
              type="number"
              name="prepTime"
              min={0}
              value={ETAInMinutes.prepTime || ""}
              onChange={handleETAChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col min-w-[80px]">
            <label className="text-xs text-gray-600 mb-1">Other Time (min)</label>
            <input
              type="number"
              name="otherTime"
              min={0}
              value={ETAInMinutes.otherTime || ""}
              onChange={handleETAChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
      {Object.entries(orderTypes).map(([type, config]) => (
        <div key={type} className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:mb-0">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-semibold text-primary text-base">
              {ORDER_TYPE_LABELS[type] || type}
            </span>
            <label className="flex items-center gap-2 text-xs font-medium">
              <input
                type="checkbox"
                checked={config.enabled !== false}
                onChange={() => handleEnabledToggle(type)}
                className="accent-primary"
              />
              Enabled
            </label>
            <label className="flex items-center gap-2 text-xs font-medium">
              <input
                type="checkbox"
                checked={!!config.suspend}
                onChange={() => handleSuspendToggle(type)}
                disabled={config.enabled === false}
                className="accent-secondary"
              />
              Suspend
            </label>
          </div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {WEEK_DAYS.map((day) => {
              const isActive = config.workingDays?.includes(day);
              return (
                <button
                  type="button"
                  key={day}
                  className={`px-3 py-1 rounded text-xs font-semibold border transition ${
                    isActive
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-100 text-gray-400 border-gray-300"
                  }`}
                  onClick={() => handleDayToggle(type, day)}
                  disabled={config.enabled === false || config.suspend}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-6 mb-3">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Open
              </label>
              <input
                type="time"
                value={config.open || ""}
                onChange={(e) => handleTimeChange(type, "open", e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                disabled={config.enabled === false || config.suspend}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Close
              </label>
              <input
                type="time"
                value={config.close || ""}
                onChange={(e) => handleTimeChange(type, "close", e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                disabled={config.enabled === false || config.suspend}
              />
            </div>
          </div>
          {type === "delivery" && (
            <div className="border-t pt-4 mt-4">
              <h4 className="font-semibold text-primary mb-3">
                Delivery Restrictions
              </h4>
              <div className="flex flex-col mb-3">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Allowed Pin Codes (comma separated)
                </label>
                <input
                  type="text"
                  name="allowedPinCodes"
                  value={deliveryRestrictions.allowedPinCodes}
                  onChange={handleDeliveryRestrictionsChange}
                  placeholder="e.g. 560001,560002"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col mb-3">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Delivery Radius (km)
                </label>
                <input
                  type="number"
                  name="deliveryRadiusInKm"
                  value={deliveryRestrictions.deliveryRadiusInKm}
                  onChange={handleDeliveryRestrictionsChange}
                  min={0}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded font-medium hover:bg-gray-300 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-5 py-2 rounded font-medium hover:bg-secondary transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}