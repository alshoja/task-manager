import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer, Server as HttpServer } from "http";
import { WebSocketServer } from "ws";
import { rabbitMQ } from "./config/Rabbitmq.config";
import { redis } from "./config/Redis.config";
import { schema } from "./graphql";
import { AppError, globalErrorMiddleware } from "./middlewares/GlobalErrorHandler.middleware";
import Routes from "./routes/Index";
import { RedisPubSubService } from "./services/redis/RedisPubsub.service";

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
    this.initializeGraphql();
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
    const {
      ApolloServerPluginLandingPageProductionDefault,
      ApolloServerPluginLandingPageLocalDefault
    } = require('apollo-server-core');

    const wsServer = new WebSocketServer({
      server: this.httpServer,
      path: '/graphql',
    });

    const serverCleanup = useServer({ schema }, wsServer);
    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),

        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },

        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault({
            embed: true,
            graphRef: "plaid-gufzoj@current"
          })
          : ApolloServerPluginLandingPageLocalDefault({ embed: true })
      ],
    });

    await server.start();
    this.app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server, {
      context: async ({ req }) => {
        const redisPubSubService = RedisPubSubService.getInstance();
        await redisPubSubService.init(); 
        return {
          redisPubSubService, 
        };
      },
    }));
  }

  public getHttpServer(): HttpServer {
    return this.httpServer;
  }
}

