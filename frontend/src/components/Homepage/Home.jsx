import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import {useDimensions} from '../DimensionsProvider.jsx';
import {useMeals} from '../MealContextProvider.jsx';
import Calendar from './Calendar.jsx';
import AddMealDialog from './AddRecipe/AddMealDialog.jsx';
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

// Updates the name of the meal plan in the backend
const saveUpdatedName = (name, startDay) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const userId = person ? person.userid : '';
  if (!userId || !bearerToken) {
    // User has not logged in or has timeed out
    return;
  }

  const body = {
    'firstday': startDay.toISOString().split('T')[0],
    'mealsid': userId,
    'mealName': name,
  };

  fetch(`http://localhost:3010/v0/mealName`, {
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
 * Represents the homepage
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Homepage(props) {
  const {WEEK, startWeek, mealPlan, setPlan} = useMeals();
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
  // TODO query db for tags
  // ideally, format will be
  // { category :
  //   {name: align}
  // }
  const [filters, setFilter] = React.useState(
    {'Oliver Hansen': 'yes', 'Van Henry': 'yes', 'Kelly Snyder': 'yes'},
  );
  // Represents the weekly meal plans name
  const [planName, setName] =
    React.useState((mealPlan && mealPlan['mealname']) || null);
  // Represents whether the user is currently editing the name
  const [changeName, setChangeName] = React.useState(false);
  // Represents whether to display the add meal dialog
  const [addMeal, setAddMeal] = React.useState(false);
  // Represents the alignments of the tags
  const [alignments, setAlignment] =
    // TODO query db for tags
    // ideally, format will be
    // { category :
    //   {name: align}
    // }
    React.useState(names);

  React.useEffect(() => {
    if (mealPlan && planName) {
      // pass
    } else if (mealPlan && mealPlan['mealname'] === '' && planName !== WEEK) {
      setName(WEEK);
    } else if (mealPlan && mealPlan['mealname'] !== planName) {
      setName(mealPlan['mealname']);
    }
  }, [mealPlan, WEEK, planName]);

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
      setPlan({...mealPlan, 'mealname': planName});
      if (planName === '') {
        setName(WEEK);
      }
      saveUpdatedName(planName, startWeek);
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
        addMeal, setAddMeal,
      }}
    >
      <div
        tabIndex='0'
        onKeyUp={shiftRelease}
        id='homepage'
      >
        <AddMealDialog HomeContext={HomeContext}/>
        <Tags HomeContext={HomeContext}/>
        <div
          id='titleBar'
        >
          <TextField
            label="Meal Plan Name"
            value={planName || ''}
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


