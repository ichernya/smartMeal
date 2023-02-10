/* eslint-disable no-unused-vars */
import React from 'react';
import Box from '@mui/material/Box';

import {useDimensions} from '../DimensionsProvider.jsx';
import Calendar from './Calendar.jsx';
import Menu from './Menu.jsx';
import Tags from './Filter/Tags.jsx';
import './Home.css';

const HomeContext = React.createContext();
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

// eslint-disable-next-line require-jsdoc
function Homepage(props) {
  // Generate the start and end of the week to display
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
  // Precalculated card size for the calendar
  const cardSize = React.useRef(width >= 1200 ? (width * .11) : 175);
  // Selected food from the menu
  const [selectedFood, setSelected] = React.useState(null);
  // Contents of the search bar
  const [search, setSearch] = React.useState('');
  // Represents whether the tags drawer is open or not
  const [tagsDrawer, setDrawer] = React.useState(false);
  // Represents whether the filtered tags
  const [tags, setTags] = React.useState({});
  // Represents the alignments of the tags
  const [alignments, setAlignment] =
  // TODO query db for tags
    React.useState(Object.fromEntries(
      names.map((name) => [name, 'default']),
    ));


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

  return (
    <HomeContext.Provider
      value={{
        width, cardSize, selectedFood, setSelected,
        setSearch, search, startWeek, tagsDrawer, setDrawer,
        tags, setTags, alignments, setAlignment,
      }}
    >
      <div
        tabIndex='0'
        onKeyUp={shiftRelease}
      >
        <Tags HomeContext={HomeContext}/>
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


