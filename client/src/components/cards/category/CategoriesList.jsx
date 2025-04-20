import CategoryCard from "./CategoryCard";

const CategoriesList = ({ categories, onEdit, onDelete }) => {
  const sortedCategories = [...categories].sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedCategories.map((category) => (
        <CategoryCard key={category._id} category={category} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CategoriesList;
