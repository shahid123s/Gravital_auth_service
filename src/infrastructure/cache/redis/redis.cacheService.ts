import redis from "./redis.config";

export class CacheService {
    async set(key: string, value: string, ttl?: number) {
        if (ttl) {
          await redis.set(key, value, { EX: ttl });
        } else {
          await redis.set(key, value);
        }
      }
    
      async get(key: string): Promise<string | null> {
        return await redis.get(key);
      }
    
      async del(key: string) {
        await redis.del(key);
      }
    }