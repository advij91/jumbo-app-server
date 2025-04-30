import React from "react";
import { useNavigate } from "react-router-dom";
import { createAddon } from "../../../services/addonsService";

import AddonForm from "../../components/AddonForm";
import Header from "../../components/Header";

const AddAddon = () => {
  const navigate = useNavigate();

  const handleSubmit = async (addonData) => {
    try {
      await createAddon(addonData);
      navigate("/addons"); // Redirect to the addons list page after successful creation
    } catch (err) {
      console.error(err);
      alert("Error creating addon. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/addons"); // Redirect to the addons list page if the user cancels
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Addon</h1>
        <AddonForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </main>
    </>
  );
};

export default AddAddon;