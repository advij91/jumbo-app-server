import React, { useState, useEffect } from "react";
import { getCategories } from "../../../../services/categoriesService";
import { getMenuItems } from "../../../../services/menuItemService";

const ApplicableForEditModal = ({ existingItems, onSubmit }) => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]); // Fetch items based on category
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategory(response);
      if (response.length > 0) {
        setSelectedCategory(response[0].category); // Set the first category as default
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return; // If no category is selected, do nothing
    const fetchItems = async () => {
      const response = await getMenuItems();
      const filteredItems = response.filter(
        (item) => (item.category === selectedCategory) && (!existingItems.some(existingItem => existingItem._id === item._id))
        );
      setItems(filteredItems);
    };
    fetchItems();
  }, [selectedCategory, existingItems]);

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedItems);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          {category.map((cat) => (
            <option key={cat._id} value={cat.category}>
              {cat.category}
            </option>
          ))}
          {/* <option value="category1">Category 1</option>
          <option value="category2">Category 2</option> */}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            onClick={() => toggleItemSelection(item)}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedItems.includes(item)
                ? "border-primary bg-primary-light"
                : "border-gray-300"
            }`}
          >
            <p>{item.name}</p>
            {selectedItems.includes(item) && (
              <div className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-1">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
      >
        Add Selected Items
      </button>
    </div>
  );
};

export default ApplicableForEditModal;
