import IORedis from 'ioredis';
import { getCurrencies } from './api';

const redisData: { redis: IORedis.Redis | null } = {
  redis: null,
};

const getRedis = () => {
  if (redisData.redis === null) {
    redisData.redis = new IORedis(process.env.REDIS_HOST, {
      password: process.env.REDIS_PASSWORD,
    });
  }

  return redisData.redis;
};

type RateResponse = {
  success: boolean;
  lastUpdate: string | null;
  nextUpdate: string | null;
};

export const checkRates = async (): Promise<RateResponse> => {
  const redis = getRedis();
  let nextUpdate = await redis.get('nextUpdate');
  let lastUpdate = await redis.get('lastUpdate');
  if (lastUpdate === null || nextUpdate === null || new Date() >= new Date(nextUpdate)) {
    const result = await getCurrencies();
    if (result.result === 'success') {
      await redis.hmset('rates', result.conversion_rates);
      await redis.set('nextUpdate', result.time_next_update_utc);
      nextUpdate = result.time_next_update_utc;
      await redis.set('lastUpdate', result.time_last_update_utc);
      lastUpdate = result.time_last_update_utc;
    } else if (nextUpdate === null) {
      return {
        success: false,
        lastUpdate: null,
        nextUpdate: null,
      };
    }
  }

  return {
    success: true,
    lastUpdate,
    nextUpdate,
  };
};

export default getRedis;
