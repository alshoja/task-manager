import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/Task.route";
import tagRoutes from "./routes/Tag.route";
import taskTagRoutes from "./routes/TaskTag.route";
import { AppError, globalErrorMiddleware } from "./middlewares/GlobalErrorHandler.middleware";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api", tagRoutes);
app.use("/api", taskTagRoutes);

app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

app.use(globalErrorMiddleware);
export default app;
