import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import './SubComp.css';
import Logo from '../../assets/CroppedLogo.png';
/**
 * @return {object}
 */
export default function HeaderBar() {
  return (
    <Box sx={{
      flexGrow: 1,
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
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <div className='title'>
              SMARTMEAL
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

