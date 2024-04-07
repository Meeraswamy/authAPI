// services/redisService.js

const redis = require('redis');
const RedisStore = require('connect-redis').default; // Import connect-redis
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

(async () => {
  await redisClient.connect();
})();

redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('error', (err) => console.log('Redis Client Connection Error', err));

const store = new RedisStore({ client: redisClient }); // Create a redis store.


module.exports = { redisClient, store }; // Export both client and store


