import express from "express";
import { register, login, logout, getMe } from "../controllers/auth.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.get("/me", protect, getMe);

export default router;
