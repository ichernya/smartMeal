import React from 'react';
import Grid from '@mui/material/Grid';
import SideBar from './Sidebar/SideBar.jsx';
import {Toolbar} from '@mui/material';
import CheckListElement from './CheckList/CheckListElements.jsx';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {useMeals} from './MealContextProvider.jsx';
import './Sidebar/SideBar.css';
import './colors.css';
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
 * @return {object}
 */
function ChecklistPage() {
  const {WEEK} = useMeals();

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} minHeight={'100vh'} className='greyBack'>
        <Grid item xs={false} sm={1} md={0.7}>
          <SideBar className='SideBar'/>
        </Grid>
        <Grid item xs={12} sm={11} md={11.3}>
          <Toolbar sx={{marginBottom: '1vh', justifyContent: 'center'}}>
            {WEEK}
          </Toolbar>
          <CheckListElement/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ChecklistPage;
