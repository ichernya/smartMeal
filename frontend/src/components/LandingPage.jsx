import * as React from 'react';
import Grid from '@mui/material/Grid';
import HeaderBar from './Subcomp_Landing/HeaderBar';
import HeaderButtons from './Subcomp_Landing/HeaderButtons';
import ScreenshotCard from './Subcomp_Landing/ScreenshotCard';
import { Card, Paper, Typography } from '@mui/material';
import './LandingPage.css';


// eslint-disable-next-line require-jsdoc
function LandingPage() {
  return (
    <div className='root' style={{backgroundImage: `url(https://t4.ftcdn.net/jpg/03/78/97/59/360_F_378975954_G39M4ptXAjxKy80gbBIEo0wqBkk89gBF.jpg)`}}>
      <Grid container spacing={3} component="main" direction="row" paddingTop={1} paddingLeft={2}>
        <Grid item xs={8}>
            <HeaderBar/>
            <Typography component="h1" variant="h5" id="infoSection">
              You can create and save your own meal plan and generate a grocery list from it!
            </Typography>
            <Typography component="h1" variant="h5" id="infoSection">
              You can now move away from sporadic buying and instead buy in bulk with a plan in mind!
            </Typography>
            <Typography component="h1" variant="h5" id="infoSection">
              This will save your time! You will have a clear and concise grocery list with stores to visit provided 
            </Typography>
        </Grid>
        <Grid item xs={4}>
            <HeaderButtons/>
        </Grid>
        <Grid item xs={4}>
          <ScreenshotCard/>
        </Grid>
        <Grid item xs={4}>
          <ScreenshotCard/>
        </Grid>
      </Grid>
    </div>
  );
}   

export default LandingPage;
