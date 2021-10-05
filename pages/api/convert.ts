import type { NextApiRequest, NextApiResponse } from 'next';

import redis, { checkRates } from '../../lib/redis';

type Response = {
  success: boolean;
  error: string | null;
  value: number | null;
  lastUpdate: string | null;
  relevantBefore: string | null;
};

const getQueryArg = (arg: string | string[]): string => (Array.isArray(arg) ? arg[0] : arg);
const parseValue = (value: string | string[]): number => parseFloat(getQueryArg(value));

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const checkResult = await checkRates();
  if (!checkResult.success) {
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch currencies rate',
      value: null,
      lastUpdate: null,
      relevantBefore: null,
    });
  }

  const { from, to, value } = req.query;

  const fromInUsd = await redis.get(getQueryArg(from));
  const toInUsd = await redis.get(getQueryArg(to));

  if (fromInUsd === null || toInUsd === null) {
    return res.status(400).json({
      success: false,
      error: "Requested currencies weren't found",
      value: null,
      lastUpdate: null,
      relevantBefore: null,
    });
  }

  const result = (parseValue(value) / parseValue(fromInUsd)) * parseValue(toInUsd);

  res.status(200).json({
    success: true,
    error: null,
    value: result,
    lastUpdate: checkResult.lastUpdate,
    relevantBefore: checkResult.nextUpdate,
  });
}
