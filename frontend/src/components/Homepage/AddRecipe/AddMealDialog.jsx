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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Paper} from '@mui/material';
import {TextField} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import './AddMealDialog.css';
import '../../colors.css';

/**
 * @return {object}
 * @param {Object} props
 * @return {JSX} Jsx
 */
function AddMealDialog(props) {
  const {addMeal, setAddMeal} = React.useContext(props['HomeContext']);
  const metricUnits = [
    'ml', 'dl', 'l', 'mg', 'g', 'kg', 'mm', 'cm', 'm', '°C', 'unit',
  ];
  const USUnits = [
    'tsp', 'tbs', 'fl oz', 'gill', 'cup', 'pint',
    'quart', 'gal', 'lb', 'oz', 'in', '°F', 'unit',
  ];

  // State
  const [recipeName, setRecipeName] = React.useState('');
  const [ingredients, setIngredients] = React.useState([]);
  const [inputName, setInputName] = React.useState('');
  const [inputWeight, setInputWeight] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [system, setSystem] = React.useState('metric');
  const [fileName, setFileName] = React.useState('Select Image');
  // States to handle input errors
  // Error on blank input name
  const [errorN, setErrorN] = React.useState(false);
  // Error on blank or 0 quantity
  const [errorW, setErrorW] = React.useState(false);
  // Error on duplicate input name
  const [errorSameN, setErrorSameN] = React.useState(false);
  const [errorU, setErrorU] = React.useState(false); // Error on blank unit
  // Error on image selection
  const [typographyColor, setTypographyColor] = React.useState('black');

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

  const handleCapture = (event) => {
    /* setSelectedFile(URL.createObjectURL(event.target.files[0])); */
    const imageName = event.target.files[0].name;
    if (imageName.toUpperCase().endsWith('.JPEG') ||
      imageName.toUpperCase().endsWith('.JPG') ||
      imageName.toUpperCase().endsWith('.PNG')) {
      setFileName(imageName);
      setTypographyColor('black');
    } else {
      setFileName('Format accepted: jpeg | jpg | png');
      setTypographyColor('#b55f1e');
    }
  };

  const addRecipe = () => {
    console.log('Recipe: ' + recipeName);
    console.log('ImageURL: ' + fileName);
    console.log(ingredients);
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
            ingredients and an optional URL image.
          </DialogContentText>
          <Grid container component="main" direction="row">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name of Recipe"
                variant='outlined'
                required
                margin='normal'
                onChange={changeRecipeName}
                className='greyBack'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{mt: 2, ml: 2}}>
                <FormLabel id="radio-label">System</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-label"
                  name="row-radio-buttons-group"
                  value={system}
                  onChange={changeSystem}
                >
                  <FormControlLabel value="metric" control={<Radio />}
                    label="Metric" />
                  <FormControlLabel value="US" control={<Radio />} label="US" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant='outlined'
                disabled={true}
                value={fileName}
                margin='normal'
                className='greyBack'
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: typographyColor,
                  },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                component="label"
                variant="outlined"
                size='large'
                sx={{mt: 1}}
              >
                <AddPhotoAlternateRoundedIcon fontSize='large'
                  className='brownColor'/>
                <input
                  type="file"
                  hidden
                  onChange={handleCapture}
                />
              </IconButton>
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                label="Ingredient"
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
            <Grid item xs={11} md={4}>
              <FormControl
                sx={{mt: 2, mb: 2, mr: 2, maxWidth: 80}}
                variant="outlined">
                <OutlinedInput
                  id="outlined-weight"
                  value={inputWeight}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  error={errorW}
                  onChange={(event) => setInputWeight(event.target.value)}
                  className='greyBack'
                />
                <FormHelperText id="outlined-weight-helper-text">
                  Quantitiy
                </FormHelperText>
              </FormControl>
              <FormControl>
                <Select sx={{mt: 2, maxWidth: '70px'}}
                  aria-describedby="select-text"
                  error={errorU}
                  value={unit}
                  onChange={changeUnit}
                  className='greyBack'
                >
                  {(system === 'metric' ? metricUnits : USUnits).map((unit) => (
                    <MenuItem value={unit} key={unit}>{unit}</MenuItem>
                  ))}
                </Select>
                <FormHelperText id="select-text">Unit</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                variant="outlined"
                sx={{mt: 2}}
                size="large"
                onClick={addIngredient}
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
                    <ListItem alignItems='center' key={ingredient}>
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
                            alignItems='center'
                            variant="outlined"
                            size="large"
                            onClick={() => removeIngredient(ingredient.name)}
                          ><DeleteIcon className='brownColor'/></ListItemButton>
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
          <Button onClick={addRecipe}>Add recipe</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddMealDialog;
