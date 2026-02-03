import Redis from 'ioredis';

interface RedisConfig {
    sentinels: Array<{ host: string; port: number; }>;
    host?: string;
    name: string;
    password?: string;
    sentinelPassword?: string;
    db?: number;
}

const NAMESPACE = 'redis-ha';

const config: RedisConfig = {
    sentinels: [
        { 
            host: process.env.REDIS_SENTINEL_HOST || `redis-sentinel-0.redis-sentinel.${NAMESPACE}.svc.cluster.local`, 
            port: parseInt(process.env.REDIS_SENTINEL_PORT || '26379', 10)
        },
        { 
            host: process.env.REDIS_SENTINEL_HOST_2 || `redis-sentinel-1.redis-sentinel.${NAMESPACE}.svc.cluster.local`, 
            port: parseInt(process.env.REDIS_SENTINEL_PORT || '26379', 10) 
        },
        // { 
        //     host: process.env.REDIS_SENTINEL_HOST_3 || `redis-sentinel-2.redis-sentinel.${NAMESPACE}.svc.cluster.local`, 
        //     port: parseInt(process.env.REDIS_SENTINEL_PORT || '26379', 10) 
        // }
    ],
    name: process.env.REDIS_MASTER_SET || 'mymaster',
    password: process.env.REDIS_PASSWORD, // Required for Redis master/replica auth
    sentinelPassword: process.env.REDIS_SENTINEL_PASSWORD, // Required for Sentinel auth
    db: parseInt(process.env.REDIS_DB || '0', 10)
};

class RedisClient {
    public redis: Redis;

    constructor() {
        console.log('🔧 Initializing Redis client...');
        console.log('🔧 Configuration:', {
            sentinels: config.sentinels,
            name: config.name,
            db: config.db,
            hasPassword: !!config.password,
            hasSentinelPassword: !!config.sentinelPassword,
        });
        // Now connect directly to the master
        const redis = new Redis({
            sentinels: config.sentinels,
            name: config.name,
            password: config.password,
            sentinelPassword: config.sentinelPassword,
            db: config.db,
            role: 'master',
            connectTimeout: 1000,
            retryStrategy: () => null
        });
        this.redis = redis;

        redis.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    static redis = new RedisClient().redis;
}

export default RedisClient;