import dotenv from "dotenv";
import express, { Application } from "express";
import { AppError, globalErrorMiddleware } from "./middlewares/GlobalErrorHandler.middleware";
import Routes from "./routes/Index";

dotenv.config();
export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use("/", Routes);
    this.app.all('*', (req, res, next) => next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404)));
  }

  private initializeErrorHandling(): void {
    this.app.use(globalErrorMiddleware);
  }

  public getApp(): Application {
    return this.app;
  }
}
