"use client";
import React, { useState, useEffect } from "react";
import {
  getMenuItems,
  deleteMenuItem,
} from "../../../services/menuItemService";
import { getOutlets } from "../../../services/outletService";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items); // Handle the fetched menu items as needed
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const outlets = await getOutlets();
        setOutlets(outlets); // Handle the fetched outlets as needed
      } catch (error) {
        console.error("Error fetching outlets:", error);
      }
    };
    fetchOutlets();
  }, []);


  const handleAddNewItem = () => {
    navigate("/items/add"); // Navigate to the "Add New Item" page
  };

  const handleEditItem = (id) => {
    navigate(`/items/${id}`); // Navigate to the "Edit Item" page
  };
  const handleDeleteItem = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      try {
        await deleteMenuItem(id); // Call the delete API
        setMenuItems(menuItems.filter((item) => item._id !== id)); // Remove the deleted item from the state
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Items</h1>
        <button
          onClick={handleAddNewItem}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          Add New Item
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-row it">
              <div className="w-3/5 pr-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-secondary mb-4">{item.description}</p>
                <p className="text-gray-600 mb-2">Ingredients: {item.ingredients.join(", ")}</p>
              <p className="text-gray-600 mb-2">Category: {item.category}</p>
              <p className="text-gray-600 mb-2">Labels: {item.labels.join(", ")}</p>
              </div>
              <div className="w-2/5">
                <img
                  src={item.imageUrl} // Use the imageUrl from the backend
                  alt={item.name}
                  className="w-full h-42 object-cover rounded-md mb-4"
                />
              </div>
            </div>
            <div className="list-disc mb-4">
              {item.outletDetails.map((outletDetail) => (
                // Check if the outletDetail's outletId exists in the outlets array
                // and render the outlet name and availability status with price
                outlets.some(outlet => outlet._id === outletDetail.outletId) && (
                <div key={outletDetail.outletId} className="mb-2">
                  <span className="font-semibold"></span>
                  <span className="font-semibold">{outlets.find(outlet => outlet._id === outletDetail.outletId)?.name}</span>:{" "}
                  <span>{outletDetail.isAvailable ? "Available" : "Not Available"}</span>
                  <br />
                  <span>Price: ₹{outletDetail.price}</span>
                  </div>
               )))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleEditItem(item._id ?? "")}
                className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteItem(item._id ?? "")}
                className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
