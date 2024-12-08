import dotenv from "dotenv";
import express from "express";
import { AppError, globalErrorMiddleware } from "./middlewares/GlobalErrorHandler.middleware";
import Routes from "./routes/Index";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", Routes);
app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

app.use(globalErrorMiddleware);
export default app;
