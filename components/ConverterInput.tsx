import React from 'react';
import { Box } from '@mui/material';
import AmountField from './AmountField';
import CurrencyField from './CurrencyField';

interface ConverterInputProps {
  value: number | null;
  onValue: (v: number | null) => any;
}

function ConverterInput({ value, onValue }: ConverterInputProps) {
  return (
    <Box>
      <Box
        style={{
          marginBottom: '1vh',
        }}
      >
        <AmountField label="From" value={value} onChange={onValue} />
      </Box>
      <Box>
        <CurrencyField />
      </Box>
    </Box>
  );
}

export default ConverterInput;
