import { Channel, ConsumeMessage, Message } from 'amqplib';
import { rabbitMQ } from '../../config/Rabbitmq.config';

export class RabbitMQService {
    private channel: Channel | null = null;

    constructor() { }

    /**
     * Initialize RabbitMQ connection and channel.
     */
    private async ensureChannel(): Promise<Channel> {
        if (!this.channel) {
            this.channel = await rabbitMQ.connect();
        }
        return this.channel;
    }

    /**
     * Sends a message to a specific queue.
     */
    public async sendToQueue(queueName: string, message: string): Promise<void> {
        try {
            const channel = await this.ensureChannel();
            await channel.assertQueue(queueName, { durable: true });
            channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
            console.log(`Message sent to queue "${queueName}":`, message);
        } catch (error) {
            console.error(`Error sending message to queue "${queueName}":`, error);
            throw error;
        }
    }

    /**
     * Consumes messages from a specific queue.
     */
    public async consumeFromQueue(
        queueName: string,
        onMessage: (msg: ConsumeMessage | null) => void
    ): Promise<void> {
        try {
            const channel = await this.ensureChannel();
            await channel.assertQueue(queueName, { durable: true });
            channel.consume(queueName, (msg) => {
                if (msg) {
                    onMessage(msg);
                    channel.ack(msg); // Acknowledge the message after processing
                }
            });
            console.log(`Consuming messages from queue "${queueName}"`);
        } catch (error) {
            console.error(`Error consuming messages from queue "${queueName}":`, error);
            throw error;
        }
    }

    public async acknowledgeMessage(msg: Message): Promise<void> {
        try {
            const channel = await this.ensureChannel();
            channel.ack(msg);
            console.log('Message acknowledged successfully');
        } catch (error) {
            console.error('Failed to acknowledge message:', error);
        }
    }

    public async rejectMessage(msg: Message, requeue: boolean = false): Promise<void> {
        try {
            const channel = await this.ensureChannel();
            channel.nack(msg, false, requeue);
            console.log(`Message rejected. Requeued: ${requeue}`);
        } catch (error) {
            console.error('Failed to reject message:', error);
        }
    }
}
