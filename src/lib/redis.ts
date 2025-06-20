import redis, { RedisOptions } from 'ioredis';

export const config: RedisOptions = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || '',
    db: parseInt(process.env.REDIS_DB || '0', 10),
}

class RedisClient {
    public static instance: RedisClient;
    public client: redis;

    constructor() {
        this.client = new redis(config);
    }

    public static getInstance(): RedisClient {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }

    public getClient(): redis {
        return this.client;
    }
}

export default RedisClient;