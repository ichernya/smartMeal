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

// Adds a meal to the week
const addMeal = (mealId, startWeek, mealForDay, weekday) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const userId = person ? person.userid : '';

  // The first day of the week
  let [month, day, year] = startWeek.toLocaleDateString().split('/');
  if (parseInt(month) < 10) {
    month = '0' + month;
  }
  if (parseInt(day) < 10) {
    day = '0' + day;
  }

  // The day of the week that is being updated
  const dateCopy = new Date(year, month - 1, day);
  dateCopy.setDate(dateCopy.getDate() + weekday);
  let [dateM, dateD, dateY] = dateCopy.toLocaleDateString().split('/');
  if (parseInt(dateM) < 10) {
    dateM = '0' + dateM;
  }
  if (parseInt(dateD) < 10) {
    dateD = '0' + dateD;
  }

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
    'dayof': `{${dateY}-${dateM}-${dateD}}`,
    'firstDay': `${year}-${month}-${day}`,
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
  const [chosenFood, setChosen] =
    React.useState((selectedFood && selectedFood[0]) || null);
  const [chosenUsed, setUsed] =
    React.useState((selectedFood && selectedFood[1]) || 0);

  React.useEffect(() => {
    // Updates the above states
    if (selectedFood) {
      setChosen(selectedFood[0]);
      setUsed(selectedFood[1]);
    }
  }, [selectedFood]);

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
        setSelected([chosenFood, chosenUsed + 1]);
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
        <div
          className='card margins greyBack'
          key={day}
        >
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
                let image = item['imagedata'];
                // image is present either in base64 or as a template
                if (image) {
                  if (!image.startsWith('data:')) {
                    image = require('../../assets/templateImage/'+
                      image);
                  }
                } else {
                  image = require('../../assets/logo.png');
                }
                return (
                  <div key={item['dishname'] + dayLower + ind}>
                    <ImageList
                      className='wholeBorder stillImg'
                      sx={{
                        width: `${cardSize.current}px`,
                      }}
                      id={`${day} ${times[ind]}`}
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
                          src={image}
                          alt={item['dishname']}
                          loading="lazy"
                          style={{
                            width: `${cardSize.current}px`,
                            height: `${cardSize.current}px`,
                          }}
                        />
                        <ImageListItemBar
                          id={`${day} ${times[ind]} food`}
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
