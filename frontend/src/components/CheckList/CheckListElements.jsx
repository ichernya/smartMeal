import React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Toolbar} from '@mui/material';

import CheckBox from './Checkbox.jsx';

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: '90vh',
}));

const CheckListElement = () => {
  return (
    <Box height={'100vh'}>
      <Toolbar/>
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={12}
      >
        <Grid item xs={5}>
          <Item>1</Item>
        </Grid>
        <Grid item xs={5}>
          <Item>
            <CheckBox/>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckListElement;
