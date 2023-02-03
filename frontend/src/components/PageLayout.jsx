import React from 'react';
import Grid from '@mui/material/Grid';
import SideBar from './SideBar.jsx';


import Homepage from './Homepage/Home';
import './SideBar.css';

const page = () => {
  return (
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar className='SideBar'/>
          </Grid>
          <Grid item xs={11}>
            <Homepage/>
          </Grid>
        </Grid>

  );
};

export default page;
