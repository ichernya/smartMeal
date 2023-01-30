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
      '&:focus': {
        'width': '20ch',
      },
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
  const {width, cardSize, search, setSearch} =
    React.useContext(props['HomeContext']);

  const searchInput = (event) => {
    const {value} = event.target;
    setSearch(value);
  };

  return (
    <Toolbar
      style={{width: width >= 1200 ?
        (cardSize.current * 7) + (16 * 8) : '100%'}}
      className='tools'
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
      <div style={{flex: 1}}/>
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
    </Toolbar>
  );
}

export default Tools;
