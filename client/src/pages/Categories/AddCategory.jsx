import React from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../services/categoriesService";

import CategoryForm from "../../components/CategoryForm";
import Header from "../../components/Header";

const AddCategory = () => {
  const navigate = useNavigate();
  const handleSubmit = async (categoryData) => {
    try {
      await createCategory(categoryData);
      navigate("/categories"); // Redirect to the categories page after successful creation
    } catch (err) {
      console.error(err);
      alert("Error creating category. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Category</h1>
        <CategoryForm onSubmit={handleSubmit} />
      </main>
    </>
  );
};

export default AddCategory;
