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
    alteratives, setAlteratives,
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
  };
  // Change one ingredient for one meal
  const handleChange = () => {
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
      if (oldListElement.checked === true) {
        --oldListElement.amountChecked;
      }
      --oldListElement.amount;
      // Remove the old element from the checklist
      delete oldListElement.ingredients[isChosenIngredient.name];
      setAlteratives({});
    } else {
      ++oldListElement.amount;
    }
    // If the intended swap ingredient is already in the checklist
    if (oldListElement.ingredients[selectedAlterative]) {
      oldListElement.amountChecked -= 1;
      oldListElement.ingredients[selectedAlterative].amount +=
        ingredientElement.amount;
      oldListElement.ingredients[selectedAlterative].checked = false;
    } else { // The intended ingredient is not in the checklist
      const newIngredient = {...ingredientElement};
      newIngredient.checked = false;
      oldListElement['ingredients'][selectedAlterative] = newIngredient;
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
    specificMeal.ingredients[selectedAlterative].dishname =
      `(${selectedAlterative}) ${specificMeal
        .ingredients[selectedAlterative].dishname}`;
    // Remove the old name
    specificMeal.dishname = `(${selectedAlterative}) ${specificMeal.dishname}`;
    delete specificMeal.ingredients[isChosenIngredient.name];
    postChangeRecipe(specificMeal, {...mealPlan}, startWeek,
      specificMealtoChange.date, specificMealtoChange.timeOfDay,
      createList, setIngredientList);
    setIngredientList(newList);
    setSelectedAlterative(null);
    setMealsWithIngredient(oldMealsWithIngredient);
    setPlan(newMeals);
  };

  // Change one ingredient for all the meals with that ingredient
  const handleChangeAll = () => {
    // Updating CheckList
    const newList = {...ingredientList};
    const oldListElement = newList[isChosenIngredient.category];
    const newListElement = oldListElement.ingredients;
    if (Object.keys(newListElement).includes(selectedAlterative)) {
      oldListElement.amount -= 1;
      if (newListElement[isChosenIngredient.name].checked) {
        oldListElement.amountChecked -= 1;
      }
      newListElement[selectedAlterative].amount +=
        newListElement[isChosenIngredient.name].amount;
    } else {
      newListElement[selectedAlterative] =
      newListElement[isChosenIngredient.name];
    }
    if (newListElement[selectedAlterative].checked) {
      newListElement[selectedAlterative].checked = false;
      oldListElement.amountChecked -= 1;
    };
    delete newListElement[isChosenIngredient.name];
    // Updating the recipes
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
    setIngredientList(newList);
    setPlan(newMeals);
    postChangeAllRecipes(mealsWithIngredient, {...mealPlan},
      startWeek, selectedAlterative, createList, setIngredientList);
    handleCancel();
  };

  // On select alterantive create a copy of the alteratives
  useEffect(() => {
    if (!alteratives || Object.keys(alteratives).length > 0) {
      setModifiedState(alteratives);
      setSelectedAlterative(null);
      setActiveStep(0);
      setView(true);
    } else {
      setModifiedState({});
    }
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
    'thrus': 'Thrusday',
    'fri': 'Friday',
    'sat': 'Saturday',
    'sun': 'Sunday',
  };
  const timeOfTheDay = {
    0: 'breakfast',
    1: 'lunch',
    2: 'dinner',
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
            src={isChosenIngredient.imageData ?
              isChosenIngredient.imageData : defaultImage}
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
