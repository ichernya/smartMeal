import * as React from 'react';
import {useTheme} from '@mui/material/styles';
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
import TextField from '@mui/material/TextField';


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


// eslint-disable-next-line require-jsdoc
function getStyles(name, tags, theme) {
  return {
    fontWeight:
      Object.keys(tags).indexOf(name) === -1 ?
        theme.typography.fontWeightRegular :
        theme.typography.fontWeightMedium,
  };
}

// eslint-disable-next-line require-jsdoc
function Filter(props) {
  const {setDrawer, setTags, tags, setAlignment, alignments} =
    React.useContext(props['HomeContext']);
  const theme = useTheme();

  const handleClear = () => {
    setTags({});
    const copy = {...alignments};
    for (const key of Object.keys(alignments)) {
      copy[key] = 'default';
    }
    setAlignment({...copy});
  };

  const handleChange = (name) => {
    console.log(name);
    let copy = {...tags};
    delete copy[name];
    setTags({...copy});
    copy = {...alignments};
    copy[name] = 'default';
    setAlignment({...copy});
  };

  return (
    <div
      className='filter'
    >
      <FormControl sx={{m: 1, width: 300}}>
        <InputLabel>Filters</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={Object.keys(tags)}
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
          {Object.keys(tags).map((name) => (
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

      <IconButton
        color="secondary"
        onClick={() => {
          setDrawer(true);
          setAlignment;
        }}
      >
        <FilterAltIcon/>
      </IconButton>

      <IconButton
        color="secondary"
        style={{display: Object.keys(tags).length > 0 ? '' : 'none'}}
        onClick={handleClear}
      >
        <DeleteIcon/>
      </IconButton>
    </div>
  );
}

export default Filter;
