import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import './SubComp.css';

/**
 * @return {object}
 */
export default function HeaderButtons() {
  return (
    <Box sx={{
      flexGrow: 10,
      float: 'right',
    }}
    >
      <AppBar class="appBar" position='static'>
        <Toolbar id='toolbarButtons'>
          <Link to='/login' className='link'>
            <Button variant="contained"
              sx={{backgroundColor: `rgba(40,187,183,255)`}}>
                Login
            </Button>
          </Link>
          <Link to='/signup' className='link'>
            <Button variant="contained"
              sx={{backgroundColor: `rgba(40,187,183,255)`, minWidth: 95}}>
              Sign Up
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
