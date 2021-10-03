import IORedis from 'ioredis';

const redis = new IORedis(process.env.REDIS_HOST, {
  password: process.env.REDIS_PASSWORD,
});

export default redis;
