import React, { useState, useEffect } from "react";
import {
  getCategories,
  deleteCategory,
} from "../../../services/categoriesService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SectionHeader from "../../components/common/SectionHeader";
import CategoriesList from "../../components/cards/category/CategoriesList";

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
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Categories</h1>
          <button
            onClick={handleAddNewCategory}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
          >
            Add New Item
          </button>
        </div>
        <CategoriesList
          categories={categories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      </div>
    </>
  );
};

export default Categories;
