import Customer from "../models/Customer.mjs"; // Import the Customer model
import mongoose from "mongoose";

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find(); // Retrieve all customers
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

// Get a specific customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params; // Extract customer ID from request params
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};

// Get customer by loginId
export const getCustomerByLoginId = async (req, res) => {
    try {
      const { id } = req.params; // Extract loginId from request parameters
      const customer = await Customer.findOne({ loginId: id }); // Query the database for a matching loginId
  
      if (!customer) {
        return res.status(404).json({ message: "Customer not found with this loginId" });
      }
  
      res.status(200).json(customer); // Send the customer data as a response
    } catch (error) {
      res.status(500).json({ message: "Error fetching customer by loginId", error });
    }
  };

// Add a new customer
export const addCustomer = async (req, res) => {
  try {
    let customerData = req.body; // Get customer data from request body
    
    // Validate and filter contacts
    if (customerData.contacts) {
      customerData.contacts = customerData.contacts.filter(
        (contact) => contact.type && contact.value
      ); // Filter out invalid or empty contacts
    // add id if not added alreay
    customerData.contacts = customerData.contacts.map(contact => ({
      ...contact,
      _id: contact._id || new mongoose.Types.ObjectId(),
      isVerified: contact.isVerified || false
    }))
    }
    console.log(customerData.contacts)
    // Validate and set default values for addresses
    if (customerData.addresses) {
      customerData.addresses = customerData.addresses.map((address) => ({
        ...address,
        _id: address._id || new mongoose.Types.ObjectId(),
        isDefault: address.isDefault || false,
      }));
    }

    const newCustomer = new Customer(customerData);
    await newCustomer.save(); // Save the customer in the database

    // Fetch saved customer to ensure `_id` generation for subdocuments
    const savedCustomer = await Customer.findById(newCustomer._id);

    res.status(201).json({
      message: "Customer added successfully",
      data: savedCustomer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding customer",
      error: error.message,
    });
  }
};


// Update an existing customer
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params; // Extract customer ID from request params
    const updatedData = req.body; // Get updated data from request body

    const updatedCustomer = await Customer.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validation on updates
    });

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer updated successfully", data: updatedCustomer });
  } catch (error) {
    res.status(400).json({ message: "Error updating customer", error });
  }
};

export const addCustomerAddress = async (req, res) => {
  try {
    const { id } = req.params; // Extract customer ID from request params
    const { address } = req.body; // Get address data from request body

    // Validate and set default values for the new address
    const newAddress = {
      ...address,
      _id: address._id || new mongoose.Types.ObjectId(),
      isDefault: address.isDefault || false,
    };

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { $push: { addresses: newAddress } }, // Add new address to the addresses array
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Address added successfully", data: updatedCustomer });
  } catch (error) {
    res.status(400).json({ message: "Error adding address", error });
  }
}

// Update an existing customer address
export const updateCustomerAddress = async (req, res) => {
  try {
    const { id, addressId } = req.params; // Extract customer ID and address ID from request params
    const updatedAddressData = req.body; // Get updated address data from request body

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: id, "addresses._id": addressId }, // Find customer and specific address
      { $set: { "addresses.$": updatedAddressData } }, // Update the specific address
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer or address not found" });
    }

    res.status(200).json({ message: "Address updated successfully", data: updatedCustomer });
  } catch (error) {
    res.status(400).json({ message: "Error updating address", error });
  }
};

// Delete a customer by ID
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params; // Extract customer ID from request params
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully", deletedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
};
