import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

class RedisConfig {
  private publisher: Redis | null = null;
  private subscriber: Redis | null = null;

  constructor(private redisUrl: string) {}

  // Connect to Redis for both publisher and subscriber
  public async connect(): Promise<void> {
    if (!this.publisher || !this.subscriber) {
      this.publisher = new Redis(this.redisUrl);  // Publisher connection
      this.subscriber = new Redis(this.redisUrl); // Subscriber connection

      this.publisher.on('connect', () => console.log('🚀 Publisher connected to Redis'));
      this.publisher.on('error', (err) => console.error('Redis Publisher error:', err));
      
      this.subscriber.on('connect', () => console.log('🚀 Subscriber connected to Redis'));
      this.subscriber.on('error', (err) => console.error('Redis Subscriber error:', err));
    }
  }

  // Close both publisher and subscriber connections
  public async close(): Promise<void> {
    if (this.publisher) {
      await this.publisher.quit();
      this.publisher = null;
    }
    if (this.subscriber) {
      await this.subscriber.quit();
      this.subscriber = null;
    }
  }

  // Create and return Redis PubSub using separate publisher and subscriber clients
  public async createPubSub(): Promise<RedisPubSub> {
    if (!this.publisher || !this.subscriber) {
      throw new Error('Redis clients are not initialized.');
    }

    return new RedisPubSub({
      publisher: this.publisher,  // Use the publisher connection
      subscriber: this.subscriber,  // Use the subscriber connection
    });
  }

  // Get the individual publisher or subscriber client if needed
  public getPublisher(): Redis | null {
    return this.publisher;
  }

  public getSubscriber(): Redis | null {
    return this.subscriber;
  }
}

// Provide the default Redis URL
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const redis = new RedisConfig(redisUrl);
