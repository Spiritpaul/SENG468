const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient(process.env.REDIS_URL);

module.exports = {
  ...client,
  getAsync: promisify(client.lrange).bind(client),
  setAsync: promisify(client.lpush).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};
