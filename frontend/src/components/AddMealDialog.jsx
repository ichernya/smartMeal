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

/**
 * @return {object}
 */
export default function AddMealDialog() {
  const metricUnits = [
    'ml', 'dl', 'l', 'mg', 'g', 'kg', 'mm', 'cm', 'm', '°C', 'unit',
  ];
  const USUnits = [
    'tsp', 'tbs', 'fl oz', 'gill', 'cup', 'pint',
    'quart', 'gal', 'lb', 'oz', 'in', '°F', 'unit',
  ];

  // State
  const [open, setOpen] = React.useState(true);
  const [ingredients, setIngredients] = React.useState([]);
  const [inputName, setInputName] = React.useState('');
  const [inputWeight, setInputWeight] = React.useState();
  const [unit, setUnit] = React.useState('');
  const [system, setSystem] = React.useState('metric');
  // States to handle input errors
  // Error on blank input name
  const [errorN, setErrorN] = React.useState(false);
  // Error on blank or 0 quantity
  const [errorW, setErrorW] = React.useState(false);
  // Error on duplicate input name
  const [errorSameN, setErrorSameN] = React.useState(false);
  const [errorU, setErrorU] = React.useState(false); // Error on blank unit

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
  // Open the dialog
  /*
  const handleClickOpen = () => {
    setOpen(true);
  };
   */

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
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

  // Remove an ingredient from the list
  const removeIngredient = (name) => {
    const newIngredients = [...ingredients]
      .filter((ingredient) => ingredient.name !== name);
    setIngredients(newIngredients);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        PaperProps={{
          sx: {
            maxHeight: 600,
          },
        }}
        fullWidth={true}
        maxWidth='sm'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add your Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add your own recipe adding a title,
            ingredients and an optional URL image.
          </DialogContentText>
          <TextField
            sx={{width: 300}}
            label="Name of Recipe"
            variant='outlined'
            required
            margin='normal'
          />
          <FormControl sx={{mt: 2, ml: 4}}>
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
          <TextField
            fullWidth
            label="Image"
            variant='outlined'
            margin='normal'
          />
          <TextField
            sx={{width: 300}}
            label="Ingredient"
            variant='outlined'
            margin='normal'
            value={inputName}
            error={errorN || errorSameN}
            helperText={errorSameN ? 'You already added this ingredient' : ''}
            onChange={(event) => setInputName(event.target.value)}
          />
          <FormControl sx={{m: 2, width: 80}} variant="outlined">
            <OutlinedInput
              id="outlined-weight"
              value={inputWeight}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              error={errorW}
              onChange={(event) => setInputWeight(event.target.value)}
            />
            <FormHelperText id="outlined-weight-helper-text">
              Quantitiy
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Select sx={{mt: 2, maxWidth: 70}}
              aria-describedby="select-text"
              error={errorU}
              value={unit}
              onChange={changeUnit}
            >
              {(system === 'metric' ? metricUnits : USUnits).map((unit) => (
                <MenuItem value={unit}>{unit} key={unit}</MenuItem>
              ))}
            </Select>
            <FormHelperText id="select-text">Unit</FormHelperText>
          </FormControl>
          <IconButton
            variant="outlined"
            sx={{mt: 2, ml: 1}}
            size="large"
            onClick={addIngredient}
          >
            <AddBoxIcon fontSize='large'/>
          </IconButton>
          {/* The paper show the ingredients list*/}
          <Paper style={{maxHeight: 200, overflow: 'auto'}}>
            <List>
              {ingredients.map((ingredient) => (
                <ListItem alignItems='center' key={ingredient}>
                  {/* The Grid is used the components of a sigle list item */}
                  <Grid container spacing={2} component="main" direction="row">
                    <Grid item sm={7} overflow='auto'>
                      <ListItemText>
                        {ingredient.name}
                      </ListItemText>
                    </Grid>
                    <Grid item sm={3}>
                      <ListItemText>
                        {ingredient.quantity}{ingredient.unit}
                      </ListItemText>
                    </Grid>
                    <Grid item sm={2} alignItems='right' sx={{
                      float: 'right',
                    }}>
                      <ListItemButton
                        alignItems='center'
                        variant="outlined"
                        size="large"
                        onClick={() => removeIngredient(ingredient.name)}
                      ><DeleteIcon/></ListItemButton>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button>Add recipe</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
