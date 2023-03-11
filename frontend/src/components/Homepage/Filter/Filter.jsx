import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import './Filter.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Updates a diet filter
const updateDietFilter = (diet, value) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const userId = person ? person.userid : '';
  if (!userId || !bearerToken) {
    // User has not logged in or has timeed out
    return;
  }

  const body = {
    'mealsid': userId,
    'dietTag': diet,
    'newValue': value,
  };

  fetch(`http://localhost:3010/v0/diets`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  });
};


/**
 * Represents the display for the currently chosen tags/filters
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Filter(props) {
  const {setDrawer, setAlignment, alignments} =
    React.useContext(props['HomeContext']);

  const handleChange = (name) => {
    updateDietFilter(name, false);
    setAlignment({...alignments, [name]: false});
  };

  return (
    <div
      className='filter'
    >
      <FormControl sx={{m: 1, width: '100%'}}>
        <Select
          multiple
          value={Object.keys(alignments).filter((key) => alignments[key])}
          input={<OutlinedInput id="select-multiple-chip"/>}
          renderValue={(selected) => (
            <Box
              className='tags'
              onClick={() => setDrawer(true)}
            >
              {selected.map((name) =>
                <Chip key={name} label={name}/>,
              )}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Object.keys(alignments).filter((key) => alignments[key])
            .map((name) => (
              <MenuItem
                key={name}
                value={name}
                onClick={() => handleChange(name)}
              >
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

    </div>
  );
}

export default Filter;
