import redis from "./redis.config";
import {ICache} from '../../../domain/entities/Cache';


export class RedisCache implements ICache {
    private client = redis;
    async get<T>(key: string): Promise<T | null> {
        try {
            const value = await this.client.get(key);
            return value ? JSON.parse(value) as T : null;
        } catch (error) {
            console.error('Error getting value from Redis:', error);
            return null;
        }
    }

    del(key: string): Promise<void> {
        return this.client.del(key)
            .then(() => {})
            .catch(error => {
                console.error('Error deleting key from Redis:', error);
            });
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        try {
            const stringValue = JSON.stringify(value);
            if (ttl) {
                await this.client.setEx(key, ttl, stringValue);
                console.log(`Set key ${key} with TTL ${ttl} seconds`);
            } else {
                await this.client.set(key, stringValue);
            }
        } catch (error) {
            console.error('Error setting value in Redis:', error);
        }
    }
}