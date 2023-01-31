import * as React from 'react';
import Grid from '@mui/material/Grid';
import HeaderBar from './Subcomp_Landing/HeaderBar';
import ScreenshotCard from './Subcomp_Landing/ScreenshotCard';
import { Card, Paper, Typography } from '@mui/material';
import './LandingPage.css';

// eslint-disable-next-line require-jsdoc
function Header() {
    return (
        <HeaderBar/>
    );
}

// eslint-disable-next-line require-jsdoc
function LandingPage() {
  return (
    <div className='root' style={{backgroundImage: `url(https://t4.ftcdn.net/jpg/03/78/97/59/360_F_378975954_G39M4ptXAjxKy80gbBIEo0wqBkk89gBF.jpg)`}}>
      <Header/>
      <Grid container spacing={3} component="main" direction="row" paddingTop={1} paddingLeft={2}>
        <Grid item xs={8}>
            <Typography component="h1" variant="h5" id="infoSection">
              Info Section
            </Typography>
            <Typography>
              SmartMeal is a full stack web application that allows users to create/save meal plans and generate grocery lists <br/>
              Users are given the opportunity to move away from sporadic buying and instead buy in bulk with a plan in mind <br/>
              Will save users time, by giving a clear and concise grocery list with stores to visit provided
            </Typography>
        </Grid>
        <Grid item xs={3}/>
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
