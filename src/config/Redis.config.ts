import Redis from 'ioredis';

class RedisConfig {
    private redis: Redis | null = null;

    constructor(private redisUrl: string) { }

    /**
     * Establishes a connection to the Redis server if not already connected.
     */
    public async connect(): Promise<Redis> {
        if (!this.redis) {
            this.redis = new Redis(this.redisUrl);
            this.redis.on('connect', () => console.log('Redis connected'));
            this.redis.on('error', (err) => console.error('Redis connection error', err));
        }
        return this.redis;
    }

    /**
     * Closes the Redis connection gracefully.
     */
    public async close(): Promise<void> {
        if (this.redis) {
            await this.redis.quit();
            this.redis = null; 
        }
    }

    /**
     * Returns the current Redis client.
     */
    public getClient(): Redis | null {
        return this.redis;
    }
}

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const redis = new RedisConfig(redisUrl);
