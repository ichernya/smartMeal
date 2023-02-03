import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import './Checkbox.css';

// eslint-disable-next-line require-jsdoc
export default function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const children = (
    <Box sx={{display: 'flex', flexDirection:
      'column', ml: 3, gap: 1, mt: 1}}>
      <FormControlLabel
        label="Protein"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            onChange={handleChange1}
          />
        }
      />
    </Box>
  );

  return (
    <div id="list">
      <FormControlLabel
        label='Groceries'
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />}
      />
      {children}
    </div>
  );
}
