import React, {createContext, useContext, useState, useEffect} from 'react';

import parsePlanData from './parser.jsx';

const MealsContext = createContext();

// Queries the database for the meals the user has chosen for the week
const getMealsForWeek = (setMeal) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const userId = person ? person.userid : '';
  // calculates the start and end of the week
  const currentDay = new Date();
  const dateOffset = currentDay.getDay();
  const startWeek = new Date();
  startWeek.setDate(currentDay.getDate() - dateOffset);
  const start = startWeek.toISOString().split('T')[0];
  if (!userId || !bearerToken) {
    // User has not logged in or has timeed out
    return;
  }
  fetch(
    `http://localhost:3010/v0/meals?dayof=${start}&mealsid=${userId}&firstDay=${start}`, {
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
      parsePlanData(setMeal, json[0]);
    });
};


const testIngredientList = {
  'Protein': {
    'amount': 1,
    'amountChecked': 0,
    'hidden': false,
    'ingredients': {
      'Beef': {
        'checked': false,
        'amount': 65,
        'unit': 'Ton',
      },
    },
  },
  'Dairy': {
    'amount': 2,
    'amountChecked': 1,
    'hidden': false,
    'ingredients': {
      'Whole milk': {
        'checked': true,
        'amount': 33,
        'unit': 'liters',
      },
      'Cheese': {
        'checked': false,
        'amount': 22,
        'unit': 'Ton',
      },
    },
  },
  'Vegetables': {
    'amount': 1,
    'amountChecked': 0,
    'hidden': false,
    'ingredients': {
      'Baby Bella Mushrooms': {
        'checked': false,
        'amount': 36,
        'unit': 'Ton',
      },
    },
  },
};


export const MealsProvider = ({children}) => {
  // calculates the start and end of the week
  const currentDay = new Date();
  const dateOffset = currentDay.getDay();
  const startWeek = new Date();
  startWeek.setDate(currentDay.getDate() - dateOffset);
  const endWeek = new Date();
  endWeek.setDate(currentDay.getDate() + (7 - dateOffset));
  const WEEK = `Week: ${startWeek.getMonth() + 1}` +
    `/${startWeek.getDate()}/${startWeek.getFullYear()} - ` +
    `${endWeek.getMonth() + 1}/${endWeek.getDate()}/${endWeek.getFullYear()}`;

  const [mealPlan, setPlan] = React.useState(null);
  useEffect(() => {
    // Grab the meals for the week when loading the page
    getMealsForWeek(setPlan);
  }, []);

  const [ingredientList, setIngredientList] = useState({});
  const [mealsWithIngredient, setMealsWithIngredient] = useState([]);
  const [alteratives, setAlteratives] = useState({});
  const [isChosenIngredient, setChosenIngredient] = useState(
    {
      'name': 'Pick an item from the list',
      'img': '',
      'pricePerUnitWeight': 'by clicking on the name of the item',
      'amount': '',
      'category': '',
    },
  );
  useEffect(() => {
    setIngredientList(testIngredientList);
  }, []);

  return (
    <MealsContext.Provider value={{
      ingredientList, setIngredientList,
      isChosenIngredient, setChosenIngredient,
      alteratives, setAlteratives,
      mealPlan, setPlan,
      mealsWithIngredient, setMealsWithIngredient,
      WEEK, startWeek,
    }}>
      {children}
    </MealsContext.Provider>
  );
};

// eslint-disable-next-line require-jsdoc
export function useMeals() {
  return useContext(MealsContext);
};

export default MealsProvider;
