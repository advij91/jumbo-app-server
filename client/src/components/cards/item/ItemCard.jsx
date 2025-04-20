import React from "react";
import ItemOutletDetails from "./ItemOutletDetails";

const ItemCard = ({ item, outlets, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-row">
        <div className="w-3/5 pr-4">
          <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
          <p className="text-secondary mb-4">{item.description}</p>
          <p className="text-gray-600 mb-2">
            Ingredients: {item.ingredients.join(", ")}
          </p>
          <p className="text-gray-600 mb-2">Category: {item.category}</p>
          <p className="text-gray-600 mb-2">Labels: {item.labels.join(", ")}</p>
        </div>
        <div className="w-2/5">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-42 object-cover rounded-md mb-4"
          />
        </div>
      </div>
      <ItemOutletDetails item={item} outlets={outlets} />
      <div className="flex justify-between">
        <button
          onClick={() => onEdit(item._id)}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
