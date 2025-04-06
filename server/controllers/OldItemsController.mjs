// import Item from '../models/Item.mjs';
// import mongoose from 'mongoose';

// // Add new items
// // Middleware to ensure object ID is added to each item if not already present
// const ensureObjectId = (items) => {
//   return items.map(item => {
//     if (!item._id) {
//       item._id = new mongoose.Types.ObjectId();
//     }
//     return item;
//   });
// };
// export const createItems = async (req, res) => {

//       const { items } = req.body; // Expecting an array of items
    
//       if (!items || !Array.isArray(items)) {
//         return res.status(400).json({ message: 'Invalid input. An array of items is required.' });
//       }
//       try {
//         // Ensure each item has a unique ObjectId
//         const itemsWithObjectId = items.map(item => item.outletDetails.map(outlet => ({
//           ...outlet, _id: outlet._id || new mongoose.Types.ObjectId()
//         })));
//         const savedItems = await Item.insertMany(itemsWithObjectId); // Inserts all items at once
//         res.status(201).json({ message: 'Items added successfully!', items: savedItems });
//       } catch (error) {
//         console.error('Error adding multiple items:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     };

// // Get all items
// export const getItems = async (req, res) => {
//   try {
//     const items = await Item.find({});
//     res.status(200).json(items);
//   } catch (error) {
//     console.error('Error retrieving items:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Get a single item by ID
// export const getItemById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const item = await Item.findById(id);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found.' });
//     }

//     res.status(200).json(item);
//   } catch (error) {
//     console.error('Error retrieving item:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Update an item by ID
// export const updateItemById = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, category, imageUrl } = req.body;

//   try {
//     const updatedItem = await Item.findByIdAndUpdate(
//       id,
//       { name, description, category, imageUrl },
//       { new: true, runValidators: true } // Returns the updated document and applies validation
//     );

//     if (!updatedItem) {
//       return res.status(404).json({ message: 'Item not found.' });
//     }

//     res.status(200).json({ message: 'Item updated successfully!', item: updatedItem });
//   } catch (error) {
//     console.error('Error updating item:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Delete an item by ID
// export const deleteItemById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedItem = await Item.findByIdAndDelete(id);
//     if (!deletedItem) {
//       return res.status(404).json({ message: 'Item not found.' });
//     }

//     res.status(200).json({ message: 'Item deleted successfully!' });
//   } catch (error) {
//     console.error('Error deleting item:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
