import React, { useState } from "react";
import InputField from "./common/InputField";
import TextAreaField from "./common/TextAreaField";
import FileUploadField from "./common/FileUploadField";

const CategoryForm = ({ initialData = {}, onSubmit }) => {
  const [category, setCategory] = useState(initialData.category || "");
//   const [subCategory, setSubCategory] = useState(initialData.subCategory || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [file, setFile] = useState(initialData.file || null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.trim()) {
      alert("Category name is required");
      return;
    }
    // if (!subCategory.trim()) {
    //   alert("Sub Category name is required");
    //   return;
    // }

    const formData = new FormData();
    formData.append("category", category);
    // formData.append("subCategory", subCategory);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg lg:max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <InputField label="Category Name:" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
      {/* <InputField label="Sub Category Name:" id="subCategory" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} /> */}
      <TextAreaField label="Description:" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <FileUploadField label="Upload File:" id="file" onChange={(e) => setFile(e.target.files[0])} />

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition">
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
