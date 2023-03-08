import React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Divider from '@mui/material/Divider';

import {useMeals} from '../MealContextProvider.jsx';
import './Calendar.css';
import './Home.css';

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


// Queries the database for the meals the user has chosen for the week
const getMealsForWeek = (setMeal, startWeek) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const userId = person ? person.userid : '';
  const start = startWeek.toISOString().split('T')[0];
  if (!userId || !bearerToken) {
    // User has not logged in or has timeed out
    return;
  }
  fetch(
    `http://localhost:3010/v0/meals?dayof=${start}&mealsid=${userId}&firstDay=${start}`, {
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
      const data = json[0]['mealweek'];
      const mealPlan = {'mealname': data['mealname']};
      const daysOfWeek = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];
      const TIMES = ['breakfast', 'lunch', 'dinner'];

      const defaultMeal = {
        'recipeid': 0,
        'dishname': '',
        'ingredients': [
        ],
        'ingredientam': 0,
        'imagedata': '',
        'vegan': false,
        'halal': false,
        'healthy': false,
        'kosher': false,
      };

      const defaultDay = [
        // Breakfast
        {...defaultMeal},
        // Lunch
        {...defaultMeal},
        // Dinner
        {...defaultMeal},
      ];

      // Represents the current day I'm getting the meal data for
      const startDate = new Date(startWeek);


      for (const weekday of daysOfWeek) {
        const dateIso = startDate.toISOString().split('T')[0];

        const mealsForDay = data[dateIso];

        if (mealsForDay) {
          // User has data for this day
          mealPlan[weekday] = [];
          for (const time of TIMES) {
            if (mealsForDay[time]) {
              // User has meal for the specific time of day
              // breakfast, lunch, dinner
              mealPlan[weekday].push({...mealsForDay[time]});
            } else {
              // User doesnt have a meal for the specific time of day
              mealPlan[weekday].push({...defaultMeal});
            }
          }
        } else {
          // User does not have a meal plan for the day
          // they get the default day meal plan
          mealPlan[weekday] = [...defaultDay];
        }

        // Increment to the next day of the week
        startDate.setDate(startDate.getDate() + 1);
      }
      console.log(mealPlan);

      setMeal(mealPlan);
    });
};

// Adds a meal to the week
const addMeal = (mealId, startWeek, mealForDay, weekday) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const userId = person ? person.userid : '';
  if (!userId || !bearerToken) {
    // User has not logged in or has timeed out
    return;
  }

  // The first day of the week
  const startDay = startWeek.toISOString().split('T')[0];

  // The  day of the week that is being updated
  const dateCopy = new Date(startWeek);
  dateCopy.setDate(dateCopy.getDate() + weekday);


  const TIMES = ['breakfast', 'lunch', 'dinner'];

  // updated data in the formatted needed by backend
  const update = {
    'breakfast': '0',
    'lunch': '0',
    'dinner': '0',
  };

  for (const [ind, meal] of Object.entries(mealForDay)) {
    const time = TIMES[ind];
    update[time] = `${meal['recipeid']}`;
  }

  // format the changes in the format needed for backend
  const bodyStringified =
    `{'breakfast': '${update['breakfast']}', ` +
    `'lunch': '${update['lunch']}', ` +
    `'dinner': '${update['dinner']}'}`;

  const body = {
    'mealsid': userId,
    'dayof': `{${dateCopy.toISOString().split('T')[0]}}`,
    'firstDay': startDay,
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
};


/**
 * Represents the display for the current weeks meal plan
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Calendar(props) {
  const {width, cardSize, selectedFood, setSelected, startWeek} =
    React.useContext(props['HomeContext']);
  const {mealPlan, setPlan} = useMeals();

  // Represents the food currently selected from the menu as well as the number
  // of times it was added to the calendar
  // Keeping track of the number of times used because we wanted to unselect a
  // food used multiple times on unshift
  // Without keeping track of the count, the user could unselect with unshift
  // even if they havent added the selected item before
  const [chosenFood, used] = selectedFood || [null, 0];

  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  const chooseFood = (event, day, time, weekday) => {
    // Add chosen menu item to the calendar
    if (chosenFood) {
      const meal = [...mealPlan[day]];
      meal[time] = {...chosenFood};
      setPlan({...mealPlan, [day]: meal});
      // Adds the meal to the backend meal plan
      addMeal(chosenFood['mealsid'], startWeek, meal, weekday);
      // Holding shift key allows for multi-select
      if (!event['shiftKey']) {
        setSelected(null);
      } else {
        setSelected([chosenFood, used + 1]);
      }
    }
  };

  const times = ['Breakfast', 'Lunch', 'Dinner'];

  return (
    <Grid
      container
      spacing={0}
      className={width < 1200 ? 'mobileContainer' : 'webContainer'}
      id='wrapping'
      style={{visibility: (mealPlan ? '' : 'hidden')}}
    >
      {daysOfWeek.map((day, weekday) =>
        <div className='card margins greyBack' key={day}>
          <Grid
            item
            xs={6}
            md={1.5}
            className={
              'food ' + (weekday === 0 ? 'sideBorder' : 'rightBorder')
            }
          >
            <Item className='borderless greyBack'> {day} </Item>
            <div className='bottomBorder'/>
            <Item
              className={'greyBack borderless ' +
                (width < 1200 ? 'verticalScroll' : '')}
              style={{
                height: (width < 1200 ? (cardSize.current * 2 + 35) : ''),
              }}
            >
              {mealPlan && mealPlan[day.toLowerCase()].map((item, ind) => {
                const dayLower = day.toLowerCase();
                const image = item['img'] ?
                  item['img'] : require('../../assets/logo.png');
                return (
                  <div key={item['dishname'] + dayLower + ind}>
                    <ImageList
                      className='wholeBorder stillImg'
                      sx={{
                        width: `${cardSize.current}px`,
                      }}
                      onClick={(event) =>
                        chooseFood(event, dayLower, ind, weekday)}
                    >
                      <ImageListItem>
                        <ImageListItemBar
                          title={times[ind]}
                          position='top'

                        />
                        <img
                          component="img"
                          src={`${image}?w=248&fit=crop&auto=format`}
                          srcSet={
                            `${image}?w=248&fit=crop&auto=format&dpr=2 2x`
                          }
                          alt={item['dishname']}
                          loading="lazy"
                          style={{
                            width: `${cardSize.current}px`,
                            height: `${cardSize.current}px`,
                          }}
                        />
                        <ImageListItemBar
                          title={item['dishname']}
                          className='imgListBar'
                          style={{display: item['dishname'] ? '' : 'none'}}
                        />
                      </ImageListItem>
                    </ImageList>
                    <Divider/>
                  </div>
                );
              })}
            </Item>
          </Grid>
        </div>,
      )}
    </Grid>
  );
}

export default Calendar;
