import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './SubComp.css';
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

