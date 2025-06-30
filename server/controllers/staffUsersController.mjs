import StaffUser from '../models/StaffUser.mjs';

export const getStaffUsers = async (req, res) => {
    try {
        const staffUsers = await StaffUser.find();
        res.status(200).json(staffUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getStaffUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const staffUser = await StaffUser.findById(id);
        if (!staffUser) {
            return res.status(404).json({ message: 'Staff user not found' });
        }
        res.status(200).json(staffUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getStaffUsersByOutletsId = async (req, res) => {
    const { outletId } = req.params;
    try {
        const staffUsers = await StaffUser.find({ outlets: outletId });
        res.status(200).json(staffUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getRidersByOutletId = async (req, res) => {
    const { outletId } = req.params;
    try {
        const riders = await StaffUser.find({ outlets: outletId, role: 'Rider' });
        res.status(200).json(riders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}