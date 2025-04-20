import React from 'react'
import ItemCard from './ItemCard';

const ItemsList = ({ items, outlets, onEdit, onDelete }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} outlets={outlets} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    );
  };
  
export default ItemsList