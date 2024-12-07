import amqp from "amqplib";

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
  return connection.createChannel();
};
