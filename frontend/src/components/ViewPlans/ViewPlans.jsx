import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Toolbar from '@mui/material/Toolbar';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import {useDimensions} from '../DimensionsProvider.jsx';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


import './ViewPlans.css';


const mealsthing = [
  require('../../assets/chicken.jpeg'),
  require('../../assets/chicken.jpeg'),
  require('../../assets/chicken.jpeg'),
  require('../../assets/chicken.jpeg'),
  require('../../assets/chicken.jpeg'),
  require('../../assets/chicken.jpeg'),
];

const Search = styled('div')(({theme}) => ({
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

const StyledInputBase = styled(InputBase)(({theme}) => ({
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

const SearchIconWrapper = styled('div')(({theme}) => ({
  'padding': theme.spacing(0, 2),
  'height': '100%',
  'position': 'absolute',
  'pointerEvents': 'none',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
}));


/**
 * Represents the page list
 * @param {Object} props
 * @return {JSX} Jsx
 */
function TablePaginationActions(props) {
  const theme = useTheme();
  const {count, page, rowsPerPage, onPageChange} = props;

  const handleFirstPageButtonClick = (event) => {
    // Go to first page
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    // Go to previous page
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    // Go to next page
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    // Go to last page
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{flexShrink: 0, ml: 2.5}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
        sx={{display: {xs: 'none', md: 'inline-flex'}}}
      >
        {theme.direction === 'rtl' ?
          <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ?
          <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ?
          <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
        sx={{display: {xs: 'none', md: 'inline-flex'}}}
      >
        {theme.direction === 'rtl' ?
          <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

/**
 * Represents the list pages
 * @param {Object} props
 * @return {JSX} Jsx
 */
function ViewMeals(props) {
  const {width} = useDimensions();
  // Represents what page the user is on
  const [page, setPage] = React.useState(0);
  // Represents what the user searched for
  const [mealSearch, setMealSearch] = React.useState('');
  // Represents whether to display user specific meals or all meals
  const [privateMeals, setPrivate] = React.useState(false);
  // imgs is the list of recipes for the plan
  // data is the meal plan data to send back to calendar
  // TODO should be a db query
  const [list, setList] = React.useState([
    {'name': 'name', 'imgs': mealsthing, 'data': ''},
    {'name': 'suppper', 'imgs': mealsthing, 'data': ''},
    {'name': 'thing', 'imgs': mealsthing, 'data': ''},
    {'name': 'why', 'imgs': mealsthing.slice(0, 3), 'data': ''},
    {'name': 'suppper', 'imgs': mealsthing, 'data': ''},
    {'name': 'thing', 'imgs': mealsthing, 'data': ''},
    {'name': 'why', 'imgs': mealsthing.slice(0, 3), 'data': ''},
    {'name': 'name', 'imgs': mealsthing, 'data': ''},
    {'name': 'suppper', 'imgs': mealsthing, 'data': ''},
    {'name': 'thing', 'imgs': mealsthing, 'data': ''},
    {'name': 'why', 'imgs': mealsthing.slice(0, 3), 'data': ''},
  ]);

  // Update search bar query
  const searchInput = (event) => {
    const {value} = event.target;
    setMealSearch(value);
  };

  // TODO remove
  if (list != list) {
    setList(list);
  }

  React.useEffect(() => {
    // Reset the page if the current page cant fit on the screen width
    if (width >= 800 && (Math.ceil(list.length / 2) > page)) {
      setPage(0);
    }
  }, [width, setPage]);

  // User's choice for number of meals displayed per page
  const [mealsPerPage, setMealsPerPage] = React.useState(5);

  // Changing the number of meals displayed per page
  const handleChangeMealsPerPage = (event) => {
    setMealsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // changing page
  const pageChange = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <Box
      sx={{width: 'auto', marginLeft: {lg: '0px'}}}
      className='greyColor plans'
    >
      <Paper sx={{width: '100%', mb: 2}}>
        <Toolbar
          id='header'
          className='aliceBlueBack'
          sx={{
            pl: {sm: 2},
            pr: {xs: 1, sm: 1},
            display: (width < 800 ? 'none' : ''),
          }}
        >
          <Typography
            sx={{flex: '1 1 100%'}}
            color="inherit"
            variant="h4"
            component="div"
          >
            numSelected selected
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={privateMeals}
                onChange={() => setPrivate(!privateMeals)}
                name="User's Meals"
              />
            }
            label="User's Meals"
          />
        </Toolbar>
        <Toolbar
          id='header'
          className='aliceBlueBack'
          sx={{
            pl: {sm: 2},
            pr: {xs: 1, sm: 1},
          }}
        >
          <Search id='search'>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <IconButton
              onClick={() => setMealSearch('')}
              id='cancelSearch'
              sx={{
                visibility: !mealSearch ? 'hidden' : '',
              }}
            >
              <CloseIcon/>
            </IconButton>
            <StyledInputBase
              className='searchInput'
              placeholder="Search…"
              inputProps={{'aria-label': 'search', 'width': 'inherit'}}
              onChange={searchInput}
              value={mealSearch}
            />
          </Search>
        </Toolbar>
        <div>
          {list.slice(page * mealsPerPage, page * mealsPerPage + mealsPerPage)
            .map((_, index) => {
              let meal1 = list[(index * 2) + (page * (mealsPerPage * 2))];
              const meal2 = list[(index * 2) + 1 + (page * (mealsPerPage * 2))];
              if (width < 800) {
                meal1 = list[index + (page * mealsPerPage)];
              }
              if (!meal1 && !meal2) {
                return;
              }
              return (
                <Grid container
                  className='planRow aliceBlueBack'
                  columns={12}
                  key={meal1 + meal2 + index.toString()}
                >
                  <Grid item xs={4} sm={2}>
                    <Typography
                      variant='h6'
                      className='planName'
                    >
                      {meal1['name']}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    sm={4}
                    className='colDivider'
                    style={{
                      paddingRight: (width < 800 ? '' : '27px'),
                    }}
                  >
                    <ImageList
                      className='menu planView'
                    >
                      {meal1['imgs']
                        .map((img, ind) => {
                          return (
                            <ImageListItem
                              key={img + ind.toString()}
                              className='margins'
                            >
                              <img
                                src={`${img}w=248&fit=crop&auto=format`}
                                srcSet={
                                  `${img}?w=248&fit=crop&auto=format&dpr=2 2x`
                                }
                                loading="lazy"
                                alt={img + ind.toString()}
                                style={{
                                  width: `100px`,
                                  height: `100px`,
                                }}
                              />
                            </ImageListItem>
                          );
                        })}
                    </ImageList>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    style={{
                      display: (width < 800 || !meal2) ? 'none' : '',
                    }}
                  >
                    <Typography
                      variant='h6'
                      className='planName'
                    >
                      {meal2 && meal2['name']}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={4}
                    style={{
                      display: (width < 800 || !meal2) ? 'none' : '',
                    }}
                    id='imagesPadding'
                  >
                    <ImageList
                      className='menu planView'
                    >
                      {meal2 ? (meal2['imgs']
                        .map((img, ind) => {
                          return (
                            <ImageListItem
                              key={img + '2' + ind.toString()}
                              className='margins'
                            >
                              <img
                                src={`${img}w=248&fit=crop&auto=format`}
                                srcSet={
                                  `${img}?w=248&fit=crop&auto=format&dpr=2 2x`
                                }
                                alt={img + ind.toString()}
                                loading="lazy"
                                style={{
                                  width: `100px`,
                                  height: `100px`,
                                }}
                              />
                            </ImageListItem>
                          );
                        })) :
                        <div/>
                      }

                    </ImageList>
                  </Grid>
                </Grid>
              );
            })}
        </div>
        <TablePagination
          className='aliceBlueBack'
          rowsPerPageOptions={
            [5, 10, 25, {label: 'All', value: mealsthing.length}]
          }
          component='div'
          count={Math.ceil(list.length / (width < 800 ? 1 : 2))}
          rowsPerPage={mealsPerPage}
          page={page}
          onPageChange={pageChange}
          onRowsPerPageChange={handleChangeMealsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </Box>
  );
}


/*
 div planImgs + class
 */

export default ViewMeals;
