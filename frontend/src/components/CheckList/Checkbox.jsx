import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {useMeals} from '../MealContextProvider';
import './Checkbox.css';

// Queries the database for alternatives for the ingredient
const getMeal = (ingredient, setAlteratives) => {
  fetch(`http://localhost:3010/v0/switchOut?ingredient=${ingredient}`, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const alter = {};
      if (json[0]) {
        const selectedIngredient = json[0];
        alter['ingredient'] = selectedIngredient['ingredient'];
        Object.keys(selectedIngredient).filter((key) => (key !== 'ingredient'))
          .map((key) => (
            alter[key] = {
              'alteratives': selectedIngredient[key],
              'hidden': false,
            }
          ));
      }
      if (Object.keys(alter).length === 0) {
        setAlteratives(false);
      } else {
        setAlteratives(alter);
      }
    });
};
// Given the meals of the week and an ingredient
// Return a list of all the meals with the given ingredient
const filterMealsForIngredients =
(mealPlan, setMealsWithIngredient, myIngredient) => {
  const mealsOfWithIng = [];
  Object.keys(mealPlan)
    // ignore the keys 'amount' and 'id'
    .filter((key) => !['id', 'mealname', 'public', 'firstday'].includes(key))
    // Look through the each day of the week that aren't empty
    .forEach((date) => {
      [0, 1, 2].forEach((timeOfDay) => {
        if (mealPlan[date][timeOfDay][0] !== '0' &&
          mealPlan[date][timeOfDay].recipeid !== 0 &&
          Object.keys(mealPlan[date][timeOfDay].ingredients)
            .includes(myIngredient)) {
          mealsOfWithIng.push({'date': date, 'timeOfDay': timeOfDay,
            'meal': mealPlan[date][timeOfDay]});
        }
      });
    });
  setMealsWithIngredient(mealsOfWithIng);
};

/**
 * Which represents the list of categories and thier sublist of ingredients
 * @return {object}
 */
function IndeterminateCheckbox() {
  const {
    ingredientList, setIngredientList,
    setChosenIngredient,
    setAlteratives, mealPlan,
    setMealsWithIngredient, startWeek,
  } = useMeals();
  // When first lanuch load meal from database and when the week change
  const [loading, setLoading] = useState(true);
  const setAll = (target, location, value) => {
    const item = localStorage.getItem('user');
    const person = JSON.parse(item);
    const bearerToken = person ? person.accessToken : '';
    const userId = person ? person.userid : '';
    const currentDay = new Date();
    const dateOffset = currentDay.getDay();
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

    const ingredentsToChange = target[location].ingredients;
    Object.keys(ingredentsToChange).forEach((ingredent) => {
      if (ingredentsToChange[ingredent].checked !== value) {
        const body = {
          'mealsid': userId,
          'firstDay': start,
          'category': location,
          'ingredient': ingredent,
          'check': value,
        };
        fetch(`http://localhost:3010/v0/groceryList`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: new Headers({
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
        });
      }
      ingredentsToChange[ingredent].checked = value;
    });
  };
  const setAllCategory = (target, location, value) => {
    Object.keys(target[location]).forEach(() => {
      target[location].hidden = value;
    });
  };
  // Checking the box
  const handleChange = (event) => {
    const newDic = {...ingredientList};
    if (newDic[event.target.id]['amount'] ===
    newDic[event.target.id]['amountChecked']) {
      newDic[event.target.id]['amountChecked'] = 0;
      setAll(newDic, event.target.id, false);
    } else {
      newDic[event.target.id]['amountChecked'] =
      newDic[event.target.id]['amount'];
      setAll(newDic, event.target.id, true);
    }
    setIngredientList(newDic);
  };
  // Select an ingredient and search for its alteratives
  const handleUpdateElement = (event) => {
    const [parentCategory, myIngredient] = event.target.id.split('-');
    const info = ingredientList[parentCategory].ingredients[myIngredient];
    setChosenIngredient({
      'name': myIngredient,
      'img': info.img,
      'amount': info.amount,
      'category': parentCategory,
    });
    getMeal(myIngredient, setAlteratives);
    filterMealsForIngredients(mealPlan, setMealsWithIngredient,
      myIngredient);
  };

  const handleChildChange = (parentCategory, myIngredient, startWeek) => {
    const alter = {...ingredientList};
    if (alter[parentCategory]['ingredients'][myIngredient].checked) {
      alter[parentCategory]['ingredients'][myIngredient].checked = false;
      alter[parentCategory]['amountChecked'] -= 1;
    } else {
      alter[parentCategory]['ingredients'][myIngredient].checked = true;
      alter[parentCategory]['amountChecked'] += 1;
    }
    const item = localStorage.getItem('user');
    const person = JSON.parse(item);
    const bearerToken = person ? person.accessToken : '';
    const userId = person ? person.userid : '';

    const currentDay = new Date();
    const dateOffset = currentDay.getDay();
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
    const body = {
      'mealsid': userId,
      'firstDay': start,
      'category': parentCategory,
      'ingredient': myIngredient,
      'check': alter[parentCategory]['ingredients'][myIngredient].checked,
    };
    fetch(`http://localhost:3010/v0/groceryList`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    });
    setIngredientList(alter);
  };
  const handleHidden = (category) => {
    const newDic = {...ingredientList};
    setAllCategory(newDic, category, !newDic[category].hidden);
    setIngredientList(newDic);
  };
  // Fetch from the database
  useEffect(() => {
    setLoading(false);
  }, [ingredientList]);
  return (
    <Grid>
      {Object.keys(ingredientList).map((category) => (
        // All the categories
        <Grid container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          key={category}>
          <Grid item>
            <FormControlLabel
              label={category}
              control={
                <Checkbox
                  id={category}
                  checked={!loading ? ingredientList[category]['amount'] ===
                ingredientList[category]['amountChecked'] : false}
                  indeterminate={!loading ?
                    ingredientList[category]['amountChecked'] > 0 &&
                  ingredientList[category]['amount'] !==
                  ingredientList[category]['amountChecked'] : false}
                  onChange={handleChange}
                />}
            />
            <IconButton onClick={() => handleHidden(category)}>
              {ingredientList[category].hidden ?
                <ExpandMoreIcon/> : <ExpandLessIcon/>}
            </IconButton>
          </Grid>
          {!loading ? Object.keys(ingredientList[category]['ingredients'])
            .map((ingredient) =>
            // All the ingredients within the category
              (<Box sx={{display: ingredientList[category].hidden ?
                'none' : 'inline-block', ml: 3, gap: 1, mt: 1}}
              key={ingredient}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id={`${category}-${ingredient}`}
                      checked=
                        {ingredientList[category]['ingredients'][ingredient]
                          .checked}
                      onChange={() =>
                        handleChildChange(category, ingredient, startWeek)}
                    />
                  }
                />
                <div className='listElement' id={`${category}-${ingredient}`}
                  onClick={(handleUpdateElement)}>
                  {ingredient}{', '}
                  {ingredientList[category]['ingredients'][ingredient]
                    .amount}
                  {' '}
                  {ingredientList[category]['ingredients'][ingredient].unit}
                </div>
              </Box>)) : <div/>}
        </Grid>
      ))}
    </Grid>
  );
};

export default IndeterminateCheckbox;
