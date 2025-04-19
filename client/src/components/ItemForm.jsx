import React, { use, useEffect, useState } from "react";
import { getOutlets } from "../../services/outletService";
import { getCategories } from "../../services/categoriesService";

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
    file: null
  });

  const [ outlets, setOutlets ] = useState([]);
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    const fetchOutlets = async () => {
        try {
            const outletsData = await getOutlets();
            setOutlets(outletsData);
        } catch (error) {
            console.error("Error fetching outlets:", error);
        }
    };
    fetchOutlets();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                categoriesData.sort((a, b) => a.category.localeCompare(b.category));
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
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
    updatedData.append("name", formData.name);
    updatedData.append("description", formData.description);
    updatedData.append(
      "ingredients",
      formData.ingredients.split(",").map((i) => i.trim())
    );
    updatedData.append("category", formData.category);
    updatedData.append(
      "labels",
      formData.labels.split(",").map((l) => l.trim())
    );
    updatedData.append("isVeg", formData.isVeg);
    updatedData.append(
      "outletDetails",
      JSON.stringify(formData.outletDetails) // Stringify outletDetails
    );
    if (formData.file) {
      updatedData.append("file", formData.file); // Add the file to FormData
    }
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
                    setFormData({ ...formData, outletDetails: updatedOutletDetails});
                }}
                className="w-full border rounded px-3 py-2"
            />
        </div>
    );
});

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Ingredients</label>
        <input
          type="text"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.category}>{category.category}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Labels</label>
        <input
          type="text"
          name="labels"
          value={formData.labels}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Is Vegetarian</label>
        <select
          name="isVeg"
          value={formData.isVeg}
          onChange={(e) =>
            setFormData({ ...formData, isVeg: e.target.value === "true" })
          }
          className="w-full border rounded px-3 py-2"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Outlet Details</label>
        {outletDetailData}
        
    </div>

    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Image</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
    
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