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


// eslint-disable-next-line require-jsdoc
function Calendar(props) {
  const {width, cardSize, selectedFood, setSelected} =
    React.useContext(props['HomeContext']);
  const [chosenFood, used] = selectedFood || [null, 0];

  const [TODOtempdate, setPlan] = React.useState({
    'mon': [{'dishname': 'test', 'img': ''},
      {'dishname': 'helo', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'tues': [{'dishname': 'test', 'img': ''},
      {'dishname': 'helo', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'wed': [{'dishname': 'test', 'img': ''},
      {'dishname': 'helo', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'thurs': [{'dishname': 'test', 'img': ''},
      {'dishname': 'helo', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'fri': [{'dishname': 'test', 'img': ''},
      {'dishname': 'helo', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'sat': [{'dishname': 'test', 'img': ''},
      {'dishname': 'temp', 'img': ''}, {'dishname': 'temp', 'img': ''}],
    'sun': [{'dishname': 'test', 'img': ''},
      {'dishname': 'helo', 'img': ''}, {'dishname': 'temp', 'img': ''}],
  });
  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  const chooseFood = (event, day, time) => {
    if (chosenFood) {
      const meal = [...TODOtempdate[day]];
      meal[time] = {
        'dishname': chosenFood['dishname'],
        'img': chosenFood['img'],
      };
      setPlan({...TODOtempdate, [day]: meal});
      if (!event['shiftKey']) {
        setSelected(null);
      } else {
        setSelected([chosenFood, used + 1]);
      }
    }
  };

  return (
    <Grid
      container
      spacing={0}
      className='container'
      id='wrapping'
    >
      {daysOfWeek.map((day) =>
        <div className='card margins' key={day}>
          <Grid item xs={6} md={1.5} className='food rightBorder'>
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
                      onClick={(event) => chooseFood(event, dayLower, ind)}
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

