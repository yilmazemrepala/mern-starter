import express from "express";
import {
	getUsers,
	getUserById,
	updateProfile,
	deleteUser,
} from "../controllers/user.controller";
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

// All routes are protected
router.use(protect);

// User profile routes
router.put("/profile", updateProfile);

// Admin only routes
router.get("/", authorize("admin"), getUsers);
router.get("/:id", getUserById);
router.delete("/:id", authorize("admin"), deleteUser);

export default router;
