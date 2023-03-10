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

/**
 * Represents the display for the currently chosen tags/filters
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Filter(props) {
  const {setDrawer, setAlignment, alignments} =
    React.useContext(props['HomeContext']);

  const handleChange = (name) => {
    const copy = {...filters};
    delete copy[name];
    setAlignment({...alignments, [name]: 'no'});
  };

  return (
    <div
      className='filter'
    >
      <FormControl sx={{m: 1, width: '100%'}}>
        <Select
          multiple
          value={Object.keys(alignments).filter((key) => alignments[key] === 'yes')}
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
          {Object.keys(alignments).filter((key) => alignments[key] === 'yes')
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
