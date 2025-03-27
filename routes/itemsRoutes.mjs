import express from "express"

import { createItems, getItems, updateItemById, deleteItemById} from "../controllers/itemsController.mjs"

const router = express.Router();

router.post('/items', createItems)
router.get('/items', getItems)
router.patch('/items/:id', updateItemById)
router.delete('/items/:id', deleteItemById)

export default router