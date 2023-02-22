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
const getMeal = (ingredient, alteratives, setAlteratives) => {
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

/**
 * Which represents the list of categories and thier sublist of ingredients
 * @return {object}
 */
const IndeterminateCheckbox = () => {
  const {ingredientState, setIngredientState,
    setChosenIngredient, alteratives, setAlteratives} = useMeals();
  // When first lanuch \load meal from database and when the week change
  const [loading, setLoading] = useState(true);
  const setAll = (target, location, value) => {
    Object.keys(target[location]['ingredients']).forEach((key) => {
      target[location]['ingredients'][key].checked = value;
    });
  };
  const setAllCategory = (target, location, value) => {
    Object.keys(target[location]).forEach((key) => {
      target[location].hidden = value;
    });
  };
  // Checking the box
  const handleChange = (event) => {
    const newDic = {...ingredientState};
    if (newDic[event.target.id]['amount'] ===
    newDic[event.target.id]['amountChecked']) {
      newDic[event.target.id]['amountChecked'] = 0;
      setAll(newDic, event.target.id, false);
    } else {
      newDic[event.target.id]['amountChecked'] =
      newDic[event.target.id]['amount'];
      setAll(newDic, event.target.id, true);
    }
    setIngredientState(newDic);
  };
  const handleUpdateElement = (event) => {
    const [parentCategory, myIngredient] = event.target.id.split('-');
    const info = ingredientState[parentCategory].ingredients[myIngredient];
    setChosenIngredient({
      'name': myIngredient,
      'img': info.img,
      'pricePerUnitWeight': info.pricePerUnitWeight,
      'quantity': info.quantity,
    });
    getMeal(myIngredient, alteratives, setAlteratives);
  };
  const handleChildChange = (event) => {
    const alter = {...ingredientState};
    const [parentCategory, myIngredient] = event.target.id.split('-');
    if (alter[parentCategory]['ingredients'][myIngredient].checked) {
      alter[parentCategory]['ingredients'][myIngredient].checked = false;
      alter[parentCategory]['amountChecked'] -= 1;
    } else {
      alter[parentCategory]['ingredients'][myIngredient].checked = true;
      alter[parentCategory]['amountChecked'] += 1;
    }
    setIngredientState(alter);
  };
  const handleHidden = (category) => {
    const newDic = {...ingredientState};
    setAllCategory(newDic, category, !newDic[category].hidden);
    setIngredientState(newDic);
  };
  // Fetch from the database
  useEffect(() => {
    setLoading(false);
  }, [ingredientState]);
  return (
    <Grid>
      {Object.keys(ingredientState).map((category) => (
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
                  checked={!loading ? ingredientState[category]['amount'] ===
                ingredientState[category]['amountChecked'] : false}
                  indeterminate={!loading ?
                    ingredientState[category]['amountChecked'] > 0 &&
                  ingredientState[category]['amount'] !==
                  ingredientState[category]['amountChecked'] : false}
                  onChange={handleChange}
                />}
            />
            <IconButton onClick={() => handleHidden(category)}>
              {ingredientState[category].hidden ?
                <ExpandMoreIcon/> : <ExpandLessIcon/>}
            </IconButton>
          </Grid>
          {!loading ? Object.keys(ingredientState[category]['ingredients'])
            .map((ingredient) =>
            // All the ingredients within the category
              (<Box sx={{display: ingredientState[category].hidden ?
                'none' : 'inline-block', ml: 3, gap: 1, mt: 1}}
              key={ingredient}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id={`${category}-${ingredient}`}
                      checked=
                        {ingredientState[category]['ingredients'][ingredient]
                          .checked}
                      onChange={handleChildChange}
                    />
                  }
                />
                <div className='listElement' id={`${category}-${ingredient}`}
                  onClick={(handleUpdateElement)}>
                  {ingredient}{', '}
                  {ingredientState[category]['ingredients'][ingredient]
                    .quantity}
                </div>
              </Box>)) : <div/>}
        </Grid>
      ))}
    </Grid>
  );
};

export default IndeterminateCheckbox;
