import React from 'react';
import Grid from '@mui/material/Grid';
import SideBar from './SideBar.jsx';

import Homepage from './Homepage/Home';

const page = () => {
  return (
    <Grid container component="main" direction="row" justifyContent="flex-start"
      alignItems="flex-start" sx={{width: '100%', height: '100vh'}}>
      <Grid item xs={1} >
        <SideBar sx={{height: '100vh'}}/>
      </Grid>
      <Grid item xs={11}>
        <Homepage sx={{height: '100vh'}}/>
      </Grid>
    </Grid>

  );
};

export default page;
