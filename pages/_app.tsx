import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Yet another one currency converter on React and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
