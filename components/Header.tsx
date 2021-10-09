import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ColorModeContext } from '../contexts/color-mode';

function Header() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div">
          Cuddly Currency Converter
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          <IconButton
            size="large"
            color="inherit"
            onClick={() => {
              colorMode.toggleTheme();
            }}
          >
            <LightModeIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => {
              window.open('https://github.com/mihett05/cuddly-currency-converter');
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
