/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import {useMeals} from '../MealContextProvider';
// import children from './CheckChildren';
import './Checkbox.css';

const categories = [
  'Protein',
  'Vegetable',
  'Dairy',
  'Canned & Dried Produce',
  'Baking',
  'Herbs & Spices',
  'Breads | Pasta | Grains',
];
const ingredientDict = {
  'Protein': ['Chicken Breast'],
  'Dairy': ['Parmesan', 'Butter', 'Cheese'],
  'Vegetable': ['Baby Bella Mushrooms', 'Jalepeno'],
  'Breads | Pasta | Grains': ['Pasta'],
};
/**
 * @return {object}
 */
const IndeterminateCheckbox = () => {
  const {meals} = useMeals();
  const [needLoad, setNeedLoad] = useState(true);
  const [categorieState, setCategorieState] = useState({
    'Protein': {'checked': false, 'ingredients': []},
    'Vegetable': {'checked': false, 'ingredients': []},
    'Dairy': {'checked': false, 'ingredients': []},
    'Canned & Dried roduce': {'checked': false, 'ingredients': []},
    'Baking': {'checked': false, 'ingredients': []},
    'Herbs & Spices': {'checked': false, 'ingredients': []},
    'Breads | Pasta | Grains': {'checked': false, 'ingredients': []},
  });
  const handleChange1 = (event) => {
    setCategorieState([event.target.checked, event.target.checked]);
  };
  useEffect(() => {
    categories.forEach((category) => {
      if (categorieState[category] && ingredientDict[category] && needLoad) {
        const newState = categorieState;
        newState[category]['ingredients'] = (ingredientDict[category]);
        setCategorieState(newState);
      }
    });
  }, [categorieState, needLoad]);
  console.log()
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
                onChange={handleChange1}
              />}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default IndeterminateCheckbox;
