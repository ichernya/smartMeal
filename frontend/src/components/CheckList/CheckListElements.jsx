import React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import CheckBox from './Checkbox.jsx';
import DisplayElement from './DisplayElement.jsx';

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '90vh',
  overflow: 'auto',
}));
/**
 * The way the page is formatted for mobile, desktop, and tablet
 *
 * @return {object}
 */
const CheckListElement = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={4}
    >
      <Grid item xs={false} md={5.7} id="leftCheck">
        <Item>
          <DisplayElement/>
        </Item>
      </Grid>
      <Grid item xs={12} md={5.7}>
        <Item>
          <CheckBox/>
        </Item>
      </Grid>
    </Grid>
  );
};

export default CheckListElement;
