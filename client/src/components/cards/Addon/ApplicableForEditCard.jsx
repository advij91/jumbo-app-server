import React from "react";
import { FiTrash2 } from "react-icons/fi"; // Import trash icon

const ApplicableForEditCard = ({ item, onDelete }) => {
  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to remove "${item.name}"?`);
    if (confirmed) {
      onDelete(item._id); // Call the onDelete function with the item's ID
    }
  };

  return (
    <div className="flex justify-between items-center border p-3 rounded-md bg-gray-100 shadow-md mb-2">
      <div>
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-sm text-gray-500">Category: {item.category}</p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 transition"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  );
};

export default ApplicableForEditCard;