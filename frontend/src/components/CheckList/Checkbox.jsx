/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import {useMeals} from '../MealContextProvider';
// import children from './CheckChildren';
import './Checkbox.css';

// All the supported categories
const categories = [
  'Protein',
  'Vegetable',
  'Dairy',
  'Canned & Dried Produce',
  'Baking',
  'Herbs & Spices',
  'Breads | Pasta | Grains',
];

/**
 * @return {object} Which represents the list of categories
 *                  and thier sublist of ingredients
 */
const IndeterminateCheckbox = () => {
  const {ingredients} = useMeals();
  // When first lanuch \load meal from database and when the week change
  const [needLoad, setNeedLoad] = useState(true);
  // Loading the sechematic of the dictinoary state
  const [categorieState, setCategorieState] = useState({
    'Protein': {'checked': false, 'ingredients': []},
    'Vegetable': {'checked': false, 'ingredients': []},
    'Dairy': {'checked': false, 'ingredients': []},
    'Canned & Dried Produce': {'checked': false, 'ingredients': []},
    'Baking': {'checked': false, 'ingredients': []},
    'Herbs & Spices': {'checked': false, 'ingredients': []},
    'Breads | Pasta | Grains': {'checked': false, 'ingredients': []},
  });
  // Checking the box
  const handleChange = (event) => {
    const newDic = {...categorieState};
    newDic[event.target.id]['checked'] = !newDic[event.target.id]['checked'];
    setCategorieState(newDic);
  };
  // Fetch from the database
  useEffect(() => {
    categories.forEach((category) => {
      if (categorieState[category] && ingredients[category] && needLoad) {
        const newState = categorieState;
        newState[category]['ingredients'] = (ingredients[category]);
        setCategorieState(newState);
        setNeedLoad(false);
      }
    });
  }, [categorieState, ingredients, needLoad]);
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {categories.map((category) => (
        <Grid item key={category}>
          <FormControlLabel
            label={category}
            id={category}
            control={
              <Checkbox
                id={category}
                checked={categorieState[category]['checked']}
                onChange={handleChange}
              />}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default IndeterminateCheckbox;
