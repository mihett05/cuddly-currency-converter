import React from 'react';
import { Box, TextField } from '@mui/material';
import NumberFormat from 'react-number-format';

interface CurrencyFieldProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => any;
}

// https://mui.com/components/text-fields/#integration-with-3rd-party-input-libraries
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props: any, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

export default function AmountField({ label, value, onChange }: CurrencyFieldProps) {
  // null value means empty string
  return (
    <TextField
      label={label}
      value={value === null ? '' : value.toString()}
      onChange={(event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
          onChange(value);
        } else {
          onChange(null);
        }
      }}
      variant="outlined"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  );
}
