/* eslint-disable no-unused-vars */
import React from 'react';
import {styled, alpha} from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ReorderIcon from '@mui/icons-material/Reorder';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import Filter from './Filter/Filter.jsx';
import './Tools.css';

export const Search = styled('div')(({theme}) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    'backgroundColor': alpha(theme.palette.common.white, 0.25),
  },
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('sm')]: {
    'marginLeft': theme.spacing(1),
    'width': 'auto',
  },
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
  'color': 'inherit',
  '& .MuiInputBase-input': {
    'padding': theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    'paddingLeft': `calc(1em + ${theme.spacing(4)})`,
    'paddingRight': `calc(1em + ${theme.spacing(4)})`,
    'transition': theme.transitions.create('width'),
    'width': 'inherit',
    [theme.breakpoints.up('sm')]: {
      'width': 'inherit',
    },
  },
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
  'padding': theme.spacing(0, 2),
  'height': '100%',
  'position': 'absolute',
  'pointerEvents': 'none',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
}));

// eslint-disable-next-line require-jsdoc
function Tools(props) {
  const {width, cardSize, search, setSearch, setDrawer,
    filters, setFilter, alignments, setAlignment,
  } = React.useContext(props['HomeContext']);

  const searchInput = (event) => {
    const {value} = event.target;
    setSearch(value);
  };

  const handleClear = () => {
    setFilter({});
    const copy = {...alignments};
    for (const category of Object.keys(copy)) {
      for (const name of Object.keys(copy[category])) {
        copy[category][name] = 'default';
      }
    }
    setAlignment({...copy});
  };


  return (
    <Toolbar
      className='tools'
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className='splitGrid'
      >
        <Search id='search'>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <IconButton
            onClick={() => setSearch('')}
            id='cancelSearch'
            sx={{
              visibility: !search ? 'hidden' : '',
            }}
          >
            <CloseIcon/>
          </IconButton>
          <StyledInputBase
            className='searchInput'
            placeholder="Search…"
            inputProps={{'aria-label': 'search', 'width': 'inherit'}}
            onChange={searchInput}
            value={search}
          />
        </Search>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className='splitGrid filtering'
      >
        <Filter HomeContext={props['HomeContext']}/>
        <div className='stretch'/>
        <IconButton
          color="secondary"
          onClick={() => setDrawer(true)}
        >
          <FilterAltIcon/>
        </IconButton>

        <IconButton
          color="secondary"
        >
          <RefreshIcon/>
        </IconButton>
        <IconButton
          color="secondary"
        >
          <ReorderIcon/>
        </IconButton>
      </Grid>
    </Toolbar>
  );
}

export default Tools;
