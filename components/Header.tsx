import React, { useContext, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import TranslateIcon from '@mui/icons-material/Translate';

import { ColorModeContext } from '../contexts/color-mode';

function Header() {
  const colorMode = useContext(ColorModeContext);
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);
  const changeLangAndClose = (lang: string) => {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div">
          {t('name')}
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
            aria-controls="i18n-menu"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <TranslateIcon />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            id="i18n-menu"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                changeLangAndClose('en');
              }}
            >
              English
            </MenuItem>
            <MenuItem
              onClick={() => {
                changeLangAndClose('ru');
              }}
            >
              Русский
            </MenuItem>
          </Menu>
          <Tooltip title={t('toggleColor').toString()}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {
                colorMode.toggleTheme();
              }}
            >
              <LightModeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('github').toString()}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {
                window.open('https://github.com/mihett05/cuddly-currency-converter');
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
