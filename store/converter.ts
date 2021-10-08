import { attach, createEffect, createEvent, createStore, forward, guard, Store } from 'effector';
import { convertRequest, ConvertResponse, ConvertRequest, CurrenciesResponse, getCurrencies } from './api';

interface ConverterStore {
  from: string;
  to: string;
  valueFrom: number | null;
  valueTo: number | null;
  error: string | null;
  lastUpdate: Date | null;
  currencies: string[];
}

interface UpdateEvent {
  from?: string;
  to?: string;
  valueFrom?: number;
}

export const convert = createEvent();
export const update = createEvent<UpdateEvent>();
export const swap = createEvent();
export const fetchCurrencies = createEvent();

const convertFx = createEffect<ConvertRequest, ConvertResponse>().use(convertRequest);
const fetchCurrenciesFx = createEffect<void, CurrenciesResponse>().use(getCurrencies);

export const $converter = createStore<ConverterStore>({
  from: 'USD',
  to: 'RUB',
  valueFrom: null,
  valueTo: null,
  error: null,
  lastUpdate: null,
  currencies: ['RUB', 'USD'],
})
  .on(convertFx.doneData, (state, result) => {
    if (result.success) {
      return {
        ...state,
        valueTo: result.value,
        lastUpdate: new Date(result.lastUpdate as string),
      };
    } else {
      return {
        ...state,
        error: result.error,
      };
    }
  })
  .on(fetchCurrenciesFx.doneData, (state, result) => {
    if (result.success) {
      return { ...state, currencies: result.currencies };
    } else {
      return { ...state, error: result.error };
    }
  });

$converter.on(update, (state: ConverterStore, data: UpdateEvent) => {
  const stateUpdates: any = {};

  if (data.from !== undefined) {
    stateUpdates.from = data.from;
  }
  if (data.to !== undefined) {
    stateUpdates.to = data.to;
  }
  if (data.valueFrom !== undefined) {
    stateUpdates.valueFrom = data.valueFrom;
  }

  return { ...state, stateUpdates };
});
$converter.on(swap, (state: ConverterStore) => ({
  ...state,
  from: state.to,
  to: state.from,
  valueFrom: state.valueTo,
  valueTo: state.valueFrom,
}));

const serializeConvertBeforeFetch = attach<void, Store<ConverterStore>, typeof convertFx>({
  effect: convertFx,
  source: $converter,
  mapParams: (_, data: ConverterStore) => {
    return {
      from: data.from,
      to: data.to,
      value: data.valueFrom || 0,
    };
  },
});

forward({
  from: convert,
  to: serializeConvertBeforeFetch,
});

forward({
  from: fetchCurrencies,
  to: fetchCurrenciesFx,
});
