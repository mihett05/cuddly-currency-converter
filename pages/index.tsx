import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useStore } from 'effector-react';

import { Box, IconButton } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import { $converter, convert, update, swap, fetchCurrencies } from '../store/converter';

import ConverterInput from '../components/ConverterInput';

const Home: NextPage = () => {
  const store = useStore($converter);
  const [from, setFrom] = useState<number | null>(null);

  useEffect(fetchCurrencies, []);

  return (
    <div>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <ConverterInput value={from} onValue={setFrom} />
        <IconButton>
          <SwapVertIcon />
        </IconButton>
        <ConverterInput value={from} onValue={setFrom} />
      </Box>
    </div>
  );
};

export default Home;
