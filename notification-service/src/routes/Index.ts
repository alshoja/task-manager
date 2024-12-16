import express from "express";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import notificationRoutes from "./Notification.route";
import { AppError } from "../middlewares/GlobalErrorHandler.middleware";

const router = express.Router();
// router.all('*', (req, res, next) => next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404)));
router.use("/api", AuthMiddleware.verifyJwt, notificationRoutes);

export default router;