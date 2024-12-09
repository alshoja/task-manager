import amqp, { Connection, Channel } from "amqplib";

class RabbitMQConfig {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private rabbitMqUrl: string) { }

  public async connect(): Promise<Channel> {
    try {
      if (!this.connection) {
        this.connection = await amqp.connect(this.rabbitMqUrl);
        console.log("RabbitMQ connection established");
        this.connection.on("error", (err) =>
          console.error("RabbitMQ connection error:", err)
        );
        this.connection.on("close", () =>
          console.warn("RabbitMQ connection closed")
        );
      }
      if (!this.channel) {
        this.channel = await this.connection.createChannel();
        console.log("RabbitMQ channel created");
      }
      return this.channel;
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
      throw error; 
    }
  }

  public async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        console.log("RabbitMQ channel closed");
      }
      if (this.connection) {
        await this.connection.close();
        console.log("RabbitMQ connection closed");
      }
    } catch (error) {
      console.error("Error closing RabbitMQ connection:", error);
    } finally {
      this.connection = null;
      this.channel = null;
    }
  }

  public isConnected(): boolean {
    return !!this.connection && !!this.channel;
  }
}

const rabbitMqUrl = process.env.RABBITMQ_URL || "amqp://localhost";
export const rabbitMQ = new RabbitMQConfig(rabbitMqUrl);
