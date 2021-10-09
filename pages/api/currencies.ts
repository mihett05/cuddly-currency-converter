import type { NextApiRequest, NextApiResponse } from 'next';
import redis, { checkRates } from '../../lib/redis';
import { BaseResponse } from '../../lib/base-response';

type Response = BaseResponse & {
  currencies: Record<string, number>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const checkResult = await checkRates();
  if (!checkResult.success) {
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch currencies rate',
      lastUpdate: null,
      relevantBefore: null,
      currencies: {},
    });
  }

  const rates = await redis.hgetall('rates');
  const result: Record<string, number> = {};

  Object.keys(rates).forEach((key) => {
    result[key] = parseFloat(parseFloat(rates[key]).toFixed(2));
  });

  return res.status(200).json({
    success: true,
    error: null,
    lastUpdate: checkResult.lastUpdate,
    relevantBefore: checkResult.nextUpdate,
    currencies: result,
  });
}
