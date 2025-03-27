import express from "express";
import {
  getAllCustomers,
  getCustomerById,
  getCustomerByLoginId,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customersController.mjs";

const router = express.Router();

router.get("/customers", getAllCustomers); // Route to get all customers
router.get("/customers/:id", getCustomerById); // Route to get a specific customer by ID
router.get("/customers/loginId/:id", getCustomerByLoginId); // Route to get a specific customer by ID
router.post("/customers", addCustomer); // Route to add a new customer
router.put("/customers/:id", updateCustomer); // Route to update a customer by ID
router.delete("/customers/:id", deleteCustomer); // Route to delete a customer by ID

export default router;
