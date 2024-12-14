import express from "express";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import authRoutes from "./Auth.route";
import taskRoutes from "./Task.route";

const router = express.Router();

router.use("/api", AuthMiddleware.verifyJwt, taskRoutes);

export default router;