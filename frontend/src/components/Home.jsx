/* eslint-disable no-unused-vars */
import React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import {useDimensions} from './DimensionsProvider.jsx';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import './Home.css';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


// eslint-disable-next-line require-jsdoc
function Calendar(props) {
  const [TODOtempdate, setPlan] = React.useState({
      'mon': [{'name': 'test', 'img': ''},
        {'name': 'helo', 'img': ''}, {'name': 'temp', 'img': ''}],
      'tues': [{'name': 'test', 'img': ''},
        {'name': 'helo', 'img': ''}, {'name': 'temp', 'img': ''}],
      'wed': [{'name': 'test', 'img': ''},
        {'name': 'helo', 'img': ''}, {'name': 'temp', 'img': ''}],
      'thurs': [{'name': 'test', 'img': ''},
        {'name': 'helo', 'img': ''}, {'name': 'temp', 'img': ''}],
      'fri': [{'name': 'test', 'img': ''},
        {'name': 'helo', 'img': ''}, {'name': 'temp', 'img': ''}],
      'sat': [{'name': 'test', 'img': ''},
        {'name': 'temp', 'img': ''}, {'name': 'temp', 'img': ''}],
      'sun': [{'name': 'test', 'img': ''},
        {'name': 'helo', 'img': ''}, {'name': 'temp', 'img': ''}],
    },
  );
  const {width} = useDimensions();
  const {select, food} = props;
  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  let cardSize = width >= 1200 ? (width * .11) : 175;

  const chooseFood = (day, time) => {
    if (food) {
      const meal = [...TODOtempdate[day]];
      meal[time] = {
        'name': food['title'],
        'img': food['img'],
      };
      setPlan({...TODOtempdate, [day]: meal});
      select(null);
    }
  };

  React.useEffect(() => {
    cardSize = width >= 1200 ? (width * .11) : 175;
  }, [width]);

  return (
    <Grid
      container
      spacing={0}
      className={width >= 1200 ? 'desktopGrid' : 'container'}
      id='wrapping'
    >
      {daysOfWeek.map((day) =>
        <div className='card margins'>
          <Grid item xs={6} md={1.5} className='food rightBorder'>
            <Item> {day} </Item>
            <div className='bottomBorder'/>
            <Item
              className={width < 1200 ? 'verticalScroll' : ''}
              style={{height: (width < 1200 ? (cardSize * 2 + 24) : '')}}
            >
              {TODOtempdate[day.toLowerCase()].map((food, ind) => {
                const dayLower = day.toLowerCase();
                const image = food['img'] ?
                  food['img'] : require('../assets/ass.png');
                return (
                  <div>
                    <ImageList
                      className='wholeBorder stillImg'
                      sx={{
                        width: `${cardSize}px`,
                      }}
                      onClick={() => chooseFood(dayLower, ind)}
                    >
                    <ImageListItem>
                      <img
                        component="img"
                        src={`${image}?w=248&fit=crop&auto=format`}
                        srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={food['name']}
                        loading="lazy"
                        style={{
                          width: `${cardSize}px`,
                          height: `${cardSize}px`,
                        }}
                      />
                      <ImageListItemBar
                        title={food['name']}
                        style={{height: '20px'}}
                      />
                    </ImageListItem>
                  </ImageList>
                </div>);
              })}
            </Item>
          </Grid>
        </div>,
      )}
    </Grid>
  );
}


// eslint-disable-next-line require-jsdoc
function Toolbar(props) {
  return (
    <div style={{width: '100%', backgroundColor: 'red',
      height: '50px', marginTop: '50px'}}/>
  );
}


// eslint-disable-next-line require-jsdoc
function Menu(props) {
  const {width} = useDimensions();
  const {select} = props;
  const MARGIN = 112;
  let cardSize = width >= 1200 ? (width * .12) : 175;
  let menuSize = width >= 1200 ? (width * .18) : 175;

  React.useEffect(() => {
    cardSize = width >= 1200 ? (width * .12) : 175;
    menuSize = width >= 1200 ? (width * .18) : 175;
  }, [width]);

  return (
    <Grid
      container
      spacing={0}
      id='wrapping'
    >
      <ImageList className='menu'
        style={{
          marginLeft: (width - (cardSize * 7) - MARGIN> 0 ?
            `${width - (cardSize * 7) - MARGIN}px` : '15px'),
        }}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              onClick={() => select(item)}
              style={{
                width: `${menuSize}px`,
                height: `${menuSize}px`,
              }}
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
}


// eslint-disable-next-line require-jsdoc
function Homepage(props) {
  const [selectedFood, setSelected] = React.useState(null);
  const currentDay = new Date();
  const dateOffset = currentDay.getDay();

  const startWeek = new Date();
  startWeek.setDate(currentDay.getDate() - dateOffset);

  const endWeek = new Date();
  endWeek.setDate(currentDay.getDate() + (7 - dateOffset));

  const WEEK = `Week:\t${startWeek.getMonth() + 1}` +
    `/${startWeek.getDate()}/${startWeek.getFullYear()} - ` +
    `${endWeek.getMonth() + 1}/${endWeek.getDate()}/${endWeek.getFullYear()}`;

  return (
    <div>
      <div style={{backgroundColor: 'red'}}>
        <h1>
            {WEEK}
        </h1>
      </div>
      <Box sx={{flexGrow: 1}}>
        <Calendar select={setSelected} food={selectedFood}/>
      </Box>
      <Toolbar/>
      <Menu select={setSelected}/>
    </div>
  );
}


export default Homepage;
