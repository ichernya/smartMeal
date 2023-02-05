import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './SubComp.css'
import Logo from '../../assets/CroppedLogo.png'

export default function HeaderBar() {
  return (
    <Box className="headerBox" sx={{
      flexGrow: 1
      }}>
      <AppBar class="appBar" position='static'>
        <Toolbar>
          <IconButton>
            <Box
              component="img"
              sx={{
              height: 65,
              }}
              alt="Logo"
              src={Logo}
            />
          </IconButton>
          <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div className='title'>
              SMARTMEAL 
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>  
  );
}

