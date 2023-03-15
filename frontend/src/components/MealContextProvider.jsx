import React, {createContext, useContext, useState, useEffect} from 'react';

import parsePlanData from './parser.jsx';
import createList from './GenerateList.jsx';

const MealsContext = createContext();

// Queries the database for the meals the user has chosen for the week
const getMealsForWeek = (setMeal, userId, setIngredientList) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';

  // calculates the start and end of the week
  const currentDay = new Date();
  const dateOffset = currentDay.getDay();
  const startWeek = new Date();
  startWeek.setDate(currentDay.getDate() - dateOffset);
  let month = startWeek.getMonth() + 1;
  let day = startWeek.getDate();
  const year = startWeek.getFullYear();
  if (parseInt(month) < 10) {
    month = '0' + month;
  }
  if (parseInt(day) < 10) {
    day = '0' + day;
  }
  const start = `${year}-${month}-${day}`;
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
      parsePlanData(setMeal, json[0], null);
    })
    .then(() => {
      createList(setIngredientList, startWeek);
    });
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


  // Represents the user's current meal plan
  const [mealPlan, setPlan] = React.useState(null);

  // User Id of the user
  let id = null;
  const item = localStorage.getItem('user');
  if (item) {
    const person = JSON.parse(item);
    id = person ? person.userid : null;
  }
  const [userId, setId] = React.useState(id);
  useEffect(() => {
    if (userId) {
      // Grab the meals for the week when loading the page
      getMealsForWeek(setPlan, userId, setIngredientList);
    }
  }, [userId]);

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

  return (
    <MealsContext.Provider value={{
      ingredientList, setIngredientList,
      isChosenIngredient, setChosenIngredient,
      alteratives, setAlteratives,
      mealPlan, setPlan,
      mealsWithIngredient, setMealsWithIngredient,
      WEEK, startWeek, userId, setId,
    }}>
      {children}
    </MealsContext.Provider>
  );
};

/**
 * Represents meals context
 * @return {Object} context
 */
export function useMeals() {
  return useContext(MealsContext);
};

export default MealsProvider;
