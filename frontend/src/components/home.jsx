import React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import {useDimensions} from './dimensions.jsx';
import './Home.css';


const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const TODOtempdate = {
    'mon': [{'name': 'test', 'img': ''}, {'name': 'helo', 'img': ''}],
    'tues': [{'name': 'test', 'img': ''}, {'name': 'helo', 'img': ''}],
    'wed': [{'name': 'test', 'img': ''}, {'name': 'helo', 'img': ''}],
    'thurs': [{'name': 'test', 'img': ''}, {'name': 'helo', 'img': ''}],
    'fri': [{'name': 'test', 'img': ''}, {'name': 'helo', 'img': ''}],
    'sat': [{'name': 'test', 'img': ''}, {'name': 'helo', 'img': ''}],
    'sun': [{'name': 'test', 'img': ''}, {'name': 'helo', 'img': ''}],
};

function Desktop(props) {
  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const {width} = useDimensions();
  return (
    <Grid
      container
      spacing={0}
      style={{
          display: width < 1200 ? 'none' : '',
      }}
      className='desktopGrid'
    >
      {daysOfWeek.map((day) =>
        <Grid item xs={6} md={1.5} className='food rightBorder'>
          <Item> {day} </Item>
          <div className='bottomBorder'/>
          <Item>
            {TODOtempdate[day.toLowerCase()].map((food, ind) =>
              <div>
                <Card className='wholeBorder desktopCard'>
                  <CardHeader
                    title={food['name']}
                  />
                  <CardMedia
                    component="img"
                    image={food['img'] ?
                      food['img'] : require('../assets/ass.png')}
                    alt="Paella dish"
                    sx={{height: '93px', width: '182px'}}
                  />
                </Card>
                <br hidden={ind === TODOtempdate['mon'].length - 1}/>
              </div>,
            )}
          </Item>
        </Grid>,
      )}
    </Grid>
  );
}

function Mobile(props) {
  const {width} = useDimensions();
  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  return (
    <Grid container spacing={0} style={{display: width >= 1200 ? 'none' : ''}}>
      <div className='container'>
        {daysOfWeek.map((day) =>
          <div className='card'>
            <Grid item xs={6} md={1.5} className='food rightBorder'>
              <Item> {day} </Item>
              <div className='bottomBorder'/>
              <Item>
                {TODOtempdate[day.toLowerCase()].map((food, ind) =>
                  <div>
                    <Card className='wholeBorder'>
                      <CardHeader
                        title={food['name']}
                      />
                      <CardMedia
                        component="img"
                        image={food['img'] ?
                          food['img'] : require('../assets/ass.png')}
                        alt="Paella dish"
                        sx={{height: '93px', width: '182px'}}
                      />
                    </Card>
                    <br hidden={ind === TODOtempdate['mon'].length - 1}/>
                  </div>,
                )}
              </Item>
            </Grid>
          </div>,
        )}
      </div>
    </Grid>
  );
}

function Homepage(props) {
  const currentDay = new Date();
  const dateOffset = currentDay.getDay();

  const startWeek = new Date();
  startWeek.setDate(currentDay.getDate() - dateOffset);

  const endWeek = new Date();
  endWeek.setDate(currentDay.getDate() + (7 - dateOffset));


  return (
    <div>
      <div style={{backgroundColor: 'red'}}>
        <h1>
          {'Week:\t'}
          {startWeek.getMonth() + 1}
          /{startWeek.getDate()}/{startWeek.getFullYear()}{' - '}
          {endWeek.getMonth() + 1}/{endWeek.getDate()}/{endWeek.getFullYear()}
        </h1>
      </div>
      <Box sx={{flexGrow: 1}}>
        <Desktop/>
        <Mobile/>
      </Box>
    </div>
  );
}


export default Homepage;
