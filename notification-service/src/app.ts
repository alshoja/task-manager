import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import { rabbitMQ } from "./config/Rabbitmq.config";
import { redis } from "./config/Redis.config";
import { resolvers } from "./graphql/resolver";
import { typeDefs } from "./graphql/schema";
import { AppError, globalErrorMiddleware } from "./middlewares/GlobalErrorHandler.middleware";
import { NotificationRepository } from "./repositories/Notification.repository";
import Routes from "./routes/Index";
import { NotificationService } from "./services/Notification.service";
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
    this.initializeGraphql()
    notificationService.listenForNotifications();

  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use("/", Routes);
    this.app.all('*', (req, res, next) => {
      if (req.originalUrl === '/graphql') {
        return next();
      }
      next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
    });
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

  private async initializeGraphql() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();
    this.app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      bodyParser.json(),
      expressMiddleware(server)
    );
  }

  public getApp(): Application {
    return this.app;
  }
}

