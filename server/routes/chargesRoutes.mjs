import express from "express";
import { getCharges,getChargeById ,createCharge, updateCharge, deleteCharge } from "../controllers/chargesController.mjs";
const router = express.Router();

// GET all charges
router.get("/charges", getCharges);
// get a charge by ID
router.get("/charges/:id", getChargeById);
// create a new charge
router.post("/charges", createCharge);
// update a charge by ID
router.put("/charges/:id", updateCharge);
// delete a charge by ID
router.delete("/charges/:id", deleteCharge);

export default router;