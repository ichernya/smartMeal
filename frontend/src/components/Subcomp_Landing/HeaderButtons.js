import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './SubComp.css'

export default function HeaderButtons() {
  return (
    <Box class="headerButton" sx={{
      flexGrow: 1
      }}>
      <AppBar class="appBar" position='static'>
        <Toolbar id='buttons'>
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