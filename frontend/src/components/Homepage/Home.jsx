/* eslint-disable no-unused-vars */
import React from 'react';
import Box from '@mui/material/Box';

import {useDimensions} from '../DimensionsProvider.jsx';
import Calendar from './Calendar.jsx';
import Menu from './Menu.jsx';
import './Home.css';

const HomeContext = React.createContext();

// eslint-disable-next-line require-jsdoc
function Homepage(props) {
  const currentDay = new Date();
  const dateOffset = currentDay.getDay();
  const startWeek = new Date();
  startWeek.setDate(currentDay.getDate() - dateOffset);
  const endWeek = new Date();
  endWeek.setDate(currentDay.getDate() + (7 - dateOffset));
  const WEEK = `Week:\t${startWeek.getMonth() + 1}` +
    `/${startWeek.getDate()}/${startWeek.getFullYear()} - ` +
    `${endWeek.getMonth() + 1}/${endWeek.getDate()}/${endWeek.getFullYear()}`;

  const {width} = useDimensions();
  const cardSize = React.useRef(width >= 1200 ? (width * .11) : 175);
  const [selectedFood, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    cardSize.current = width >= 1200 ? (width * .11) : 175;
  }, [width]);

  const shiftRelease = (event) => {
    if (event['code'].toLowerCase().includes('shift') &&
      selectedFood && selectedFood[1] > 0) {
      setSelected(null);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        width, cardSize, selectedFood, setSelected,
        setSearch, search, startWeek,
      }}
    >
      <div
        tabIndex='0'
        onKeyUp={shiftRelease}
      >
        <div
          style={{
            backgroundColor: 'red',
            float: 'right',
            width: width >= 1200 ?
              '100%' : '100%',
          }}
        >
          <h1>
            {WEEK}
          </h1>
        </div>
        <Box className='stretch'>
          <Calendar HomeContext={HomeContext}/>
        </Box>
        <Menu HomeContext={HomeContext}/>
      </div>
    </HomeContext.Provider>
  );
}


export default Homepage;


