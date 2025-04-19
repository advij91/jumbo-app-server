import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryForm from "../../components/CategoryForm";
import {
  getCategoryById,
  updateCategory,
} from "../../../services/categoriesService";
import Header from "../../components/Header";

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      if (id) {
        const data = await getCategoryById(id);
        setCategory(data);
      }
    }
    fetchCategories();
  }, [id]);

  const handleSubmit = async (categoryData) => {
    await updateCategory(id, categoryData);
    navigate("/categories");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-primary mb-6">Edit Category</h1>
        {category ? (
          <CategoryForm onSubmit={handleSubmit} initialData={category} />
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </main>
    </>
  );
}
