import React, { useState } from "react";
import Modal from "../components/common/Modal";
import AddonItemEditModal from "./cards/Addon/AddonItemEditModal";
import ApplicableForEditModal from "./cards/Addon/ApplicablForEditModal";
// import AddonItemEditModal from "./AddonItemModal";
import AddonItemEditCard from "./cards/Addon/AddonItemEditCard";
import ApplicableForEditCard from "./cards/Addon/ApplicableForEditCard";
import SectionHeader from "./common/SectionHeader";

const AddonForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData.name || "");
  const [addonCategory, setAddonCategory] = useState(
    initialData.addonCategory || ""
  );
  const [addonItems, setAddonItems] = useState(initialData.addonItems || []);
  const [applicableFor, setApplicableFor] = useState(
    initialData.applicableFor || []
  );
  const [isAddonItemModalOpen, setAddonItemModalOpen] = useState(false);
  const [isApplicableForModalOpen, setApplicableForModalOpen] = useState(false);
  const [isMultiAddonSelection, setIsMultiAddonSelection] = useState(
    initialData.isMultiAddonSelection || false
  );

  const handleAddonItemAdd = (newItem) => {
    setAddonItems([...addonItems, newItem]);
    setAddonItemModalOpen(false);
  };

    const handleApplicableForAdd = (newItems) => {
      setApplicableFor([...applicableFor, ...newItems]);
      setApplicableForModalOpen(false);
    };

  const handleToggleDefault = (id) => {
    setAddonItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === id) {
          // Toggle the selected item's default status
          return { ...item, isDefault: !item.isDefault };
        } else if (!isMultiAddonSelection && item.isDefault) {
          // If multi-addon selection is false, unset the previous default
          return { ...item, isDefault: false };
        }
        return item;
      })
    );
  };

  const handleToggleMultiAddonSelection = (checked) => {
    if (checked) {
      setIsMultiAddonSelection(checked);
    } else {
      // If unchecking, ensure that exactly one item is set as default
      // If there are no default items, do not allow unchecking and show alert Exactly one item should be set as default
      // If there are multiple default items, do not allow unchecking and show alert
      // If there is one default item, allow unchecking and set isMultiAddonSelection to false
      const defaultItems = addonItems.filter((item) => item.isDefault);
      if (defaultItems.length === 1) {
        setIsMultiAddonSelection(checked);
      } else {
        alert("Exactly one item should be set as default");
        setIsMultiAddonSelection(true); // Revert back to true
      }
    }
  };

  const handleAddonItemDelete = (name) => {
    setAddonItems((prevItems) =>
      prevItems.filter((item) => item.name !== name)
    );
  };

  const handleApplicableForDelete = (id) => {
    setApplicableFor((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      addonCategory,
      addonItems,
      applicableFor,
      isMultiAddonSelection,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-4xl max-w-lg lg:max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Addon Category</label>
        <input
          type="text"
          value={addonCategory}
          onChange={(e) => setAddonCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <SectionHeader text="Addon Items" />
        <button
          type="button"
          onClick={() => setAddonItemModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary mb-4"
        >
          Add Addon Item
        </button>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {addonItems.map((item) => (
            <AddonItemEditCard
              key={item.name}
              item={item}
              isMultiAddonSelection={isMultiAddonSelection}
              onToggleDefault={handleToggleDefault}
              onDelete={handleAddonItemDelete}
            />
          ))}
        </div>
      </div>
      <div className="mb-4 mr-3">
        <label className="block text-gray-700 font-bold flex items-center justify-end">
          Allow Multiple Addon Selection?
          <input
            type="checkbox"
            checked={isMultiAddonSelection}
            onChange={(e) => handleToggleMultiAddonSelection(e.target.checked)}
            // onChange={(e) => setIsMultiAddonSelection(e.target.checked)}
            className="form-checkbox h-5 w-5 text-primary ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <SectionHeader text="Applicable For" />
        <button
          type="button"
          onClick={() => setApplicableForModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary mb-4"
        >
          Add Applicable For
        </button>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {applicableFor.map((item) => (
            <ApplicableForEditCard key={item._id}  item={item} onDelete={handleApplicableForDelete} />
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
        >
          Save
        </button>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isAddonItemModalOpen}
        onClose={() => setAddonItemModalOpen(false)}
        title="Add Addon Item"
      >
        <AddonItemEditModal onSubmit={handleAddonItemAdd} />
      </Modal>
      <Modal
        isOpen={isApplicableForModalOpen}
        onClose={() => setApplicableForModalOpen(false)}
        title="Add Applicable For"
      >
        <ApplicableForEditModal
          existingItems={applicableFor}
          onSubmit={handleApplicableForAdd}
        />
      </Modal>
    </form>
  );
};

export default AddonForm;
