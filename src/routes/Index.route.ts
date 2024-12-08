import express from "express";
import taskRoutes from "./Task.route";
import tagRoutes from "./Tag.route";
import taskTagRoutes from "./TaskTag.route";
import authRoutes from "./Auth.route";

const router = express.Router();

router.use("/api", taskRoutes);
router.use("/api", tagRoutes);
router.use("/api", taskTagRoutes);
router.use("/api", authRoutes);

export default router;