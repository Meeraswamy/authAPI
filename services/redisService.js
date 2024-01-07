// services/redisService.js

const redis = require('redis');
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
  });


(async () => {
  await redisClient.connect();
})();

redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('error', (err) => console.log('Redis Client Connection Error', err));


module.exports = redisClient;

