require("dotenv").config();

const Redis = require("ioredis");
let redis;

if (process.env.APP_REDIS) {
  redis = new Redis();
}

module.exports = redis;
