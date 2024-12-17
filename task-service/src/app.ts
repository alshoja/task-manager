import dotenv from "dotenv";
import express, { Application } from "express";
import { AppError, globalErrorMiddleware } from "./middlewares/GlobalErrorHandler.middleware";
import Routes from "./routes/Index";
import { redis } from "./config/Redis.config";
import { rabbitMQ } from "./config/Rabbitmq.config";
import authRoutes from "./routes/Auth.route";
import { createServer, Server as HttpServer } from "http";

dotenv.config();
export class App {
  public app: Application;
  private httpServer: HttpServer;


  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeExternalServices();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use("/api", authRoutes);
    this.app.use("/", Routes);
    this.app.all('*', (req, res, next) => next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404)));
  }

  private initializeErrorHandling(): void {
    this.app.use(globalErrorMiddleware);
  }

  private async initializeExternalServices(): Promise<void> {
    try {
      await redis.connect();
      await rabbitMQ.connect();
    } catch (error) {
      console.error("Error initializing external services:", error);
    }
  }

  public getHttpServer(): HttpServer {
    return this.httpServer;
  }
}
