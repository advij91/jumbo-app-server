"use client";
import React, { useState, useEffect } from "react";
import { getOutlets } from "../../../services/outletService";
import { useNavigate } from "react-router-dom";
import {
  getMenuItems,
  deleteMenuItem,
} from "../../../services/menuItemService";
import Header from "../../components/Header";
import SectionHeader from "../../components/common/SectionHeader";
import ItemsList from "../../components/cards/item/ItemsList";

const Items = () => {
  const [menuItems, setMenuItems] = useState([]);
  // const [groupedItems, setGroupedItems] = useState({});
  const [outlets, setOutlets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items); // Handle the fetched menu items as needed
        // setGroupedItems(Object.groupBy(items, (item) => item.category)) // Group items by category
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

  const groupedItems = Object.groupBy(menuItems, (item) => item.category); // Group items by category
  const categories = Object.keys(groupedItems).toSorted(); // Get the unique categories

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-4">Menu Items</h1>
          <button
            onClick={handleAddNewItem}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
          >
            Add New Item
          </button>
        </div>
        {categories &&
          categories.map((category) => (
            <div key={category}>
              <SectionHeader text={category} />
              <ItemsList
                items={groupedItems[category].toSorted()}
                outlets={outlets}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Items;
