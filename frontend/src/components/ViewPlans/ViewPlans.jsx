/* eslint-disable no-unused-vars */
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
import {useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {useDimensions} from '../DimensionsProvider.jsx';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import parsePlanData from '../parser.jsx';
import {useMeals} from '../MealContextProvider.jsx';
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
const searchPlans = (query, setPlans, publicMeals) => {
  const item = localStorage.getItem('user');
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  const userId = user ? user.userid : '';

  let endpoint = `http://localhost:3010/v0/publicMeal?public=${publicMeals}`;
  if (!publicMeals) {
    endpoint += `&mealsid=${userId}`;
  }

  if (query) {
    endpoint += `&mealName=${query}`;
  }

  fetch(endpoint, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        // No meals that match the query
        return [];
      }
      return response.json();
    })
    .then((json) => {
      setPlans(json);
    });
};

// Grabs all the images for a day
const grabImages = (data) => {
  const images = [];
  if (!data['mealweek']) {
    // Should never happen ideally
    // when garbage data that is not in the correct format
    return images;
  }

  for (const [key, day] of Object.entries(data['mealweek'])) {
    if (key === 'id') {
      // Ignore the recipe's id
      continue;
    }
    for (const meal of Object.values(day)) {
      // There exists a meal at this time and date
      if (meal !== '0') {
        images.push(meal['imagedata']);
      }
    }
  }
  return images;
};

// Replaces the user's current plan with the chosen plan
const updateCurrentPlan = (data, firstDay) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const userId = person ? person.userid : '';

  // Formatted string of the first day of the week
  const dateChange = new Date(firstDay);
  let month = dateChange.getMonth() + 1;
  let day = dateChange.getDate();
  const year = dateChange.getFullYear();
  console.log(dateChange);
  if (parseInt(month) < 10) {
    month = '0' + month;
  }
  if (parseInt(day) < 10) {
    day = '0' + day;
  }
  const startIso = `${year}-${month}-${day}`;


  // First day of the week of the plan we're copying
  const [copyY, copyM, copyD] = data['firstday'].split('-');
  const firstCopyDay = new Date(copyY, copyM - 1, copyD);

  for (let ind = 0; ind < 7; ind++) {
    // day of the week of the plan we're copying
    let currentCopyM = firstCopyDay.getMonth() + 1;
    let currentCopyD = firstCopyDay.getDate();
    const currentCopyY = firstCopyDay.getFullYear();
    if (parseInt(currentCopyM) < 10) {
      currentCopyM = '0' + currentCopyM;
    }
    if (parseInt(currentCopyD) < 10) {
      currentCopyD = '0' + currentCopyD;
    }
    const currentCopyDate = `${currentCopyY}-${currentCopyM}-${currentCopyD}`;


    let currentM = dateChange.getMonth() + 1;
    let currentD = dateChange.getDate();
    const currentY = dateChange.getFullYear();
    if (parseInt(currentM) < 10) {
      currentM = '0' + currentM;
    }
    if (parseInt(currentD) < 10) {
      currentD = '0' + currentD;
    }
    const changeDate = `${currentY}-${currentM}-${currentD}`;
    // Clear day of week
    if (!data['mealweek'][currentCopyDate]) {
      // format the changes in the format needed for backend
      const bodyStringified =
        `{'breakfast': '0', ` +
        `'lunch': '0', ` +
        `'dinner': '0'}`;

      const body = {
        'mealsid': userId,
        'dayof': `{${changeDate}}`,
        'firstDay': startIso,
        'changes': bodyStringified,
      };

      fetch(`http://localhost:3010/v0/meals`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),
      });
      dateChange.setDate(dateChange.getDate() + 1);
      firstCopyDay.setDate(firstCopyDay.getDate() + 1);
      continue;
    }
    const meals = data['mealweek'][currentCopyDate];

    // updated data in the formatted needed by backend
    const update = {
      'breakfast': '0',
      'lunch': '0',
      'dinner': '0',
    };

    for (const [time, meal] of Object.entries(meals)) {
      // add the meal id for the specific time/day of the week
      update[time] = `${meal['recipeid']}`;
      if (update[time] === 'undefined') {
        update[time] = '0';
      }
    }

    // format the changes in the format needed for backend
    const bodyStringified =
      `{'breakfast': '${update['breakfast']}', ` +
      `'lunch': '${update['lunch']}', ` +
      `'dinner': '${update['dinner']}'}`;

    const body = {
      'mealsid': userId,
      'dayof': `{${changeDate}}`,
      'firstDay': startIso,
      'changes': bodyStringified,
    };

    fetch(`http://localhost:3010/v0/meals`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    });
    dateChange.setDate(dateChange.getDate() + 1);
    firstCopyDay.setDate(firstCopyDay.getDate() + 1);
  }
};


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
        id='first'
        sx={{display: {xs: 'none', md: 'inline-flex'}}}
      >
        {theme.direction === 'rtl' ?
          <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        id='prev'
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ?
          <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        id='next'
        aria-label='next page'
      >
        {theme.direction === 'rtl' ?
          <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
        id='last'
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
  const {setPlan, startWeek, mealPlan} = useMeals();
  const history = useNavigate();
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
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    // Update plans if
    // A plan was renamed
    // The user searched something
    // The user set to private/public
    searchPlans(mealSearch, setList, publicMeals);
  }, [mealSearch, publicMeals, mealPlan]);

  // Update search bar query
  const searchInput = (event) => {
    const {value} = event.target;
    setMealSearch(value);
  };

  // clear search bar
  const clearSearch = () => {
    setMealSearch('');
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
  };

  // Copy over the selected meal plan to the current meal plan
  const onSelectPlan = (data) => {
    parsePlanData(setPlan, data, mealPlan['mealname']);
    updateCurrentPlan(data, startWeek);
    history('/home');
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
            View Plans
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
              onClick={clearSearch}
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
              id='planSearch'
              inputProps={{'aria-label': 'search', 'width': 'inherit'}}
              onChange={searchInput}
              value={mealSearch}
            />
          </Search>
          <FormControlLabel
            id='privateToggle'
            control={
              <Switch
                id='privated'
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
          {list &&
            list.slice(page * mealsPerPage, page * mealsPerPage + mealsPerPage)
              .map((_, index) => {
                let meal1 = list[(index * 2) + (page * (mealsPerPage * 2))];
                const meal2 =
                  list[(index * 2) + 1 + (page * (mealsPerPage * 2))];
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
                      <div className='planName'>
                        {meal1['mealname']}
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={1.25}
                      sm={0.75}
                      className='copy'
                    >
                      <IconButton
                        className='copy'
                        id={(meal1 &&
                           `copy${meal1['mealname']}${(index * 2) +
                             (page * (mealsPerPage * 2))}`) || ''}
                        onClick={() => onSelectPlan(meal1)}
                      >
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
                            if (!img.startsWith('data:')) {
                              img = require('../../assets/templateImage/'+
                                img);
                            }
                            return (
                              <ImageListItem
                                key={img + ind.toString()}
                                className='margins'
                              >
                                <img
                                  src={img}
                                  loading="lazy"
                                  alt={`img${ind.toString()}`}
                                  style={{
                                    width: `97px`,
                                    height: `97px`,
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
                      <div className='planName'>
                        {meal2 && meal2['mealname']}
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={0.75}
                      style={{
                        display: (width < 800 || !meal2) ? 'none' : '',
                      }}
                      className='copy'
                    >
                      <IconButton
                        className='copy'
                        id={(meal2 &&
                          `copy${meal2['mealname']}${(index * 2) +
                            1 + (page * (mealsPerPage * 2))}`) || ''}
                        onClick={() => onSelectPlan(meal2)}
                      >
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
                            if (!img.startsWith('data:')) {
                              img = require('../../assets/templateImage/'+
                                img);
                            }
                            return (
                              <ImageListItem
                                key={img + '2' + ind.toString()}
                                className='margins'
                              >
                                <img
                                  src={img}
                                  alt={`img${ind.toString()}`}
                                  loading="lazy"
                                  style={{
                                    width: `97px`,
                                    height: `97px`,
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
