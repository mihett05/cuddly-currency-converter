import type { NextApiRequest, NextApiResponse } from 'next';
import redis, { checkRates } from '../../lib/redis';
import { BaseResponse } from '../../lib/base-response';

type Response = BaseResponse & {
  currencies: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const checkResult = await checkRates();
  if (!checkResult.success) {
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch currencies rate',
      lastUpdate: null,
      relevantBefore: null,
      currencies: [],
    });
  }

  return res
    .status(200)
    .json({
      success: true,
      error: null,
      lastUpdate: checkResult.lastUpdate,
      relevantBefore: checkResult.nextUpdate,
      currencies: await redis.hkeys('rates'),
    });
}
