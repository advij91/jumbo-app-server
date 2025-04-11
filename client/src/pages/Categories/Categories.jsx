import React, { useState, useEffect } from "react";
import {
  getCategories,
  deleteCategory
} from "../../../services/categoriesService";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories); // Handle the fetched categories as needed
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  
  const handleAddNewCategory = () => {
    navigate("/categories/add"); // Navigate to the "Add New Category" page
  };

  const handleEditCategory = (id) => {
    navigate(`/categories/${id}`); // Navigate to the "Edit Category" page
  };
  const handleDeleteCategory = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      try {
        await deleteCategory(id); // Call the delete API
        setCategories(categories.filter((category) => category._id !== id)); // Remove the deleted category from the state
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between categorys-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button
          onClick={handleAddNewCategory}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          Add New Category
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-row it">
              <div className="w-3/5 pr-4">
                <h2 className="text-xl font-semibold mb-2">{category.category}</h2>
                <p className="text-gray-600 mb-2">Sub Category: {category.subCategory}</p>
              <p className="text-gray-600 mb-2">Description: {category.description}</p>
              </div>
              <div className="w-2/5">
                <img
                  src={category.imageUrl} // Use the imageUrl from the backend
                  alt={category.category}
                  className="w-full h-42 object-cover rounded-md mb-4"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleEditCategory(category._id ?? "")}
                className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category._id ?? "")}
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

export default Categories;
