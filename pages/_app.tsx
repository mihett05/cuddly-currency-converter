import React, { useEffect, useMemo, useState } from 'react';
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
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let localMode = localStorage.getItem('colorMode');
      if (localMode === null || (localMode !== 'light' && localMode !== 'dark')) {
        localStorage.setItem('colorMode', 'dark');
        setColorMode('dark');
      } else {
        setColorMode(localMode as 'light' | 'dark');
      }
    }
  }, []);

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
            const newColorMode = theme.palette.mode === 'dark' ? 'light' : 'dark';
            setColorMode(newColorMode);
            localStorage.setItem('colorMode', newColorMode);
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
