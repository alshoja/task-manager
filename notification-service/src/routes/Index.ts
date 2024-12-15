import express from "express";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import notificationRoutes from "./Notification.route";

const router = express.Router();

router.use("/api", AuthMiddleware.verifyJwt, notificationRoutes);

export default router;