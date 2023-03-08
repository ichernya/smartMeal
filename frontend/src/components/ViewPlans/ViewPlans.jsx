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
import ContentPasteIcon from '@mui/icons-material/ContentPaste';


import './ViewPlans.css';


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


// Query for meal plans based on a search query
const searchPlans = (query, setPlans) => {
  const item = localStorage.getItem('user');
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/publicMeal?mealName=${query}`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      setPlans(json);
    });
};

// Grabs all the images for a day
function grabImages(data) {
  console.log(data);
  const images = [];
  if (!data['mealweek']) {
    // Should never happen ideally
    return;
  }

  for (const [key, day] of Object.entries(data['mealweek'])) {
    if (key === 'id') {
      continue;
    }
    for (const meal of Object.values(day)) {
      images.push(meal['imagedata']);
    }
  }
  return images;
}


/**
 * Represents the ability to change pages
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
 * Represents meal plans
 * @param {Object} props
 * @return {JSX} Jsx
 */
function ViewMeals(props) {
  const {width} = useDimensions();
  // Represents what page the user is on
  const [page, setPage] = React.useState(0);
  // Represents what the user searched for
  const [mealSearch, setMealSearch] = React.useState('');
  // User's choice for number of meals displayed per page
  const [mealsPerPage, setMealsPerPage] = React.useState(5);
  // Represents whether to display user specific meals or all meals
  const [publicMeals, setPublic] = React.useState(true);
  // imgs is the list of recipes for the plan
  // data is the meal plan data to send back to calendar
  // TODO should be a db query
  const dd =
      [
        {
          'firstday': '2023-02-19',
          'mealname': 'Test Meal',
          'public': true,
          'mealweek': {
            'id': '1',
            '2023-02-19': {
              'lunch': {
                'recipeid': 2,
                'dishname': 'Chicken Parmesan',
                'ingredients': [
                  'Chicken Breast',
                  'Parmesan',
                  'Pasta',
                  'Butter',
                ],
                'ingredientam': 4,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': true,
                'kosher': true,
              },
              'dinner': {
                'recipeid': 3,
                'dishname': 'Cheeseburger',
                'ingredients': [
                  'Beef Patty',
                  'Buns',
                  'American Cheddar',
                  'Lettuce',
                  'Pickels',
                  'Mayonaise',
                  'Ketchup',
                ],
                'ingredientam': 7,
                'imagedata': '/backend/images/cheeseburger.png',
                'vegan': false,
                'halal': true,
                'healthy': false,
                'kosher': true,
              },
              'breakfast': {
                'recipeid': 1,
                'dishname': 'Mushroom Poppers',
                'ingredients': [
                  'Baby Bella Mushrooms',
                  'Cheese',
                  'Jalepeno',
                ],
                'ingredientam': 3,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': false,
                'kosher': true,
              },
            },
            '2023-02-20': {
              'lunch': {
                'recipeid': 3,
                'dishname': 'Cheeseburger',
                'ingredients': [
                  'Beef Patty',
                  'Buns',
                  'American Cheddar',
                  'Lettuce',
                  'Pickels',
                  'Mayonaise',
                  'Ketchup',
                ],
                'ingredientam': 7,
                'imagedata': '/backend/images/cheeseburger.png',
                'vegan': false,
                'halal': true,
                'healthy': false,
                'kosher': true,
              },
              'dinner': {
                'recipeid': 1,
                'dishname': 'Mushroom Poppers',
                'ingredients': [
                  'Baby Bella Mushrooms',
                  'Cheese',
                  'Jalepeno',
                ],
                'ingredientam': 3,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': false,
                'kosher': true,
              },
              'breakfast': {
                'recipeid': 2,
                'dishname': 'Chicken Parmesan',
                'ingredients': [
                  'Chicken Breast',
                  'Parmesan',
                  'Pasta',
                  'Butter',
                ],
                'ingredientam': 4,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': true,
                'kosher': true,
              },
            },
            '2023-02-21': {
              'lunch': {
                'recipeid': 3,
                'dishname': 'Cheeseburger',
                'ingredients': [
                  'Beef Patty',
                  'Buns',
                  'American Cheddar',
                  'Lettuce',
                  'Pickels',
                  'Mayonaise',
                  'Ketchup',
                ],
                'ingredientam': 7,
                'imagedata': '/backend/images/cheeseburger.png',
                'vegan': false,
                'halal': true,
                'healthy': false,
                'kosher': true,
              },
              'dinner': {
                'recipeid': 4,
                'dishname': 'Pepperoni Pizza',
                'ingredients': [
                  'Pizza Dough',
                  'Pepperoni',
                  'Mozzarella Cheese',
                ],
                'ingredientam': 3,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': false,
                'healthy': false,
                'kosher': false,
              },
              'breakfast': {
                'recipeid': 2,
                'dishname': 'Chicken Parmesan',
                'ingredients': [
                  'Chicken Breast',
                  'Parmesan',
                  'Pasta',
                  'Butter',
                ],
                'ingredientam': 4,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': true,
                'kosher': true,
              },
            },
            '2023-02-22': {
              'lunch': {
                'recipeid': 1,
                'dishname': 'Mushroom Poppers',
                'ingredients': [
                  'Baby Bella Mushrooms',
                  'Cheese',
                  'Jalepeno',
                ],
                'ingredientam': 3,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': false,
                'kosher': true,
              },
              'dinner': {
                'recipeid': 4,
                'dishname': 'Pepperoni Pizza',
                'ingredients': [
                  'Pizza Dough',
                  'Pepperoni',
                  'Mozzarella Cheese',
                ],
                'ingredientam': 3,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': false,
                'healthy': false,
                'kosher': false,
              },
              'breakfast': {
                'recipeid': 2,
                'dishname': 'Chicken Parmesan',
                'ingredients': [
                  'Chicken Breast',
                  'Parmesan',
                  'Pasta',
                  'Butter',
                ],
                'ingredientam': 4,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': true,
                'kosher': true,
              },
            },
            '2023-02-23': {
              'lunch': {
                'recipeid': 1,
                'dishname': 'Mushroom Poppers',
                'ingredients': [
                  'Baby Bella Mushrooms',
                  'Cheese',
                  'Jalepeno',
                ],
                'ingredientam': 3,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': false,
                'kosher': true,
              },
              'dinner': {
                'recipeid': 1,
                'dishname': 'Mushroom Poppers',
                'ingredients': [
                  'Baby Bella Mushrooms',
                  'Cheese',
                  'Jalepeno',
                ],
                'ingredientam': 3,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': false,
                'kosher': true,
              },
              'breakfast': {
                'recipeid': 1,
                'dishname': 'Mushroom Poppers',
                'ingredients': [
                  'Baby Bella Mushrooms',
                  'Cheese',
                  'Jalepeno',
                ],
                'ingredientam': 3,
                'imagedata': '/test.png',
                'vegan': false,
                'halal': true,
                'healthy': false,
                'kosher': true,
              },
            },
          },
        },
      ];


  const [list, setList] = React.useState(dd ? dd : []);

  React.useEffect(() => {
    if (mealSearch) {
      searchPlans(mealSearch, setList);
    }
  }, [mealSearch]);

  // Update search bar query
  const searchInput = (event) => {
    const {value} = event.target;
    setMealSearch(value);
  };

  React.useEffect(() => {
    // Reset the page if the current page cant fit on the screen width
    // if the current page is larger than the max page number for
    // the screen width
    if (width > 800 &&
      Math.ceil(list.length / (width < 800 ? 1 : 2) / mealsPerPage) <= (page)) {
      setPage(0);
    }
  }, [width, setPage, mealsPerPage, page, list.length]);

  // Changing the number of meals displayed per page
  const handleChangeMealsPerPage = (event) => {
    setMealsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // changing page
  const pageChange = (event, newPage) => {
    setPage(newPage);
  };

  // changes the meal plans in current view to user specific or all plans
  const changeView = () => {
    setPublic(!publicMeals);
    // TODO
    if (!publicMeals) {
      // View only user specific meals
      setList(list);
    } else {
      // View all meal plans
      setList(list);
    }
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
          <FormControlLabel
            id='privateToggle'
            control={
              <Switch
                checked={publicMeals}
                onChange={changeView}
                name="Public Meals"
              />
            }
            labelPlacement="top"
            label="Public Meals"
          />
        </Toolbar>
        <div>
          {list && list.slice(page * mealsPerPage, page * mealsPerPage + mealsPerPage)
            .map((_, index) => {
              let meal1 = list[(index * 2) + (page * (mealsPerPage * 2))];
              const meal2 = list[(index * 2) + 1 + (page * (mealsPerPage * 2))];
              if (width < 800) {
                meal1 = list[index + (page * mealsPerPage)];
              }
              if (!meal1 && !meal2) {
                return <div key={meal1 + meal2 + index.toString()}/>;
              }
              return (
                <Grid container
                  className='planRow aliceBlueBack'
                  columns={12}
                  key={meal1 + meal2 + index.toString()}
                >
                  <Grid item xs={2.75} sm={1.25}>
                    <Typography
                      variant='h6'
                      className='planName'
                    >
                      {meal1['mealname']}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1.25}
                    sm={0.75}
                    className='copy'
                  >
                    <IconButton className='copy'>
                      <ContentPasteIcon/>
                    </IconButton>
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
                      {grabImages(meal1)
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
                                alt={`img${ind.toString()}`}
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
                    sm={1.25}
                    style={{
                      display: (width < 800 || !meal2) ? 'none' : '',
                    }}
                  >
                    <Typography
                      variant='h6'
                      className='planName'
                    >
                      {meal2 && meal2['mealname']}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={0.75}
                    style={{
                      display: (width < 800 || !meal2) ? 'none' : '',
                    }}
                    className='copy'
                  >
                    <IconButton className='copy'>
                      <ContentPasteIcon/>
                    </IconButton>
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
                      {meal2 ? (grabImages(meal2)
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
            [5, 10, 25, {label: 'All', value: list.length}]
          }
          component='div'
          count={Math.ceil(list.length / (width < 800 ? 1 : 2))}
          rowsPerPage={mealsPerPage}
          page={(width > 800 &&
            Math.ceil(list.length / (width < 800 ? 1 : 2) / mealsPerPage) <=
            ((page))) ? 0 : page}
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
