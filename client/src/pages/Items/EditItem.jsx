import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuItemById, updateMenuItem } from '../../../services/menuItemService';
import ItemForm from '../../components/ItemForm';

const EditItem = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getMenuItemById(id);
        setItem(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (updatedItem) => {
    try {
      await updateMenuItem(id, updatedItem);
      navigate('/items');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Item</h1>
      <ItemForm item={item} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditItem;