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

export default function HeaderBar() {
  return (
    <Box className="headerBox" sx={{
      flexGrow: 1
      }}>
      <AppBar class="appBar" position='static'>
        <Toolbar>
          {/* Put here our logo */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div className='title'>
              SMARTMEAL
            </div>
          </Typography>
          <Link to='/login' className='link'>
            <Button variant="contained">Login</Button>
          </Link>
          <Link to='/signup' className='link'>
            <Button variant="contained">Sign Up</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>  
  );
}

