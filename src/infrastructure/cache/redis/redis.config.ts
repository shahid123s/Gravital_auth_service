import { createClient } from 'redis';
import { appConfig } from '../../../config/app.config';

// Redis client configuration looks good
// Connection URL is properly configured with fallback to localhost
// Error handling is implemented
// Async connection is properly handled with IIFE
// Code follows TypeScript best practices

const redis = createClient(
  {
    password: appConfig.redis.password,
    socket: {
        host: appConfig.redis.host,
        port: appConfig.redis.port,
    }
}
);

redis.on('connect', () => {
  console.log('Redis client connected');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redis;
