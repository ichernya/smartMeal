/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import defaultImage from '../../assets/qqq.png';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import {useMeals} from '../MealContextProvider';
import IconButton from '@mui/material/IconButton';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Typography} from '@mui/material';

/**
 * @return {object}
 */
const DisplayElement = () => {
  const {ingredientState, setIngredientState,
    isChosenIngredient, setChosenIngredient,
    alteratives, setAlteratives} = useMeals();
  const [selectedAlterative, setSelectedAlterative] = useState(null);
  const [modifiedState, setModifiedState] = useState({});
  const handleHidden = (a) => {
    const alter = {...modifiedState};
    alter[a].hidden = !alter[a].hidden;
    setModifiedState(alter);
  };
  const handleSelect = (a) => {
    setSelectedAlterative(a);
  };
  const handleCancel = () => {
    setChosenIngredient({
      'name': 'Pick an item from the list',
      'img': '',
      'pricePerUnitWeight': 'by clicking on the name of the item',
      'quantity': '',
    });
    setAlteratives({});
  };
  const handleUpdate = (a) => {
  };
  const handleUpdateAll = (a) => {
  };
  useEffect(() => {
    setModifiedState(alteratives);
    setSelectedAlterative(null);
  }, [alteratives]);
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      justifyContent="space-between"
    >
      <Grid item>
        <img
          style={{
            width: '50%',
            height: undefined,
            aspectRatio: 1,
            paddingTop: '5%',
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
                value={selectedAlterative ?? isChosenIngredient.name}
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
        <Grid>
          {isChosenIngredient.name !== 'Pick an item from the list' ?
            Object.keys(modifiedState).filter((key) => key !== 'ingredient')
              .map((a) => (
                <Grid container direction="column"
                  justifyContent="flex-strt"
                  alignItems="flex-start" key={a}>
                  <Grid item>
                    <Typography>
                      {a}
                      <IconButton onClick={() => (handleHidden(a))}>
                        {modifiedState[a].hidden ?
                          <ExpandMoreIcon id={a}/> : <ExpandLessIcon id={a}/>}
                      </IconButton>
                    </Typography>
                  </Grid>
                  {(modifiedState[a].alteratives).map((ingredient) => (
                    <ButtonBase
                      sx={{display: modifiedState[a].hidden ? 'none' :
                        'inline-block', ml: 3, gap: 1, mt: 1}}
                      key={ingredient}
                      onClick={() => (handleSelect(ingredient))}
                    >
                      {ingredient}
                    </ButtonBase>
                  ))}
                </Grid>
              )) : <div/>}
        </Grid>
        <Grid container
          direction="row"
          justifyContent="space-around"
          marginTop={'5vh'}
          display={isChosenIngredient.name !== 'Pick an item from the list' ?
            'inline-flex' : 'none'}
        >
          <Grid item>
            <ButtonBase onClick={handleCancel}>
              Cancel
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase onClick={handleUpdate}>
              Change All
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase onClick={handleUpdateAll}>
              Change this
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};


export default DisplayElement;
