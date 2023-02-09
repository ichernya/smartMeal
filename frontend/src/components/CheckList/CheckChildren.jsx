import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import {useMeals} from '../MealContextProvider';

const Children = () => {
  const {ingredients} = useMeals();
  const handleChange = (event) => {
  };
  return (
    <Box sx={{display: 'flex', flexDirection:
    'column', ml: 3, gap: 1, mt: 1}}>
      <FormControlLabel
        label={'s'}
        control={
          <Checkbox
            checked={false}
            onChange={handleChange}
          />
        }
      />
    </Box>
  );
};

export default Children;
