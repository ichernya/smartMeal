import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';

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

// eslint-disable-next-line require-jsdocZZ
function Filter(props) {
  const {setDrawer, setFilter, filters, setAlignment, alignments} =
    React.useContext(props['HomeContext']);

  const handleChange = (name) => {
    let copy = {...filters};
    delete copy[name];
    setFilter({...copy});
    copy = {...alignments};
    copy[name] = 'default';
    setAlignment({...copy});
  };

  return (
    <div
      className='filter'
    >
      <FormControl sx={{m: 1, width: '100%'}}>
        <InputLabel>Filters</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={Object.keys(filters)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
          {Object.keys(filters).map((name) => (
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
