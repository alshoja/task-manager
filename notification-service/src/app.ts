import dotenv from "dotenv";
import express, { Application } from "express";
import { AppError, globalErrorMiddleware } from "./middlewares/GlobalErrorHandler.middleware";
import Routes from "./routes/Index";
import { redis } from "./config/Redis.config";
import { rabbitMQ } from "./config/Rabbitmq.config";
import { NotificationService } from "./services/Notification.service";
import { NotificationRepository } from "./repositories/Notification.repository";
import { RabbitMQService } from "./services/rbq/Rabbit.service";

dotenv.config();
const repository = new NotificationRepository();
const rabbitMQService = new RabbitMQService();
const notificationService = new NotificationService(repository, rabbitMQService);

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeExternalServices();
    notificationService.listenForNotifications()
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

  private async initializeExternalServices(): Promise<void> {
    try {
      await redis.connect();
      await rabbitMQ.connect();
    } catch (error) {
      console.error("Error initializing external services:", error);
    }
  }

  public getApp(): Application {
    return this.app;
  }
}
