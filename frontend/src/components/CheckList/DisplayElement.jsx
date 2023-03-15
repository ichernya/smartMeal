import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';

import defaultImage from '../../assets/qqq.png';

import {useMeals} from '../MealContextProvider';
import './Checkbox.css';
import {postChangeRecipe, postChangeAllRecipes} from './HandleUpdate.jsx';
import createList from '../GenerateList.jsx';


/**
 * Left side view of the checklist where the user can select an ingredient
 * and swap it out with another ingredient
 * @return {object}
 */
function DisplayElement() {
  const {ingredientList, setIngredientList,
    mealsWithIngredient, setMealsWithIngredient,
    isChosenIngredient, setChosenIngredient,
    alteratives, setAlteratives, getMealsForWeek,
    mealPlan, setPlan, startWeek} = useMeals();
  const [selectedAlterative, setSelectedAlterative] = useState(null);
  const [modifiedState, setModifiedState] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isView, setView] = useState(false);
  // Hide the alterative ingredient list of the selected category
  const handleHidden = (a) => {
    const alter = {...modifiedState};
    alter[a].hidden = !alter[a].hidden;
    setModifiedState(alter);
  };
  // Selecting an alterative ingredient to be swapped with
  const handleSelect = (a) => {
    setSelectedAlterative(a);
  };
  // Close the select and return to default state
  const handleCancel = () => {
    setChosenIngredient({
      'name': 'Pick an item from the list',
      'img': '',
      'amount': '',
      'category': '',
    });
    setAlteratives({});
    setView(false);
    setMealsWithIngredient([]);
  };
  // Change one ingredient for one meal
  const handleChange = async () => {
    // Relavent information need to change on ingredent to another for one meal
    const newList = {...ingredientList};
    const oldListElement = newList[isChosenIngredient.category];
    const newListElement =
      oldListElement.ingredients[isChosenIngredient.name];
    const oldMealsWithIngredient = mealsWithIngredient;
    const specificMealtoChange = oldMealsWithIngredient[activeStep];
    const newChosenMeal = specificMealtoChange.meal;
    const ingredientElement =
    newChosenMeal.ingredients[isChosenIngredient.name];
    newListElement.amount -= ingredientElement.amount;
    // CheckList update
    // If the amount in the checklist is 0
    if (newListElement.amount === 0) {
      setAlteratives({});
    }
    // From the list of all the meals with the ingredient
    // remove the current meal
    oldMealsWithIngredient.splice(activeStep, 1);
    // If all the meals with the ingredient is changed cancel set the active
    // ingredient to nothing
    if (oldMealsWithIngredient.length === 0) {
      handleCancel();
    }
    // Edge case where the active meal is the last meal of the list
    if (activeStep === oldMealsWithIngredient.length) {
      setActiveStep(activeStep - 1);
    }
    // Recipes Update
    // Create a deep copy
    const newMeals = JSON.parse(JSON.stringify(mealPlan));
    // Update the specific meal step is on
    const specificMeal =
      newMeals[specificMealtoChange.date][specificMealtoChange.timeOfDay];
    // Changing the name
    specificMeal.ingredients[selectedAlterative] =
      specificMeal.ingredients[isChosenIngredient.name];
    const re = /(\(.*?\))/;
    if (re.test(specificMeal.dishname)) {
      specificMeal.dishname =
        specificMeal.dishname.replace(/(\(.*?\))/, `(${selectedAlterative})`);
    } else {
      specificMeal.dishname =
          `(${selectedAlterative}) ${specificMeal.dishname}`;
    }
    delete specificMeal.ingredients[isChosenIngredient.name];
    const id = await postChangeRecipe(specificMeal, {...mealPlan}, startWeek,
      specificMealtoChange.date, specificMealtoChange.timeOfDay,
      createList, setIngredientList);
    console.log(id);
    specificMeal.recipeid = id;
    setSelectedAlterative(null);
    setMealsWithIngredient(oldMealsWithIngredient);
    setPlan(newMeals);
  };

  // Change one ingredient for all the meals with that ingredient
  const handleChangeAll = async () => {
    // Updating CheckList
    // Creating a very deep copy
    const newMeals = JSON.parse(JSON.stringify(mealPlan));
    // Go over all the meal that has the ingredient
    console.log(mealsWithIngredient);
    // and change the ingredient in it
    mealsWithIngredient.forEach((e) => {
      const specificMeal = newMeals[e.date][e.timeOfDay];
      specificMeal.ingredients[selectedAlterative] =
        specificMeal.ingredients[isChosenIngredient.name];
      e.meal.ingredients[selectedAlterative] =
      specificMeal.ingredients[isChosenIngredient.name];
      specificMeal.dishname =
       `(${selectedAlterative}) ${specificMeal.dishname}`;
      delete specificMeal.ingredients[isChosenIngredient.name];
      delete e.meal.ingredients[isChosenIngredient.name];
    });
    postChangeAllRecipes(mealsWithIngredient, {...mealPlan},
      selectedAlterative, isChosenIngredient.name,
      getMealsForWeek, setPlan, setIngredientList);
    handleCancel();
  };

  // On select alterantive create a copy of the alteratives
  useEffect(() => {
    if (!alteratives || Object.keys(alteratives).length > 0) {
      setModifiedState(alteratives);
      setSelectedAlterative(null);
      setView(true);
    } else {
      setModifiedState({});
    }
    setActiveStep(0);
  }, [alteratives]);
  // Move to the next meal
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  // Move to the previous meal
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const days = {
    'mon': 'Monday',
    'tues': 'Tuesday',
    'wed': 'Wednesday',
    'thurs': 'Thrusday',
    'fri': 'Friday',
    'sat': 'Saturday',
    'sun': 'Sunday',
  };
  const timeOfTheDay = {
    0: 'breakfast',
    1: 'lunch',
    2: 'dinner',
  };
  let image = null;
  if (mealsWithIngredient.length &&
     mealsWithIngredient[activeStep] && mealsWithIngredient[activeStep].meal) {
    image = mealsWithIngredient[activeStep].meal.imagedata;
    // image is present either in base64 or as a template
    if (image) {
      if (!image.startsWith('data:')) {
        image = require('../../assets/templateImage/'+
        image);
      }
    } else {
      image = defaultImage;
    }
  } else {
    image = defaultImage;
  }
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
            src={image}
            alt={defaultImage}
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
                  value={`${mealsWithIngredient[activeStep].meal.dishname}` +
                    ` - ${days[mealsWithIngredient[activeStep].date]}` +
              ` ${timeOfTheDay[mealsWithIngredient[activeStep].timeOfDay]}`
                  }
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
            Object.keys(modifiedState).filter((key) => key !== 'ingredient' &&
              modifiedState[key].alteratives)
              .map((a) => (
                <Grid container direction="column"
                  justifyContent="flex-strt"
                  alignItems="flex-start" key={a}>
                  <Grid item>
                    <Typography>
                      {a === 'tradefor' ? 'Trade for' : 'Vegan alternative'}
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
                      className='listElement'
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
              <ButtonBase onClick={handleChangeAll}
                disabled={selectedAlterative === null}>
              Change All
              </ButtonBase>
            </Grid>: <div/>}
          {Object.keys(alteratives).length ?
            <Grid item>
              <ButtonBase onClick={handleChange}
                className='listElement'
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
