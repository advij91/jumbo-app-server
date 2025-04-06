import express from "express"

import { createItem, getItems, getItemById, updateItemById, deleteItemById } from "../controllers/itemsController.mjs"
const router = express.Router();

router.post('/items', createItem)
router.get('/items', getItems)
router.get('/items/:id', getItemById)
router.patch('/items/:id', updateItemById)
router.delete('/items/:id', deleteItemById)

export default router