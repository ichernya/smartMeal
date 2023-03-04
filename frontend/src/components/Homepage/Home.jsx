/* eslint-disable no-unused-vars */
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import {useDimensions} from '../DimensionsProvider.jsx';
import Calendar from './Calendar.jsx';
import Menu from './Menu.jsx';
import Tags from './Filter/Tags.jsx';
import './Home.css';

const HomeContext = React.createContext();
const names = {
  'tag1': {
    'Oliver Hansen': 'yes',
    'Van Henry': 'yes',
  },
  'tag2': {
    'Kelly Snyder': 'yes',
  },
};

// eslint-disable-next-line require-jsdoc
function Homepage(props) {
  // Generate the start and end of the week to display
  const currentDay = new Date();
  const dateOffset = currentDay.getDay();
  const startWeek = new Date();
  startWeek.setDate(currentDay.getDate() - dateOffset);
  const endWeek = new Date();
  endWeek.setDate(currentDay.getDate() + (7 - dateOffset));
  const WEEK = `Week: ${startWeek.getMonth() + 1}` +
    `/${startWeek.getDate()}/${startWeek.getFullYear()} - ` +
    `${endWeek.getMonth() + 1}/${endWeek.getDate()}/${endWeek.getFullYear()}`;

  const {width} = useDimensions();
  // Precalculated card size for the calendar
  const cardSize = React.useRef(width >= 1200 ? (width * .11) : 175);
  // Selected food from the menu
  const [selectedFood, setSelected] = React.useState(null);
  // Contents of the search bar
  const [search, setSearch] = React.useState('');
  // Represents whether the tags drawer is open or not
  const [tagsDrawer, setDrawer] = React.useState(false);
  // Represents the filtered tags
  const [filters, setFilter] = React.useState({});
  // Represents the weekly meal plans name
  // TODO query backend
  const [planName, setName] = React.useState(WEEK);
  const [changeName, setChangeName] = React.useState(false);
  // Represents the alignments of the tags
  const [alignments, setAlignment] =
    // TODO query db for tags
    // ideally, format will be
    // { category :
    //   {name: align}
    // }
    React.useState(names);


  React.useEffect(() => {
    cardSize.current = width >= 1200 ? (width * .11) : 175;
  }, [width]);

  const shiftRelease = (event) => {
    // unshift unselects menu item if the item was used before
    if (event['code'].toLowerCase().includes('shift') &&
      selectedFood && selectedFood[1] > 0) {
      setSelected(null);
    }
  };

  const submitNameChange = (event) => {
    // enter changes the meal plan name
    if (event['code'].toLowerCase().includes('enter') &&
      changeName) {
      setChangeName(false);
      if (planName === '') {
        setName(WEEK);
      }
      // TODO post request with new meal name
    }
  };

  const onTypeName = (event) => {
    const {value} = event.target;
    setName(value);
  };


  return (
    <HomeContext.Provider
      value={{
        width, cardSize, selectedFood, setSelected,
        setSearch, search, startWeek, tagsDrawer, setDrawer,
        filters, setFilter, alignments, setAlignment,
      }}
    >
      <div
        tabIndex='0'
        onKeyUp={shiftRelease}
      >
        <Tags HomeContext={HomeContext}/>
        <div
          id='titleBar'
        >
          <TextField
            label="Meal Plan Name"
            value={planName}
            onChange={onTypeName}
            onKeyUp={submitNameChange}
            style={{
              display: changeName ? '' : 'none',
              width: `${width / 2}px`,
            }}
          />
          <p
            id='planName'
            onClick={() => setChangeName(true)}
            style={{display: changeName ? 'none' : ''}}
          >
            {planName}
          </p>
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


