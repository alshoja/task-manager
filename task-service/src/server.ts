import { App } from "./app";
import { rabbitMQ } from "./config/Rabbitmq.config";
import { redis } from "./config/Redis.config";
export class Server {
  private port: number;
  private appInstance: App;

  constructor() {
    this.port = parseInt(process.env.PORT || "3000", 10);
    this.appInstance = new App();
  }

  public async start(): Promise<void> {
    try {

      const httpServer = this.appInstance.getHttpServer();
      httpServer.listen(this.port, () => {
        console.log(`🚀 Server is running on http://localhost:${this.port}`);
        console.log(`🚀 Subscriptions are ready at ws://localhost:${this.port}/graphql`);
      });

      this.setupGracefulShutdown();
    } catch (error) {
      console.error("Failed to start the server:", error);
      await this.shutdownExternalServices();
      process.exit(1);
    }
  }
  private setupGracefulShutdown(): void {
    const shutdownSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
    shutdownSignals.forEach((signal) => {
      process.on(signal, async () => {
        console.log(`${signal} received. Closing server...`);
        await this.shutdownExternalServices();
        process.exit(0);
      });
    });
  }

  private async shutdownExternalServices(): Promise<void> {
    try {
      await rabbitMQ.close();
      await redis.close();
      console.log("External services shut down successfully.");
    } catch (error) {
      console.error("Error during shutdown:", error);
    }
  }

}

const server = new Server();
server.start().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
