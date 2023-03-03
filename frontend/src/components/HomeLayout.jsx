import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import SideBar from './Sidebar/SideBar.jsx';


import Homepage from './Homepage/Home';
import './Sidebar/SideBar.css';

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
  backgroundColor: '#f3f1fa',
});

// eslint-disable-next-line require-jsdoc
function HomeLayout(props) {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} className='greyBack'>
        <Grid item xs={false} sm={1} md={0.7}>
          <SideBar className='SideBar'/>
        </Grid>
        <Grid item xs={12} sm={11} md={11.3}>
          <Homepage/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default HomeLayout;
