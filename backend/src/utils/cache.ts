import NodeCache from 'node-cache';
import { logger } from './logger';

// In-memory fallback cache (used when Redis is unavailable)
const memCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

let redisClient: import('ioredis').Redis | null = null;

export async function initRedis(): Promise<void> {
  if (!process.env.REDIS_URL) {
    logger.info('No REDIS_URL set — using in-memory cache');
    return;
  }
  try {
    const { default: Redis } = await import('ioredis');
    redisClient = new Redis(process.env.REDIS_URL, { lazyConnect: true, maxRetriesPerRequest: 2 });
    await redisClient.connect();
    logger.info('Redis connected');
  } catch (err) {
    logger.warn('Redis connection failed — falling back to in-memory cache');
    redisClient = null;
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    if (redisClient) {
      const val = await redisClient.get(key);
      return val ? (JSON.parse(val) as T) : null;
    }
    return memCache.get<T>(key) ?? null;
  } catch {
    return null;
  }
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
  try {
    if (redisClient) {
      await redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } else {
      memCache.set(key, value, ttlSeconds);
    }
  } catch {
    // silent
  }
}

export async function cacheDel(key: string): Promise<void> {
  try {
    if (redisClient) await redisClient.del(key);
    else memCache.del(key);
  } catch {
    // silent
  }
}

export async function cacheFlush(): Promise<void> {
  try {
    if (redisClient) await redisClient.flushdb();
    else memCache.flushAll();
  } catch {
    // silent
  }
}

export function getRedisClient() {
  return redisClient;
}
