import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddPhotoAlternateRoundedIcon from
  '@mui/icons-material/AddPhotoAlternateRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Paper, Typography} from '@mui/material';
import {TextField} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import './AddMealDialog.css';
import '../../colors.css';

/**
 * @return {object}
 * @param {Object} props
 * @return {JSX} Jsx
 */
function AddMealDialog(props) {
  const {addMeal, setAddMeal, setShowAlert} =
    React.useContext(props['HomeContext']);
  const metricUnits = [
    'ml', 'dl', 'l', 'mg', 'g', 'kg', 'mm', 'cm', 'm', '°C', 'unit',
  ];
  const USUnits = [
    'tsp', 'tbs', 'fl oz', 'gill', 'cup', 'pint',
    'quart', 'gal', 'lb', 'oz', 'in', '°F', 'unit',
  ];
  const diets = [
    'Vegan', 'Halal', 'Healthy', 'Kosher',
  ];

  // State
  const [recipeName, setRecipeName] = React.useState('');
  const [dietList, setDietList] = React.useState([]);
  const [ingredients, setIngredients] = React.useState([]);
  const [inputName, setInputName] = React.useState('');
  const [inputWeight, setInputWeight] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [system, setSystem] = React.useState('metric');
  const [fileName, setFileName] =
    React.useState('Select Image (jpeg | png | jpg)');
  const [imageData, setImageData] = React.useState('');
  // States to handle input errors
  // Error on blank input name
  const [errorN, setErrorN] = React.useState(false);
  // Error on blank or 0 quantity
  const [errorW, setErrorW] = React.useState(false);
  // Error on duplicate input name
  const [errorSameN, setErrorSameN] = React.useState(false);
  const [errorU, setErrorU] = React.useState(false); // Error on blank unit
  const [errorMessage, setErrorMessage] = React.useState('');

  /**
   * Return an array with only the name of ingredients
   * (used to check for repetitions)
   * @param {integer} value
   * @param {integer} index
   * @param {object} array
   * @return {object}
   * */
  function nameArray(value, index, array) {
    return value.name;
  }

  // Close the dialog
  const handleClose = () => {
    // Clean the states
    setRecipeName('');
    setDietList([]);
    setIngredients([]);
    setInputName('');
    setInputWeight('');
    setUnit('');
    setFileName('Select Image (jpeg | png | jpg)');
    setImageData('');
    setErrorN(false);
    setErrorW(false);
    setErrorSameN(false);
    setErrorU(false);
    setErrorMessage('');
    // Close the dialog
    setAddMeal(false);
  };

  // Adds ingredient to the list shown
  const addIngredient = () => {
    const array = ingredients.map(nameArray);
    // Check if the name field is empty
    if (inputName === '') {
      setErrorN(true);
    } else if (array.includes(inputName)) {
    // Check for repetitizns
      setErrorSameN(true);
      setErrorN(false);
    } else if (inputWeight <= 0 || isNaN(inputWeight)) {
      // Check if weight input is correct
      setErrorW(true);
      setErrorN(false);
      setErrorSameN(false);
    } else if (unit === '') {
      // Check if unit input is correct
      setErrorU(true);
      setErrorW(false);
      setErrorN(false);
      setErrorSameN(false);
    } else {
      // Add the ingredient
      const newIng = {
        name: inputName,
        quantity: inputWeight,
        unit: unit,
      };

      const newIngredients = [...ingredients, newIng];

      setIngredients(newIngredients);
      setInputName('');
      setInputWeight('');
      setErrorN(false);
      setErrorW(false);
      setErrorSameN(false);
      setErrorU(false);
    }
  };

  // change the unit in the select item
  const changeUnit = (event) => {
    setUnit(event.target.value);
  };

  // change the unit System in the radio element
  const changeSystem = (event) => {
    setSystem(event.target.value);
    setUnit('');
  };

  const changeRecipeName = (event) => {
    setRecipeName(event.target.value);
  };

  // Remove an ingredient from the list
  const removeIngredient = (name) => {
    const newIngredients = [...ingredients]
      .filter((ingredient) => ingredient.name !== name);
    setIngredients(newIngredients);
  };

  /**
   * Return the base64 encoding of the uploaded image
   * @param {Event} e
   * @return {Promise}
  **/
  async function readFileDataAsBase64(e) {
    const file = e.target.files[0];

    await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    }).then((file) => (setImageData(file)));
  }

  // Handle the image upload
  const handleCapture = (event) => {
    console.log(event.target.files[0]);
    const imageName = event.target.files[0].name;
    setFileName(imageName);
    readFileDataAsBase64(event);
  };

  const removeImage = () => {
    setFileName('Select Image (jpeg | png | jpg)');
    setImageData('');
  };

  const changeDiet = (event) => {
    const {
      target: {value},
    } = event;
    setDietList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  /**
   * Format the ingredient list as backend require
   * @param {Array} ingredients
   * @return {Array}
  **/
  function formatIngredients(ingredients) {
    let resultArray = [];
    ingredients.forEach(function(ingredient) {
      let ing;
      if (ingredient.unit === 'unit'){
        ing = [ingredient.name, ingredient.quantity, ingredient.name];
      } else {
        ing = [ingredient.name, ingredient.quantity, ingredient.unit];
      }
      resultArray = [...resultArray, ing];
    });
    return resultArray;
  }

  /**
   * Check if user inputted a correct recipe
   * @param {object} recipe
   * @return {boolean}
  **/
  function recipeIsCorrect(recipe) {
    return recipe.dishName !== '' && recipe.ingredients.length !== 0;
  }

  const addRecipe = (event) => {
    // Initializing the dictionary
    const recipe ={dishname: recipeName,
      ingredients: formatIngredients(ingredients),
      imageData: imageData,
      vegan: dietList.includes('Vegan') ? true : false,
      halal: dietList.includes('Halal') ? true : false,
      healthy: dietList.includes('Healthy') ? true : false,
      kosher: dietList.includes('Kosher') ? true : false,
    };
    console.log(recipe);
    console.log(JSON.stringify(recipe));

    if (recipeIsCorrect(recipe)) {// call the API
      // Retrieve the token
      const item = localStorage.getItem('user');
      const person = JSON.parse(item);
      const bearerToken = person ? person.accessToken : '';

      // Call the API
      fetch(`http://localhost:3010/v0/recipes`, {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: new Headers({
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),
      });
      // Clean the states
      setRecipeName('');
      setDietList([]);
      setIngredients([]);
      setInputName('');
      setInputWeight('');
      setUnit('');
      setFileName('Select Image (jpeg | png | jpg)');
      setImageData('');
      setErrorN(false);
      setErrorW(false);
      setErrorSameN(false);
      setErrorU(false);
      setErrorMessage('');
      // Close the dialog and show the alert
      setAddMeal(false);
      setErrorMessage('');
      setShowAlert(true);
    } else { // Error handling
      setErrorMessage(
        '! You need to insert a title and at least one ingredient !');
    }
  };

  return (
    <React.Fragment>
      <Dialog
        PaperProps={{
          sx: {
            maxHeight: 600,
          },
        }}
        fullWidth={true}
        maxWidth='sm'
        open={addMeal}
        onClose={handleClose}
      >
        <DialogTitle className='aliceBlueBack'>Add your Recipe</DialogTitle>
        <DialogContent className='aliceBlueBack'>
          <DialogContentText>
            You can add your own recipe adding a title,
            ingredients, diets and an optional URL image.
          </DialogContentText>
          <Typography color={'red'}>{errorMessage}</Typography>
          <Grid container component="main" direction="row" spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Name of Recipe"
                id='recipeName'
                variant='outlined'
                margin='normal'
                onChange={changeRecipeName}
                className='greyBack'
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth sx={{mt: 2}}>
                <InputLabel>Diets</InputLabel>
                <Select
                  label='Diet'
                  id='diets'
                  className='greyBack'
                  multiple
                  onChange={changeDiet}
                  value={dietList}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {diets.map((diet) => (
                    <MenuItem
                      id={diet}
                      value={diet}
                      key={diet}>
                      <Checkbox checked={dietList.indexOf(diet) > -1}/>
                      <ListItemText primary={diet} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl sx={{mt: 2}}>
                <FormLabel id="radio-label">System</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-label"
                  name="row-radio-buttons-group"
                  value={system}
                  onChange={changeSystem}
                >
                  <FormControlLabel value="metric" control={<Radio />}
                    label="Metric" id='Metric'/>
                  <FormControlLabel value="US" control={<Radio />}
                    label="US" id='US'/>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                variant='outlined'
                disabled={true}
                value={fileName}
                margin='normal'
                className='greyBack'
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'black',
                  },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                component="label"
                variant="outlined"
                size="large"
                sx={{mt: 2}}
              >
                <AddPhotoAlternateRoundedIcon fontSize='large'
                  className='brownColor'/>
                <input
                  type="file"
                  id='imgUpload'
                  hidden
                  accept='.jpeg, .jpg, .png'
                  onChange={handleCapture}
                />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                component="label"
                id='removeImg'
                variant="outlined"
                size="large"
                onClick={removeImage}
                sx={{mt: 2}}>
                <HighlightOffIcon fontSize="large"
                  className="brownColor"/>
              </IconButton>
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                label="Ingredient"
                id="ingredient"
                variant='outlined'
                margin='normal'
                value={inputName}
                error={errorN || errorSameN}
                helperText={errorSameN ?
                  'You already added this ingredient' : ''}
                onChange={(event) => setInputName(event.target.value)}
                className='greyBack'
              />
            </Grid>
            <Grid item xs={5} md={3}>
              <FormControl
                sx={{mt: 2, mb: 2, mr: 2, maxWidth: 80}}
                variant="outlined">
                <OutlinedInput
                  id="quantity"
                  value={inputWeight}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  error={errorW}
                  onChange={(event) => setInputWeight(event.target.value)}
                  className='greyBack'
                />
                <FormHelperText>
                  Quantitiy
                </FormHelperText>
              </FormControl>
              <FormControl>
                <Select sx={{mt: 2, maxWidth: '80px'}}
                  aria-describedby="select-text"
                  error={errorU}
                  value={unit}
                  onChange={changeUnit}
                  className='greyBack'
                  id='units'
                >
                  {(system === 'metric' ? metricUnits : USUnits).map((unit) => (
                    <MenuItem id={unit} value={unit}
                      key={unit}>{unit}</MenuItem>
                  ))}
                </Select>
                <FormHelperText id="select-text">Unit</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={7} md={2}>
              <IconButton
                variant="outlined"
                sx={{mt: 2}}
                size="large"
                onClick={addIngredient}
                id='addIngredient'
              >
                <AddBoxIcon fontSize='large' className='brownColor'/>
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              {/* The paper show the ingredients list*/}
              <Paper style= {{maxHeight: 200, overflow: 'auto',
                backgroundColor: '#f3f1fa'}}>
                <List>
                  {ingredients.map((ingredient) => (
                    <ListItem alignItems='center' key={ingredient.name}>
                      {/* The Grid is used the components
                       of a sigle list item */}
                      <Grid container spacing={2} component="main"
                        direction="row">
                        <Grid item xs={7} overflow='auto'>
                          <ListItemText>
                            {ingredient.name}
                          </ListItemText>
                        </Grid>
                        <Grid item xs={3}>
                          <ListItemText className='quantity'>
                            {ingredient.quantity}{ingredient.unit}
                          </ListItemText>
                        </Grid>
                        <Grid item xs={2} alignItems='right' sx={{
                          float: 'right',
                        }}>
                          <ListItemButton
                            id={`del${ingredient['name']}`}
                            alignItems='center'
                            variant="outlined"
                            size="large"
                            onClick={() => removeIngredient(ingredient.name)}
                          >
                            <DeleteIcon className='brownColor'/>
                          </ListItemButton>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='aliceBlueBack'>
          <Button onClick={addRecipe} id='add'>Add recipe</Button>
          <Button onClick={handleClose} id='close'>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddMealDialog;
