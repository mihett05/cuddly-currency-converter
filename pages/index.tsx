import React from 'react';
import type { NextPage } from 'next';
import { useStore } from 'effector-react';

import { useTheme, useMediaQuery, Box, Grid, IconButton, Typography, Skeleton } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { $converter, setValue, setFrom, setTo, swap } from '../store/converter';

import AmountField from '../components/AmountField';
import CurrencyField from '../components/CurrencyField';
import Loading from '../components/Loading';

import currencies from '../currencies';

const Home: NextPage = () => {
  const store = useStore($converter);
  const theme = useTheme();
  const smMatch = useMediaQuery(theme.breakpoints.up('sm'));

  const isLoaded = Object.keys(store.currencies).length > 0;

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
                <Loading height={80}>
                  <AmountField label="From" value={store.valueFrom} onChange={setValue} />
                </Loading>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  transform: 'translate(0, 25%)',
                }}
              >
                <Loading height={40}>
                  <CurrencyField value={store.from} onChange={setFrom} />
                </Loading>
              </Grid>
              <Grid
                item
                xs={1}
                style={{
                  transform: 'translate(0, 25%)',
                }}
              >
                <Loading height={40}>
                  <IconButton onClick={() => swap()}>
                    <SwapHorizIcon />
                  </IconButton>
                </Loading>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  transform: 'translate(0, 25%)',
                }}
              >
                <Loading height={40}>
                  <CurrencyField value={store.to} onChange={setTo} />
                </Loading>
              </Grid>
            </Grid>
          ) : (
            <>
              <Loading height={50}>
                <AmountField label="From" value={store.valueFrom} onChange={setValue} />
              </Loading>

              <Loading height={50}>
                <CurrencyField value={store.from} onChange={setFrom} />
              </Loading>

              <Box
                style={{
                  textAlign: 'center',
                }}
              >
                <Loading height={40} width={20}>
                  <IconButton onClick={() => swap()}>
                    <SwapVertIcon />
                  </IconButton>
                </Loading>
              </Box>

              <Loading height={50}>
                <CurrencyField value={store.to} onChange={setTo} />
              </Loading>
            </>
          )}
          <Typography variant="h6">
            {isLoaded ? `${store.valueFrom.toFixed(2)} ${fromInfo ? fromInfo.name : store.from} =` : <Skeleton />}
          </Typography>
          <Typography
            variant="h4"
            style={{
              padding: '0.5em 0',
            }}
          >
            {isLoaded ? `${store.valueTo.toFixed(2)} ${toInfo ? toInfo.name : store.to}` : <Skeleton />}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
