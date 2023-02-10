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

/**
 * @return {object} Which represents the list of categories
 *                  and thier sublist of ingredients
 */
const IndeterminateCheckbox = () => {
  const {ingredientState, setIngredientState} = useMeals();
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
  const handleChildChange = (event) => {
    const newDic = {...ingredientState};
    const [parentCategory, myIngredient] = event.target.id.split('-');
    if (newDic[parentCategory]['ingredients'][myIngredient].checked) {
      newDic[parentCategory]['ingredients'][myIngredient].checked = false;
      newDic[parentCategory]['amountChecked'] -= 1;
    } else {
      newDic[parentCategory]['ingredients'][myIngredient].checked = true;
      newDic[parentCategory]['amountChecked'] += 1;
    }
    setIngredientState(newDic);
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
              (<Box sx={{display: ingredientState[category].hidden ?
                'none' : 'flex', flexDirection:
              'column', ml: 3, gap: 1, mt: 1}} key={ingredient}>
                <FormControlLabel
                  label={ingredient}
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
              </Box>)) : <div/>}
        </Grid>
      ))}
    </Grid>
  );
};

export default IndeterminateCheckbox;
