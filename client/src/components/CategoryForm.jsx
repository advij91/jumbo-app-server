import React, { useState } from 'react';

const CategoryForm = ({ initialData = {}, onSubmit }) => {
    const [category, setCategory] = useState(initialData.category || '');
    const [subCategory, setSubCategory] = useState(initialData.subCategory || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [file, setFile] = useState(initialData.file || null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category.trim()) {
            alert('Category name is required');
            return;
        }
        if (!subCategory.trim()) {
            alert('Sub Category name is required');
            return;
        }

        const formData = new FormData();
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('description', description);
        if (file) {
            formData.append('file', file);
        }

        onSubmit(formData);

    }
    return (
        <form onSubmit={handleSubmit}
        className ='w-full max-w-lg lg:max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category Name:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">Sub Category Name:</label>
                <input
                    type="text"
                    id="subCategory"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File:</label>
                <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type='submit'
                className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
            >
                Add Category
            </button>
        </form>
    )
}

export default CategoryForm;