import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useStore } from 'effector-react';
import CurrencyFlag from 'react-currency-flags';

import { Box } from '@mui/material';

import { $converter, convert, update, swap, fetchCurrencies } from '../store/converter';

import AmountField from '../components/AmountField';

const Home: NextPage = () => {
  const store = useStore($converter);
  const [from, setFrom] = useState<number | null>(null);

  useEffect(fetchCurrencies, []);

  return (
    <div>
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Yet another one currency converter on React and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <CurrencyFlag currency="USD" size="sm" />
        <AmountField label="From" value={from} onChange={setFrom} />
      </Box>
    </div>
  );
};

export default Home;
