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
      setAlteratives(json[0]);
    });
};

/**
 * @return {object}
 */
function DisplayElement() {
  const {ingredientState, setIngredientState,
    isChoosenIngredient, setChoosenIngredient} = useMeals();
  const [alteratives, setAlteratives] = useState({});
  const [isAlterative, setAlterative] = useState(false);
  useEffect(() => {
    getMeal(isChoosenIngredient.name, setAlteratives);
  }, [isChoosenIngredient]);
  useEffect(() => {
    setAlterative(false);
  }, [alteratives]);
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
          src={isChoosenIngredient.img ? isChoosenIngredient.img : defaultImage}
          alt={isChoosenIngredient.name}
          loading="lazy"
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth variant="standard" width='100%'>
          {isAlterative ?
            <div>
              <TextField
                label="Ingredient"
                variant="standard"
                value={isChoosenIngredient.name}
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
            isChoosenIngredient.name
          }
        </FormControl>
      </Grid>
    </Grid>
  );
};

/**
 *       <Grid item>
        {!isAlterative ? <div>123</div> :
          Object.keys(alteratives).filter((key) => key !== 'ingredient')
            .map((a) => (
              <FormControl fullWidth>
                <InputLabel> {a} </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={a}
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            ))}
      </Grid>
 */


export default DisplayElement;
