import React from 'react';
import Grid from '@mui/material/Grid';
import SideBar from '../SideBar.jsx';
import {Toolbar} from '@mui/material';
import CheckListElement from './CheckListElements.jsx';

import '../SideBar.css';

const page = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={false} md={1} lg={1}>
        <SideBar className='SideBar'/>
      </Grid>
      <Grid item xs={12} md={11} lg={11}>
        <Toolbar>
          List of List Elements of List Elements Checked
        </Toolbar>
        <CheckListElement />
      </Grid>
    </Grid>
  );
};

export default page;
