import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAddons, deleteAddon } from "../../../services/addonsService";

import Header from "../../components/Header";
import AddonCard from "../../components/cards/Addon/AddonCard";

const Addons = () => {
  const [addonData, setAddonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAddons();
        setAddonData(response.data);
      } catch (error) {
        setError("Failed to fetch addons.");
        console.error("Error fetching addons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNewAddon = () => {
    navigate("/addons/add");
  };

  const handleEditAddon = (id) => {
    navigate(`/addons/${id}`);
  };

  const handleDeleteAddon = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this addon?"
    );
    if (confirmed) {
      try {
        await deleteAddon(id);
        setAddonData((prevAddons) =>
          prevAddons.filter((addon) => addon._id !== id)
        );
      } catch (error) {
        console.error("Error deleting addon:", error);
        setError("Failed to delete addon.");
      }
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading Add-ons...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-4">Addons</h1>
          <button
            onClick={handleNewAddon}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
          >
            Add New Addon
          </button>
        </div>
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
          {addonData.map((addon) => (
            <AddonCard
              key={addon._id}
              addon={addon}
              onEdit={handleEditAddon}
              onDelete={handleDeleteAddon}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Addons;