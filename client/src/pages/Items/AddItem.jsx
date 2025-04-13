import React from "react";
import { useNavigate } from "react-router-dom";

import { uploadMenuItem } from "../../../services/menuItemService";

import ItemForm from "../../components/ItemForm";
import Header from "../../components/Header";

const AddItem = () => {
  const navigate = useNavigate();

  const handleSubmit = async (newItem) => {
    try {
      await uploadMenuItem(newItem);
      navigate("/items");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h1 className="text-3xl font-bold mb-6">Add New Item</h1>
        <ItemForm onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default AddItem;
