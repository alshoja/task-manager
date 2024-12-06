import amqp from "amqplib";

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "myQueue";

    // Create a queue
    await channel.assertQueue(queue);

    // Send a message
    channel.sendToQueue(queue, Buffer.from("Hello, RabbitMQ!"));
    console.log(`Message sent to queue: ${queue}`);

    // Receive messages
    channel.consume(queue, (msg) => {
      if (msg) {
        console.log(`Received message: ${msg.content.toString()}`);
        channel.ack(msg); // Acknowledge message
      }
    });
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

connectRabbitMQ();
