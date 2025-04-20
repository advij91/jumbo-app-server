import React, { useEffect, useState } from "react";
import { getOutlets } from "../../services/outletService";
import { getCategories } from "../../services/categoriesService";
import InputField from "./common/InputField";
import TextAreaField from "./common/TextAreaField";
import SelectField from "./common/SelectField";
import MultiSelectDropdown from "./common/MultiSelectDropdown";
import FileUploadField from "./common/FileUploadField";

const ItemForm = ({ item = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: item.name || "",
    description: item.description || "",
    ingredients: item.ingredients?.join(", ") || "",
    category: item.category || "",
    labels: item.labels?.join(", ") || "",
    price: item.price || "",
    isVeg: item.isVeg || true,
    outletDetails: item.outletDetails || [],
    file: null,
  });

  const [outlets, setOutlets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [outletsData, categoriesData] = await Promise.all([
          getOutlets(),
          getCategories(),
        ]);
        setOutlets(outletsData);
        setCategories(
          categoriesData.sort((a, b) => a.category.localeCompare(b.category))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = new FormData(); // Use FormData for file upload
    // updatedData.append("name", formData.name);
    // updatedData.append("description", formData.description);
    // updatedData.append(
    //   "ingredients",
    //   formData.ingredients.split(",").map((i) => i.trim())
    // );
    // updatedData.append("category", formData.category);
    // updatedData.append(
    //   "labels",
    //   formData.labels.split(",").map((l) => l.trim())
    // );
    // updatedData.append("isVeg", formData.isVeg);
    // updatedData.append(
    //   "outletDetails",
    //   JSON.stringify(formData.outletDetails) // Stringify outletDetails
    // );
    // if (formData.file) {
    //   updatedData.append("file", formData.file); // Add the file to FormData
    // }
    Object.entries(formData).forEach(([key, value]) => {
      updatedData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });
    onSubmit(updatedData);
  };
  const outletDetailData = outlets.map((outlet, index) => {
    const outletDetail = formData.outletDetails.find(
      (detail) => detail.outletId === outlet._id
    ) || { outletId: outlet._id, isAvailable: false, price: "" };

    return (
      <div key={index} className="mb-2">
        <span className="font-semibold">{outlet.name}</span>:{" "}
        <select
          value={outletDetail.isAvailable ? "true" : "false"}
          onChange={(e) => {
            const updatedOutletDetails = [...formData.outletDetails];
            const existingDetailIndex = updatedOutletDetails.findIndex(
              (detail) => detail.outletId === outlet._id
            );
            if (existingDetailIndex !== -1) {
              updatedOutletDetails[existingDetailIndex].isAvailable =
                e.target.value === "true";
            } else {
              updatedOutletDetails.push({
                outletId: outlet._id,
                isAvailable: e.target.value === "true",
                price: "",
              });
            }
            setFormData({ ...formData, outletDetails: updatedOutletDetails });
          }}
          className="ml-2 border rounded px-2 py-1"
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <br />
        <label className="block text-gray-700 font-bold mt-2">Price</label>
        <input
          type="number"
          value={outletDetail.price}
          onChange={(e) => {
            const updatedOutletDetails = [...formData.outletDetails];
            const existingDetailIndex = updatedOutletDetails.findIndex(
              (detail) => detail.outletId === outlet._id
            );
            if (existingDetailIndex !== -1) {
              updatedOutletDetails[existingDetailIndex].price = e.target.value;
            } else {
              updatedOutletDetails.push({
                outletId: outlet._id,
                isAvailable: false,
                price: e.target.value,
              });
            }
            setFormData({ ...formData, outletDetails: updatedOutletDetails });
          }}
          className="w-full border rounded px-3 py-2"
        />
      </div>
    );
  });

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Ingredients (comma-separated)"
        name="ingredients"
        value={formData.ingredients}
        onChange={handleInputChange}
        required
      />
      <SelectField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        options={categories.map((cat) => ({
          value: cat.category,
          label: cat.category,
        }))}
        required
      />
      <MultiSelectDropdown
        label="Labels"
        options={[
          { value: "bestseller", label: "Bestseller" },
          { value: "new", label: "New" },
          { value: "musttry", label: "Must Try" },
        ]}
        onSelect={(selectedValues) => {
          setFormData({ ...formData, labels: selectedValues });
        }}
        selectedValues={formData.labels
          .split(", ")
          .map((label) => label.trim())}
      />
      <SelectField
        label="Is Vegetarian"
        name="isVeg"
        value={String(formData.isVeg)}
        onChange={(e) =>
          setFormData({ ...formData, isVeg: e.target.value === "true" })
        }
        options={[
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ]}
      />
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Outlet Details
        </label>
        {outletDetailData}
      </div>

      <FileUploadField
        label="Upload Image"
        name="file"
        onChange={handleFileChange}
      />

      <div className="</div>mb-4"></div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
      >
        Save
      </button>
    </form>
  );
};

export default ItemForm;
