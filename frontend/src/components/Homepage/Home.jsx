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

// Updates the name of the meal plan in the backend
const saveUpdatedName = (name, startDay, userId) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';

  const body = {
    'firstDay': startDay.toISOString().split('T')[0],
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

// Queries for the diets tags of the user
const queryAlignments = (userId, setAlignment) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';

  fetch(`http://localhost:3010/v0/diets?mealsid=${userId}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      setAlignment(json);
    });
};


/**
 * Represents the homepage
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Homepage(props) {
  const {userId, WEEK, startWeek, mealPlan, setPlan} = useMeals();
  const {width} = useDimensions();
  // Precalculated card size for the calendar
  const cardSize = React.useRef(width >= 1200 ? (width * .11) : 175);
  // Selected food from the menu
  const [selectedFood, setSelected] = React.useState(null);
  // Contents of the search bar
  const [search, setSearch] = React.useState('');
  // Represents whether the tags drawer is open or not
  const [tagsDrawer, setDrawer] = React.useState(false);
  // Represents the weekly meal plans name
  const [planName, setName] =
    React.useState((mealPlan && mealPlan['mealname']) || null);
  // Represents whether the user is currently editing the name
  const [changeName, setChangeName] = React.useState(false);
  // Represents whether to display the add meal dialog
  const [addMeal, setAddMeal] = React.useState(false);
  // Represents the alignments of the tags
  const [alignments, setAlignment] = React.useState({});

  React.useEffect(() => {
    queryAlignments(userId, setAlignment);
  }, [userId]);

  React.useEffect(() => {
    if ((mealPlan && planName) || changeName) {
      // pass
    } else if (mealPlan && mealPlan['mealname'] === '' && planName !== WEEK) {
      setName(WEEK);
    } else if (mealPlan && mealPlan['mealname'] !== planName) {
      setName(mealPlan['mealname']);
    }
  }, [mealPlan, WEEK, planName, changeName]);

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
      saveUpdatedName(planName, startWeek, userId);
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
        alignments, setAlignment, addMeal, setAddMeal,
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

