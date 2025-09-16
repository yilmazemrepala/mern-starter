import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const router = express.Router();

// /api/auth
router.use("/auth", authRoutes);

// /api/users
router.use("/users", userRoutes);

export default router;
