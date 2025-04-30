import React, { useState } from "react";

const AddonItemEditModal = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
        return;
    }
    if (!price.trim()) {
        alert("Price is required");
        return;
    }
    onSubmit({ name, price: parseFloat(price) });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
      >
        Add Item
      </button>
    </div>
  );
};

export default AddonItemEditModal;