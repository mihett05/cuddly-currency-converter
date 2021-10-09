import React, { useState, useRef } from 'react';
import { useStore } from 'effector-react';

import { MenuItem, TextField, NativeSelect } from '@mui/material';
import CurrencyFlag from 'react-currency-flags';

import { $converter } from '../store/converter';

import currencies from '../currencies';

function CurrencyField() {
  const store = useStore($converter);
  const [value, setValue] = useState('RUB');

  return (
    <NativeSelect value={value} onChange={(e) => setValue(e.target.value)} variant="outlined" fullWidth>
      {store.currencies.map((v) => {
        const currencyInfo = currencies.find((cur) => cur.code === v);

        return (
          <option value={v} key={v}>
            {currencyInfo ? currencyInfo.emoji : '🇺🇳'} {v}
          </option>
        );
      })}
    </NativeSelect>
  );
}

export default CurrencyField;
