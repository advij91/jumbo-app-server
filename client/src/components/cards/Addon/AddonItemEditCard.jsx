import React from "react";
import { FiTrash2 } from "react-icons/fi"; // Import trash icon

const AddonItemEditCard = ({ item, isMultiAddonSelection, onToggleDefault, onDelete }) => {
  const handleToggle = () => {
    onToggleDefault(item.name);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to remove "${item.name}"?`);
    if (confirmed) {
      onDelete(item.name);
    }}

  return (
    <div className={`flex justify-between items-center border p-3 rounded-md bg-gray-100 shadow-md mb-2 ${item.isDefault ? "bg-green-100" : ""}`}>
      <div>
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-gray-600">Price: ₹{item.price}</p>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-gray-700">Default</label>
        <input
          type="checkbox"
          checked={item.isDefault}
          onChange={handleToggle}
          className="form-checkbox h-5 w-5 text-primary"
          disabled={!isMultiAddonSelection && item.isDefault}
        />
        <button onClick={handleDelete} className="text-red-600 hover:text-red-800 transition">
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default AddonItemEditCard;