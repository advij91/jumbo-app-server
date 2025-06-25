import express from "express";
import {
  getAllCustomers,
  getCustomerById,
  getCustomerByLoginId,
  addCustomer,
  updateCustomer,
  addCustomerAddress,
  updateCustomerAddress,
  deleteCustomer,
} from "../controllers/customersController.mjs";

const router = express.Router();

router.get("/customers", getAllCustomers); // Route to get all customers
router.get("/customers/:id", getCustomerById); // Route to get a specific customer by ID
router.get("/customers/loginId/:id", getCustomerByLoginId); // Route to get a specific customer by ID
router.post("/customers", addCustomer); // Route to add a new customer
router.post("/customers/:id/address", addCustomerAddress); // Route to add an address to a customer
router.patch("/customers/:id/address/:addressId", updateCustomerAddress); // Route to update a customer's address
router.put("/customers/:id", updateCustomer); // Route to update a customer by ID
router.delete("/customers/:id", deleteCustomer); // Route to delete a customer by ID

export default router;
