import React, {createContext, useContext, useState, useEffect} from 'react';

import parsePlanData from './parser.jsx';

const MealsContext = createContext();

// Queries the database for the meals the user has chosen for the week
const getMealsForWeek = (setMeal, startWeek) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const userId = person ? person.userid : '';
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
        'quantity': 80,
        'unit': 'Ton',
        'pricePerUnitWeight': '$20',
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
        'quantity': 44,
        'unit': 'liters',
        'pricePerUnitWeight': '$20',
      },
      'Cheese': {
        'checked': false,
        'quantity': 22,
        'unit': 'Ton',
        'pricePerUnitWeight': '$20',
      },
    },
  },
  'Vegetables': {
    'amount': 1,
    'amountChecked': 0,
    'hidden': false,
    'ingredients': {
      'Jalepeno': {
        'checked': false,
        'quantity': 48,
        'unit': 'Ton',
        'pricePerUnitWeight': '$20',
      },
    },
  },
};

const testMeal = {
  'recipeid': 1,
  'dishname': 'Beef stew',
  'portion': 1,
  'ingredients': {
    'Beef': {
      'quantity': 15,
      'unit': 'Ton',
    },
    'Whole milk': {
      'quantity': 11,
      'unit': 'litter',
    },
    'Jalepeno': {
      'quantity': 12,
      'unit': 'Ton',
    },
  },
  'ingredientam': 3,
  'imagedata': '',
  'vegan': false,
  'halal': true,
  'healthy': false,
  'kosher': true,
};
const testMeal1 = {
  'recipeid': 1,
  'portion': 2,
  'dishname': 'Beef Stick',
  'ingredients': {
    'Beef': {
      'quantity': 10,
      'unit': 'Ton',
    },
    'Cheese': {
      'quantity': 11,
      'unit': 'Ton',
    },
  },
  'ingredientam': 2,
  'imagedata': '',
  'vegan': false,
  'halal': true,
  'healthy': false,
  'kosher': true,
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
    getMealsForWeek(setPlan, startWeek);
  }, []);

  const [ingredientList, setIngredientList] = useState({});
  const [mealsWithIngredient, setMealsWithIngredient] = useState([]);
  const [alteratives, setAlteratives] = useState({});
  const [isChosenIngredient, setChosenIngredient] = useState(
    {
      'name': 'Pick an item from the list',
      'img': '',
      'pricePerUnitWeight': 'by clicking on the name of the item',
      'quantity': '',
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
