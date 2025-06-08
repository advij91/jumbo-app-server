import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleMapView from "../../GoogleMapView";
import OutletOperationsCard from "./OutletOperationsCard";
import { updateOutlet } from "../../../../services/outletService";

const OutletCard = ({ outlet, onDelete, onOperationsUpdate }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/outlets/${outlet._id}`);
  };

  const handleOperationsUpdate = async (updatedOrderTypes) => {
    try {
      const updatedOutlet = await updateOutlet(outlet._id, {
        orderTypes: updatedOrderTypes,
      });
      onOperationsUpdate(updatedOutlet);
    } catch (error) {
      console.error("Failed to update outlet operations:", error);
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded border border-light flex flex-col gap-2">
      <h2 className="text-xl font-semibold text-primary">{outlet.name}</h2>
      <p className="text-secondary">{outlet.address}</p>
      <p className="text-secondary">
        {outlet.city}, {outlet.state} {outlet.pin}
      </p>
      <p className="text-secondary">Contact: {outlet.contact}</p>
      <div className="w-full md:w-72 h-48 rounded overflow-hidden border border-gray-200 shadow-sm mt-2">
        {outlet.location?.coordinates && (
          <GoogleMapView
            latitude={outlet.location.coordinates[1]}
            longitude={outlet.location.coordinates[0]}
            zoom={14}
          />
        )}
      </div>
      <OutletOperationsCard
        outlet={outlet}
        onOperationsUpdate={handleOperationsUpdate}
      />
      <div className="flex gap-2 mt-2">
        <button
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
          onClick={() => handleEdit()}
        >
          Edit
        </button>
        <button
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
          onClick={() => onDelete && onDelete(outlet._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OutletCard;
