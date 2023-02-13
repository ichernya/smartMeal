/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import defaultImage from '../../assets/qqq.png';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
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

/**
 *
 * @return {object}
 */
const DisplayElement = () => {
  const {ingredientState, setIngredientState,
    isChoosenIngredient, setChoosenIngredient} = useMeals();

  useEffect(() => {
    console.log(isChoosenIngredient.quantity.split(' ')[0]);
  }, [isChoosenIngredient]);
  const handleUpdateElement = (event) => {
    const newChoosen = isChoosenIngredient;
    newChoosen[event.target.id] = event.target.value;
    console.log(newChoosen[event.target.id]);
    setChoosenIngredient(newChoosen);
  };
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
        <FormControl fullWidth variant="standard">
          {isChoosenIngredient.quantity === '' ? isChoosenIngredient.name :
            <TextField
              label="Name"
              required
              id="name"
              value={isChoosenIngredient.name}
              variant="filled"
              size="small"
              onChange={(e) => {
                setChoosenIngredient({isChoosenIngredient: e.target.value});
              }}
            />}
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth variant="standard">
          {isChoosenIngredient.quantity === '' ? isChoosenIngredient
            .pricePerUnitWeight :
            <TextField
              label={`Price per ${isChoosenIngredient.quantity.split(' ')[1]}`}
              required
              id="price"
              value={isChoosenIngredient.pricePerUnitWeight}
              variant="filled"
              size="small"
            />}
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth variant="standard">
          {isChoosenIngredient.quantity === '' ? isChoosenIngredient
            .quantity:
            <TextField
              label="Quantity"
              required
              id="quantity"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isChoosenIngredient.quantity.split(' ')[1]}
                  </InputAdornment>
                ),
              }}
              value={isChoosenIngredient.quantity.split(' ')[0]}
              variant="filled"
              size="small"
            />}
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth variant="standard">
          {isChoosenIngredient.quantity === '' ? isChoosenIngredient
            .quantity :
            <TextField
              label="Price"
              id="filled-size-small"
              variant="filled"
              size="small"
            />}
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default DisplayElement;
