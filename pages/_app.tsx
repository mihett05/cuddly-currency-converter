import React, { useMemo, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { PaletteOptions, ScopedCssBaseline, ThemeOptions, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

import '../styles/globals.css';

import { ColorModeContext } from '../contexts/color-mode';

const basePalette: PaletteOptions = {
  primary: {
    main: '#46966f',
  },
  secondary: {
    main: '#f50057',
  },
  background: {},
};

function MyApp({ Component, pageProps }: AppProps) {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...basePalette,
          mode: colorMode,
        },
      }),
    [colorMode],
  );
  return (
    <>
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Yet another one currency converter on React and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorModeContext.Provider
        value={{
          mode: colorMode,
          toggleTheme: () => {
            setColorMode(theme.palette.mode === 'dark' ? 'light' : 'dark');
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <ScopedCssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
export default MyApp;
