import React from 'react';
import Grid from '@mui/material/Grid';
import SideBar from '../SideBar.jsx';
import {Toolbar} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import CheckListElement from './CheckListElements.jsx';
import '../SideBar.css';

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

/**
 * The way the page is formatted for mobile, desktop, and tablet
 *
 * @return {object}
 */
const ChecklistPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} minHeight={'100vh'}>
        <Grid item xs={false} sm={1}>
          <SideBar className='SideBar'/>
        </Grid>
        <Grid item xs={12} sm={11}>
          <Toolbar>
          List of List Elements of List Elements Checked
          </Toolbar>
          <CheckListElement/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ChecklistPage;
