const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await client.connect();
})();

// Get from cache
exports.getFromCache = async (key) => {
  return await client.get(key);
};

// Set to cache
exports.setToCache = async (key, value, ttl) => {
  await client.setEx(key, ttl, value);
};