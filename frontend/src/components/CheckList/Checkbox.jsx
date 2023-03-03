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
      setAlteratives(alter);
    });
};

const filterMealsForIngredients =
(meals, setMealsWithIngredient, myIngredient) => {
  const mealsOfWithIng = [];
  Object.keys(meals)
    .filter((key) => key !== 'amount' && key !== 'id')
    .forEach((date) => {
      Object.values(meals[date]).filter((obj) => obj &&
      Object.keys(obj).length !== 0)
        .forEach((meal) => {
          Object.keys(meal['ingredients']).filter((key) => key ===
          myIngredient)
            .forEach(() => {
              mealsOfWithIng.push(meal);
            });
        });
    });
  setMealsWithIngredient(mealsOfWithIng);
};

/**
 * Which represents the list of categories and thier sublist of ingredients
 * @return {object}
 */
function IndeterminateCheckbox() {
  const {ingredientList, setIngredientList,
    setChosenIngredient,
    setAlteratives, meals,
    setMealsWithIngredient} = useMeals();
  // When first lanuch load meal from database and when the week change
  const [loading, setLoading] = useState(true);
  const setAll = (target, location, value) => {
    Object.keys(target[location]['ingredients']).forEach((key) => {
      target[location]['ingredients'][key].checked = value;
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
      'pricePerUnitWeight': info.pricePerUnitWeight,
      'quantity': info.quantity,
      'category': parentCategory,
    });
    getMeal(myIngredient, setAlteratives);
    filterMealsForIngredients(meals, setMealsWithIngredient,
      myIngredient);
  };

  const handleChildChange = (event) => {
    const alter = {...ingredientList};
    const [parentCategory, myIngredient] = event.target.id.split('-');
    if (alter[parentCategory]['ingredients'][myIngredient].checked) {
      alter[parentCategory]['ingredients'][myIngredient].checked = false;
      alter[parentCategory]['amountChecked'] -= 1;
    } else {
      alter[parentCategory]['ingredients'][myIngredient].checked = true;
      alter[parentCategory]['amountChecked'] += 1;
    }
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
          alignItems="flex-start" key={category}>
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
                      onChange={handleChildChange}
                    />
                  }
                />
                <div className='listElement' id={`${category}-${ingredient}`}
                  onClick={(handleUpdateElement)}>
                  {ingredient}{', '}
                  {ingredientList[category]['ingredients'][ingredient]
                    .quantity}
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
