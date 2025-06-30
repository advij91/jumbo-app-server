import express from "express";
import {
  getStaffUsers,
  getStaffUserById,
  getStaffUsersByOutletsId,
  getRidersByOutletId,
} from "../controllers/staffUsersController.mjs";
import { authenticate } from "../middleware/authenticate.mjs";
import { authorize } from "../middleware/authorize.mjs";

const router = express.Router();

// Protect with authenticate + authorize (Owner, Admin, HumanResource)
router.get(
  "/staff-users",
  authenticate,
  authorize(["Owner", "Admin"], []),
  getStaffUsers
);
router.get(
  "/staff-users/:id",
  authenticate,
  authorize(["Owner", "Admin"], []),
  getStaffUserById
);
router.get(
  "/staff-users/outlet/:outletId",
  authenticate,
  authorize(["Owner", "Admin"], []),
  getStaffUsersByOutletsId
);

// Protect with authenticate only
router.get(
  "/staff-users/riders/:outletId",
  authenticate,
  getRidersByOutletId
);

export default router;