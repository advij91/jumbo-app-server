import React from "react";

const AddonItemCard = ({ item }) => {
  return (
    <div className="border p-3 rounded-md bg-gray-100 shadow-md">
      <p className="font-medium text-gray-800">{item.name}</p>
      <p className="text-gray-600">Price: ₹{item.price}</p>
      <span
        className={`text-sm ${
          item.isDefault ? "text-green-600" : "text-gray-400"
        }`}
      >
        {item.isDefault ? "Default Option" : "Optional"}
      </span>
    </div>
  );
};

export default AddonItemCard;