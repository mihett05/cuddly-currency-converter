import React from 'react';
import type { NextPage } from 'next';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { useTheme, useMediaQuery, Box, Grid, IconButton, Typography, Skeleton, Paper } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { $converter, setValue, setFrom, setTo, swap } from '../store/converter';

import AmountField from '../components/AmountField';
import CurrencyField from '../components/CurrencyField';
import Loading from '../components/Loading';

import currencies from '../currencies';
import Header from '../components/Header';

const Home: NextPage = () => {
  const store = useStore($converter);
  const theme = useTheme();
  const smMatch = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation();

  const isLoaded = Object.keys(store.currencies).length > 0;

  const fromInfo = currencies.find((v) => v.code === store.from);
  const toInfo = currencies.find((v) => v.code === store.to);

  return (
    <>
      <Header />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          <Paper
            sx={{
              paddingTop: 8,
              paddingBottom: 8,
              paddingRight: 4,
              paddingLeft: 4,
            }}
          >
            {smMatch ? (
              <Grid
                container
                spacing={2}
                sx={{
                  width: '60vw',
                }}
              >
                <Grid item xs={7}>
                  <Loading height={80}>
                    <AmountField label={t('from')} value={store.valueFrom} onChange={setValue} />
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
                  sx={{
                    textAlign: 'center',
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
                  <AmountField label={t('from')} value={store.valueFrom} onChange={setValue} />
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
              {isLoaded ? (
                `${store.valueFrom.toFixed(2)}${fromInfo ? fromInfo.symbol_native : ''} ${
                  fromInfo ? fromInfo.name : store.from
                } =`
              ) : (
                <Skeleton />
              )}
            </Typography>
            <Typography
              variant="h4"
              style={{
                padding: '0.5em 0',
              }}
            >
              {isLoaded ? (
                `${store.valueTo.toFixed(2)}${toInfo ? toInfo.symbol_native : ''} ${toInfo ? toInfo.name : store.to}`
              ) : (
                <Skeleton />
              )}
            </Typography>
            <Typography variant="h6">
              {isLoaded && store.lastUpdate !== null ? (
                `${t('lastUpdated')}: ${store.lastUpdate.toLocaleString()}`
              ) : (
                <Skeleton />
              )}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
