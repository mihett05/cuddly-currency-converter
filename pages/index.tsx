import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useStore } from 'effector-react';

import { useTheme, useMediaQuery, Box, Grid, IconButton, Typography } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { $converter, convert, setValue, setFrom, setTo, swap, fetchCurrencies } from '../store/converter';

import AmountField from '../components/AmountField';
import CurrencyField from '../components/CurrencyField';

import currencies from '../currencies';

const Home: NextPage = () => {
  const store = useStore($converter);
  const theme = useTheme();
  const smMatch = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(fetchCurrencies, []);

  const isLoaded = Object.keys(store.currencies).length === 0;

  const fromInfo = currencies.find((v) => v.code === store.from);
  const toInfo = currencies.find((v) => v.code === store.to);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          minHeight: '100vh',
        }}
      >
        <Grid item xs={3}>
          {smMatch ? (
            <Grid
              container
              spacing={2}
              style={{
                width: '40vw',
              }}
            >
              <Grid item xs={7}>
                <AmountField label="From" value={store.valueFrom} onChange={setValue} />
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  transform: 'translate(0, 25%)',
                }}
              >
                <CurrencyField value={store.from} onChange={setFrom} />
              </Grid>
              <Grid
                item
                xs={1}
                style={{
                  transform: 'translate(0, 25%)',
                }}
              >
                <IconButton onClick={() => swap()}>
                  <SwapHorizIcon />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  transform: 'translate(0, 25%)',
                }}
              >
                <CurrencyField value={store.to} onChange={setTo} />
              </Grid>
            </Grid>
          ) : (
            <>
              <AmountField label="From" value={store.valueFrom} onChange={setValue} />
              <CurrencyField value={store.from} onChange={setFrom} />
              <Box
                style={{
                  textAlign: 'center',
                }}
              >
                <IconButton onClick={() => swap()}>
                  <SwapVertIcon />
                </IconButton>
              </Box>
              <CurrencyField value={store.to} onChange={setTo} />
            </>
          )}
          <Typography variant="h6">
            {store.valueFrom.toFixed(2)} {fromInfo ? fromInfo.name : store.from} =
          </Typography>
          <Typography
            variant="h4"
            style={{
              padding: '0.5em 0',
            }}
          >
            {store.valueTo.toFixed(2)} {toInfo ? toInfo.name : store.to}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
