import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import SideBar from './SideBar.jsx';


import Homepage from './Homepage/Home';
import './SideBar.css';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const page = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0}>
        <Grid item xs={false} sm={1}>
          <SideBar className='SideBar'/>
        </Grid>
        <Grid item xs={12} sm={11}>
          <Homepage/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default page;
