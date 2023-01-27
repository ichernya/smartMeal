import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


// eslint-disable-next-line require-jsdoc
function LandingPage() {
  return (
    <Box sx={{display: 'flex'}}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            sx={{display: {sm: 'none'}}}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{flexGrow: 1}} />
          <Button sx={{color: '#fff'}}>
            <Typography fontWeight="bold">
            </Typography>
          </Button>
          <Box sx={{flexGrow: 1}} />
          <Button sx={{color: '#fff'}} >
              About
          </Button>
          <IconButton
            size="large"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
          >
            <LinkedInIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={true}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            'display': {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
            },
          }}
        >
        </Drawer>
      </Box>
    </Box>
  );
}

export default LandingPage;
