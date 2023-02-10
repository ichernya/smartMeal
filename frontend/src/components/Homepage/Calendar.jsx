import React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Divider from '@mui/material/Divider';

import './Calendar.css';
import './Home.css';

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


// Queries the database for the recipe associated with an ID
const getMeal = (setMeal, calendar, id, weekday, time) => {
  const item = localStorage.getItem('user');
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/recipe?recipeid=${id}`, {
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
      const meal = [...calendar[weekday]];
      meal[time] = {
        'dishname': json[0]['dishname'],
        'img': json[0]['img'],
      };
      setMeal({...calendar, [weekday]: meal});
    });
};

// Queries the database for the meals the user has chosen for the week
const getMealsForWeek = (calendar, setMeal, startWeek, user) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const date = new Date(startWeek);
  for (let day = 0; day < 7; ++day) {
    const ISOdate = date.toISOString().split('T')[0];
    fetch(`http://localhost:3010/v0/meals?dayof=${ISOdate}&mealsid=${user}`, {
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
        console.log(json);
        const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        const weekday = daysOfWeek[day].toLowerCase();

        for (let time = 0; time < json.length; ++time) {
          if (json[time]['recipeid']) {
            getMeal(setMeal, calendar, json[time]['recipeid'], weekday, time);
          }
        }
      });

    date.setDate(date.getDate() + 1);
  }
};

// Adds a meal to the week
const addMeal = (userId, mealId, startWeek, weekday) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const dateCopy = new Date(startWeek);

  dateCopy.setDate(dateCopy.getDate() + weekday);
  const body = {
    'mealsid': userId,
    'recipeid': mealId,
    'dayof': dateCopy.toISOString().split('T')[0],
  };
  fetch(`http://localhost:3010/v0/meals`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  });
};


// eslint-disable-next-line require-jsdoc
function Calendar(props) {
  const {width, cardSize, selectedFood, setSelected, startWeek} =
    React.useContext(props['HomeContext']);

  // Represents the food currently selected from the menu as well as the number
  // of times it was added to the calendar
  // Keeping track of the number of times used because we wanted to unselect a
  // food used multiple times on unshift
  // Without keeping track of the count, the user could unselect with unshift
  // even if they havent added the selected item before
  const [chosenFood, used] = selectedFood || [null, 0];

  const [TODOtempdate, setPlan] = React.useState({
    'mon': [{'dishname': 'temp', 'img': ''},
      {'dishname': 'temp', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'tues': [{'dishname': 'temp', 'img': ''},
      {'dishname': 'temp', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'wed': [{'dishname': 'temp', 'img': ''},
      {'dishname': 'temp', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'thurs': [{'dishname': 'temp', 'img': ''},
      {'dishname': 'temp', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'fri': [{'dishname': 'temp', 'img': ''},
      {'dishname': 'temp', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'sat': [{'dishname': 'temp', 'img': ''},
      {'dishname': 'temp', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'sun': [{'dishname': 'temp', 'img': ''},
      {'dishname': 'temp', 'img': ''}, {'dishname': 'temp', 'img': ''}],
  });

  React.useEffect(() => {
    // Grab the meals for the week when loading the page
    getMealsForWeek(TODOtempdate, setPlan, startWeek, 1);
  }, []);

  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  const chooseFood = (event, day, time, weekday) => {
    // Add chosen menu item to the calendar
    if (chosenFood) {
      const meal = [...TODOtempdate[day]];
      meal[time] = {
        'dishname': chosenFood['dishname'],
        'img': chosenFood['img'],
      };
      setPlan({...TODOtempdate, [day]: meal});
      // Replace 1 with userID in the future TODO
      // Adds the meal to the backend meal plan
      addMeal(1, chosenFood['mealsid'], startWeek, weekday);
      // Holding shift key allows for multi-select
      if (!event['shiftKey']) {
        setSelected(null);
      } else {
        setSelected([chosenFood, used + 1]);
      }
    }
  };

  // className='container'
  return (
    <Grid
      container
      spacing={0}
      className={width < 1200 ? 'mobileContainer' : 'webContainer'}
      id='wrapping'
    >
      {daysOfWeek.map((day, weekday) =>
        <div className='card margins' key={day}>
          <Grid
            item
            xs={6}
            md={1.5}
            className={
              'food ' + (weekday === 0 ? 'sideBorder' : 'rightBorder')
            }
          >
            <Item> {day} </Item>
            <div className='bottomBorder'/>
            <Item
              className={width < 1200 ? 'verticalScroll' : ''}
              style={{
                height: (width < 1200 ? (cardSize.current * 2 + 35) : ''),
              }}
            >
              {TODOtempdate[day.toLowerCase()].map((item, ind) => {
                const dayLower = day.toLowerCase();
                const image = item['img'] ?
                  item['img'] : require('../../assets/ass.png');
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
