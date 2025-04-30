import React from "react";
import SectionHeader from "../../../components/common/SectionHeader"
import AddonItemCard from "./AddonItemCard";
import ApplicableItemCard from "./ApplicableItemCard";

const AddonCard = ({ addon, onEdit, onDelete }) => {
  return (
    <div className="mb-6 border-b pb-4">
      <SectionHeader text={addon.name} />
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">
          Category:{" "}
          <span className="text-3xl font-bold text-primary">
            {addon.addonCategory}
          </span>
        </p>
      </div>

      {/* Addon Items */}
      <div className="mt-3">
        <h4 className="text-lg font-semibold text-gray-700">Addon Items:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {addon.addonItems.map((item) => (
            <AddonItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Applicable Items */}
      {addon.applicableFor && addon.applicableFor.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-700">
            Applicable For:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {addon.applicableFor.map((item) => (
              <ApplicableItemCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(addon._id)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          Edit Addon
        </button>
        <button
          onClick={() => onDelete(addon._id)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          Delete Addon
        </button>
      </div>
    </div>
  );
};

export default AddonCard;