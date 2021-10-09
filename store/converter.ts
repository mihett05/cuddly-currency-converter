import { createEffect, createEvent, createStore, forward } from 'effector';
import { getCurrencies, Response } from './api';

interface ConverterStore {
  from: string;
  to: string;
  valueFrom: number;
  valueTo: number;
  error: string | null;
  lastUpdate: Date | null;
  currencies: Record<string, number>;
}

export const convert = createEvent();

export const setValue = createEvent<number>();
export const setFrom = createEvent<string>();
export const setTo = createEvent<string>();

export const swap = createEvent();
export const fetchCurrencies = createEvent();

const fetchCurrenciesFx = createEffect<void, Response>().use(getCurrencies);

forward({
  from: fetchCurrencies,
  to: fetchCurrenciesFx,
});

forward({
  from: [setValue, setFrom, setTo, swap],
  to: convert,
});

export const $converter = createStore<ConverterStore>({
  from: 'USD',
  to: 'RUB',
  valueFrom: 0,
  valueTo: 0,
  error: null,
  lastUpdate: null,
  currencies: {},
})
  .on(fetchCurrenciesFx.doneData, (state, result) => {
    if (result.success) {
      return { ...state, currencies: result.currencies };
    } else {
      return { ...state, error: result.error };
    }
  })
  .on(convert, (state: ConverterStore) => {
    const fromInUsd = state.currencies[state.from];
    const toInUsd = state.currencies[state.to];

    const result = (state.valueFrom / fromInUsd) * toInUsd;

    if (isNaN(result) || !isFinite(result)) {
      return { ...state, valueTo: 0 };
    }

    return {
      ...state,
      valueTo: result,
    };
  })
  .on(setValue, (state, value: number) => {
    return {
      ...state,
      valueFrom: value,
    };
  })
  .on(setFrom, (state, from: string) => {
    return {
      ...state,
      from,
    };
  })
  .on(setTo, (state, to: string) => {
    return {
      ...state,
      to,
    };
  })
  .on(swap, (state: ConverterStore) => ({
    ...state,
    from: state.to,
    to: state.from,
  }));
