import User from "../models/User.mjs"; // Assuming your schema is in a separate file

// Controller for creating a user
export const createUser = async (req, res) => {
    try {
        const { userName, userType, contact, email, authToken, refreshToken } = req.body;

        const user = new User({
            userName,
            userType,
            contact,
            email,
            authToken,
            refreshToken,
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller for getting all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

// Controller for getting a user by userName
export const getUserByContact = async (req, res) => {
    try {
        const { contact } = req.params;
        const user = await User.findOne({ contact });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for updating a user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation runs during update
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller for deleting a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
