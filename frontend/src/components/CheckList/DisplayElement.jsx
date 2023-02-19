/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import defaultImage from '../../assets/qqq.png';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useMeals} from '../MealContextProvider';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

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
      if (json[0]) {
        setAlteratives(json[0]);
      }
    });
};

/**
 * @return {object}
 */
const DisplayElement = () => {
  const {ingredientState, setIngredientState,
    isChosenIngredient, setChosenIngredient} = useMeals();
  const [alteratives, setAlteratives] = useState({
    'ingredient': 'name',
    'tradeoff': ['1', '2', '3'],
    'vegan': ['3', '2', '1'],
  });
  const defaultState = {
    'name': 'Pick an item from the list',
    'img': '',
    'pricePerUnitWeight': 'by clicking on the name of the item',
    'quantity': '',
  };
  useEffect(() => {
    getMeal(isChosenIngredient.name, setAlteratives);
  }, [isChosenIngredient]);
  console.log(alteratives);
  return (
    <Grid
      container
      direction="column"
      spacing={2}
    >
      <Grid item height='30%'>
        <img
          style={{
            width: '70%',
            height: undefined,
            aspectRatio: 1,
            paddingTop: '10%',
          }}
          component="img"
          src={isChosenIngredient.img ? isChosenIngredient.img : defaultImage}
          alt={isChosenIngredient.name}
          loading="lazy"
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth variant="standard" width='100%'>
          {isChosenIngredient.name !== 'Pick an item from the list' ?
            <div>
              <TextField
                label="Ingredient"
                variant="standard"
                value={isChosenIngredient.name}
                inputProps={{min: 0, style: {textAlign: 'center'}}}
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000000',
                  },
                }}
                fullWidth
                disabled
              />
            </div> :
            isChosenIngredient.name
          }
        </FormControl>
      </Grid>
      <Grid item>
        {isChosenIngredient.name !== 'Pick an item from the list' ?
          Object.keys(alteratives).filter((key) => key !== 'ingredient')
            .map((a) => (
              <FormControl fullWidth>
                <InputLabel>Text</InputLabel>
                <Select
                  value={a}
                  indicator={<KeyboardArrowDown />}
                  fullWidth
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            )):
          <div/>}
      </Grid>
    </Grid>
  );
};


export default DisplayElement;
