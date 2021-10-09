export interface Response {
  success: boolean;
  error: string | null;
  value: number | null;
  lastUpdate: string | null;
  relevantBefore: string | null;
  currencies: Record<string, number>;
}

export const getCurrencies = async (): Promise<Response> => (await fetch('/api/currencies')).json();
