import express from "express";
import taskRoutes from "./Task.route";
import tagRoutes from "./Tag.route";
import taskTagRoutes from "./TaskTag.route";
import authRoutes from "./Auth.route";
import { AuthMiddleware } from "../middlewares/Auth.middleware";

const router = express.Router();

router.use("/api", authRoutes);
router.use("/api", AuthMiddleware.verifyJwt, taskRoutes);
router.use("/api", AuthMiddleware.verifyJwt, tagRoutes);
router.use("/api", AuthMiddleware.verifyJwt, taskTagRoutes);

export default router;