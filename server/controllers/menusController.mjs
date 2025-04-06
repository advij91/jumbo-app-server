import Menu from "../models/Menu.mjs"; // Import the Menu model

/**
 * Get all menus
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getMenus = async (req, res) => {
  try {
    // Retrieve all menus from the database and populate related fields
    const menus = await Menu.find({}).populate("outlet").populate("menuDetails.item");
    return res.status(200).json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    return res.status(500).json({ message: "Error fetching menus", error });
  }
};

/**
 * Add a new menu
 * @param {Object} req - Request object containing menu data
 * @param {Object} res - Response object
 */
export const addMenu = async (req, res) => {
  try {
    const { name, outlet, labels, menuDetails } = req.body;

    // Create a new menu document
    const newMenu = new Menu({
      name,
      outlet,
      labels,
      menuDetails,
    });

    // Save the menu to the database
    const savedMenu = await newMenu.save();
    return res.status(201).json({ message: "Menu created successfully!", data: savedMenu });
  } catch (error) {
    console.error("Error adding menu:", error);
    return res.status(500).json({ message: "Error adding menu", error });
  }
};

/**
 * Update an existing menu
 * @param {Object} req - Request object containing menu ID and updated data
 * @param {Object} res - Response object
 */
export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params; // Menu ID from request parameters
    const updates = req.body; // Updated data for the menu

    // Find menu by ID and update it
    const updatedMenu = await Menu.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    return res.status(200).json({ message: "Menu updated successfully!", data: updatedMenu });
  } catch (error) {
    console.error("Error updating menu:", error);
    return res.status(500).json({ message: "Error updating menu", error });
  }
};

/**
 * Delete a menu
 * @param {Object} req - Request object containing menu ID
 * @param {Object} res - Response object
 */
export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params; // Menu ID from request parameters

    // Find menu by ID and delete it
    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    return res.status(200).json({ message: "Menu deleted successfully!", data: deletedMenu });
  } catch (error) {
    console.error("Error deleting menu:", error);
    return res.status(500).json({ message: "Error deleting menu", error });
  }
};
