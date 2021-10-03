import https from 'https';

type ApiResult = {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: string;
  time_last_update_utc: string;
  time_next_update_unix: string;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: Map<string, number>;
};

export const getCurrencies = (): Promise<ApiResult> =>
  new Promise((resolve, reject) => {
    https
      .get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', reject);
  });
