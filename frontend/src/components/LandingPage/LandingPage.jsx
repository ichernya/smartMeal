import * as React from 'react';
import Grid from '@mui/material/Grid';
import HeaderBar from './HeaderBar';
import HeaderButtons from './HeaderButtons';
import ScreenshotCard from './ScreenshotCard';
import ScreenshotCard2 from './ScreenshotCard2';
import {Typography} from '@mui/material';
import './LandingPage.css';

// eslint-disable-next-line require-jsdoc
function LandingPage() {
  return (
    <div className='root'>
      <Grid container spacing={3} component="main" direction="row"
        paddingTop={1} paddingLeft={2} paddingRight={2} paddingBottom={1}>
        <Grid item xs={6} md={8}>
          <HeaderBar/>
        </Grid>
        <Grid item xs={6} md={4} display={{xs: 'block', md: 'block'}}>
          <HeaderButtons/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography component="h1" variant="h5"
            id="infoSection" align='center'>
            You can create and save your own
            meal plan and generate a grocery list from it!
          </Typography>
          <Typography component="h1" variant="h5" id="infoSection">
            You can now move away from sporadic buying
            and instead buy in bulk with a plan in mind!
          </Typography>
          <Typography component="h1" variant="h5" id="infoSection">
            This will save your time! You will have a clear
            and concise grocery list with stores to visit provided
          </Typography>
        </Grid>
        <Grid item md={4} display={{xs: 'none', md: 'block'}}></Grid>
        <Grid item xs={6} md={4}>
          <ScreenshotCard/>
        </Grid>
        <Grid item xs={6} md={4}>
          <ScreenshotCard2/>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
