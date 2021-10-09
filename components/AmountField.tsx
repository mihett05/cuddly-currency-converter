import React from 'react';
import { Box, TextField } from '@mui/material';
import NumberFormat from 'react-number-format';

interface AmountFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => any;
}

// https://mui.com/components/text-fields/#integration-with-3rd-party-input-libraries
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props: any, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        const [int, float] = values.value.split('.');
        if (int.length <= 15 && !values.value.includes('-')) {
          console.log(values.value.includes('-'));
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }
      }}
      thousandSeparator
      isNumericString
      inputMode="decimal"
      decimalScale={2}
    />
  );
});

export default function AmountField({ label, value, onChange }: AmountFieldProps) {
  // null value means empty string
  return (
    <TextField
      label={label}
      value={value.toString()}
      onChange={(event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
          onChange(value);
        } else {
          onChange(0);
        }
      }}
      variant="standard"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      fullWidth
    />
  );
}
