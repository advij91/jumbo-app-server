const CategoryCard = ({ category, onEdit, onDelete }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
        <div className="flex flex-row">
          <div className="w-3/5 pr-4">
            <h2 className="text-xl font-semibold mb-2">{category.category}</h2>
            <p className="text-gray-600 mb-2">Description: {category.description}</p>
          </div>
          <div className="w-2/5">
            <img
              src={category.imageUrl} 
              alt={category.category}
              className="w-full h-42 object-cover rounded-md mb-4"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => onEdit(category._id)} className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition">
            Edit
          </button>
          <button onClick={() => onDelete(category._id)} className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition">
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default CategoryCard;
  