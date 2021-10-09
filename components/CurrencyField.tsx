import React, { useState, useRef } from 'react';
import { useStore } from 'effector-react';

import { MenuItem, TextField, NativeSelect } from '@mui/material';

import { $converter } from '../store/converter';

import currencies from '../currencies';

interface CurrencyFieldProps {
  value: string;
  onChange: (value: string) => any;
}

function CurrencyField({ value, onChange }: CurrencyFieldProps) {
  const store = useStore($converter);

  return (
    <NativeSelect value={value} onChange={(e) => onChange(e.target.value)} variant="outlined" fullWidth>
      {Object.keys(store.currencies).map((v) => {
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
