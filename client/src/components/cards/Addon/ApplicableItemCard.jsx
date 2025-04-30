import React from "react";

const ApplicableItemCard = ({ item }) => {
  return (
    <div className="border p-3 rounded-md bg-gray-100 shadow-md">
      <p className="font-medium text-gray-800 mt-2">{item.name}</p>
      <p className="text-gray-600">{item.description}</p>
      <span className="text-sm text-gray-600">Category: {item.category}</span>
    </div>
  );
};

export default ApplicableItemCard;