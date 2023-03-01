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
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';

/**
 * @return {object}
 */
const DisplayElement = () => {
  const {ingredientList, setIngredientList,
    mealsWithIngredient, setMealsWithIngredient,
    isChosenIngredient, setChosenIngredient,
    alteratives, setAlteratives, meals} = useMeals();
  const [selectedAlterative, setSelectedAlterative] = useState(null);
  const [modifiedState, setModifiedState] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isView, setView] = useState(false);
  const handleHidden = (a) => {
    const alter = {...modifiedState};
    alter[a].hidden = !alter[a].hidden;
    setModifiedState(alter);
  };
  const handleSelect = (a) => {
    setSelectedAlterative(a);
  };
  // Close the select and return to default state
  const handleCancel = () => {
    setChosenIngredient({
      'name': 'Pick an item from the list',
      'img': '',
      'quantity': '',
    });
    setAlteratives({});
    setView(false);
  };
  // Change one ingredient for one meal
  const handleChange = () => {
    const newList = {...ingredientList};
    const oldListElement = newList[isChosenIngredient.category];
    const newListElement =
      oldListElement['ingredients'][isChosenIngredient.name];
    const oldMealsWithIngredient = mealsWithIngredient;
    const newChosenMeal = oldMealsWithIngredient[activeStep];
    const ingredientElement =
    newChosenMeal['ingredients'][isChosenIngredient.name];
    newListElement['quantity'] -= ingredientElement['quantity'];
    if (newListElement['quantity'] === 0) {
      if (oldListElement['checked'] === true) {
        --oldListElement['amountChecked'];
      }
      --oldListElement['amount'];
      delete oldListElement['ingredients'][isChosenIngredient.name];
      setAlteratives({});
    } else {
      ++oldListElement['amount'];
    }
    if (oldListElement['ingredients'][selectedAlterative]) {
      console.log(oldListElement['ingredients'][selectedAlterative],
        selectedAlterative);
      oldListElement['ingredients'][selectedAlterative]['quantity'] +=
        ingredientElement['quantity'];
    } else {
      const newIngredient = {...ingredientElement};
      newIngredient['checked'] = false;
      oldListElement['ingredients'][selectedAlterative] = newIngredient;
    }
    oldMealsWithIngredient.splice(activeStep, 1);
    if (oldMealsWithIngredient.length === 0) {
      handleCancel();
    }
    if (activeStep === oldMealsWithIngredient.length) {
      setActiveStep(activeStep - 1);
    }
    console.log(meals);
    setIngredientList(newList);
    setSelectedAlterative(null);
    setMealsWithIngredient(oldMealsWithIngredient);
    // setChosenIngredient({...isChosenIngredient, 'name': selectedAlterative});
  };
  // Change one ingredient for all the meals with that ingredient
  const handleUChangeAll = () => {
  };
  // On select alterantive create a copy of the alteratives
  useEffect(() => {
    if (alteratives && Object.keys(alteratives).length !== 0) {
      setModifiedState(alteratives);
      setSelectedAlterative(null);
      setActiveStep(0);
      setView(true);
    }
  }, [alteratives]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      justifyContent="space-between"
      paddingTop ='5%'
    >
      <Grid item>
        <Grid sx={{height: '30vh', width: '100%'}}>
          <img
            style={{
              width: '30vh',
              height: undefined,
              aspectRatio: 1,
            }}
            component="img"
            src={isChosenIngredient.img ? isChosenIngredient.img : defaultImage}
            alt={isChosenIngredient.name}
            loading="lazy"
          />
        </Grid>
        {isView ?
          <MobileStepper
            steps={mealsWithIngredient.length}
            position="static"
            variant='dots'
            activeStep={activeStep}
            sx={{'backgroundColor': 'aliceblue'}}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === mealsWithIngredient.length - 1}
              >
                <KeyboardArrowRight className={activeStep ===
                  mealsWithIngredient.length - 1 ? '' : 'brownColor'}/>
              </Button>
            }
            backButton={
              <Button size="small"
                onClick={handleBack}
                disabled={activeStep === 0}>
                <KeyboardArrowLeft className={activeStep ===
                  0 ? '' : 'brownColor'}/>
              </Button>
            }
          /> : <div/>}
      </Grid>
      <Grid item>
        <FormControl fullWidth variant="standard" width='100%'>
          {isView ?
            <div>
              {mealsWithIngredient[activeStep] ?
                <TextField
                  label="Meal"
                  variant="standard"
                  value={mealsWithIngredient[activeStep].dishname}
                  inputProps={{min: 0, style: {textAlign: 'center'}}}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  fullWidth
                  disabled
                />: <div/>}
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
          {isView ?
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
            'inline-flex' : 'none'}>
          <Grid item>
            <ButtonBase onClick={handleCancel}>
              Cancel
            </ButtonBase>
          </Grid>
          {Object.keys(alteratives).length ?
            <Grid item>
              <ButtonBase onClick={handleUChangeAll}
                disabled={selectedAlterative === null}>
              Change All
              </ButtonBase>
            </Grid>: <div/>}
          {Object.keys(alteratives).length ?
            <Grid item>
              <ButtonBase onClick={handleChange}
                disabled={selectedAlterative === null}>
              Change this
              </ButtonBase>
            </Grid>: <div/>
          }
        </Grid>
      </Grid>
    </Grid>
  );
};


export default DisplayElement;
