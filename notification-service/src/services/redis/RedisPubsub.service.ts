import { RedisPubSub } from 'graphql-redis-subscriptions';
import { redis } from '../../config/Redis.config';

export class RedisPubSubService {
    private pubSub: RedisPubSub | null = null;
    private static instance: RedisPubSubService;

    public static getInstance(): RedisPubSubService {

        if (!RedisPubSubService.instance) {
            RedisPubSubService.instance = new RedisPubSubService();
        }
        return RedisPubSubService.instance;
    }

    public async init(): Promise<void> {
        if (!this.pubSub) {
            this.pubSub = await redis.createPubSub();
            console.log('RedisPubSub initialized');
        }
    }

    public async publish(channel: string, message: any): Promise<void> {
        if (!this.pubSub) {
            throw new Error('RedisPubSub is not initialized');
        }
        try {
            console.log(`Publishing message to channel: ${channel}`);
            const x = await this.pubSub.publish(channel, message);
            console.log("🚀 ~ RedisPubSubService ~ publish ~ x:", x)
        } catch (error) {
            console.error(`Failed to publish message to channel ${channel}:`, error);
        }
    }

    public async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
        if (!this.pubSub) {
            throw new Error('RedisPubSub is not initialized');
        }
        try {
            await this.pubSub.subscribe(channel, (message) => {
                console.log(`Received message from channel: ${channel}`);
                callback(message);
            });
        } catch (error) {
            console.error(`Failed to subscribe to channel ${channel}:`, error);
        }
    }

    public async unsubscribe(channel: number): Promise<void> {
        if (!this.pubSub) {
            throw new Error('RedisPubSub is not initialized');
        }
        try {
            await this.pubSub.unsubscribe(channel);
            console.log(`Unsubscribed from channel: ${channel}`);
        } catch (error) {
            console.error(`Failed to unsubscribe from channel ${channel}:`, error);
        }
    }

    public async asyncIterator(channel: string): Promise<AsyncIterator<any>> {
        if (!this.pubSub) {
            throw new Error('RedisPubSub is not initialized');
        }
        // Directly return the asyncIterator without awaiting it
        return this.pubSub.asyncIterator(channel);
    }
}
