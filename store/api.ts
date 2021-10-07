interface Response {
  success: boolean;
  error: string | null;
  value: number | null;
  lastUpdate: string | null;
  relevantBefore: string | null;
}

interface TemporaryResponse extends Response {
  lastUpdate: string | null;
  relevantBefore: string | null;
}

export interface ConvertRequest {
  from: string;
  to: string;
  value: number;
}

export interface ConvertResponse extends TemporaryResponse {
  value: number | null;
}

export const convertRequest = async ({ from, to, value }: ConvertRequest): Promise<ConvertResponse> => {
  const result = await fetch(
    `api/convert?${new URLSearchParams({
      from,
      to,
      value: value.toString(),
    }).toString()}`,
    {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    },
  );

  return result.json();
};

export interface CurrenciesResponse extends TemporaryResponse {
  currencies: string[];
}

export const getCurrencies = async (): Promise<CurrenciesResponse> => (await fetch('/api/currencies')).json();
