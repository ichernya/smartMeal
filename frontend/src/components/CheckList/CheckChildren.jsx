import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const children = (props) => {
  const handleChange1 = (event) => {
    props.setChecked([event.target.checked, event.target.checked]);
  };
  return (
    <Box sx={{display: 'flex', flexDirection:
    'column', ml: 3, gap: 1, mt: 1}}>
      <FormControlLabel
        label={props.name}
        control={
          <Checkbox
            checked={props.checked[0] && props.checked[1]}
            onChange={handleChange1}
          />
        }
      />
    </Box>
  );
};

export default children;
