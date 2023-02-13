import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Paper, Typography } from '@mui/material';
import { TextField } from '@mui/material';

export default function AddMealDialog() {


  //State
  const [open, setOpen] = React.useState(true);
  const [ingredients, setIngredients] = React.useState([]);
  const [inputName, setInputName] = React.useState("");
  const [inputWeight, setInputWeight] = React.useState();
  //States to handle input errors
  const [errorN, setErrorN] = React.useState(false);
  const [errorW, setErrorW] = React.useState(false);

  //Open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  //Adds ingredient to the list shown
  const addIngredient = () => {

    if(inputName === '')
    {
      setErrorN(true);
    }
    else if(inputWeight <= 0 || isNaN(inputWeight))
    {
      setErrorN(false);
      setErrorW(true);
    }   
    else
    {
      const newIng = {
        name: inputName,
        quantity: inputWeight
      };
  
      const newIngredients = [...ingredients, newIng];
  
      setIngredients(newIngredients);
      setInputName("");
      setInputWeight(0);
      setErrorN(false);
      setErrorW(false);
    }
  };

  //Remove an ingredient from the list
  const removeIngredient = (name) => {
    const newIngredients = [...ingredients].filter((ingredient) => ingredient.name !== name);
    setIngredients(newIngredients);
  }

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        PaperProps={{
          sx: {
            maxHeight: 600
          }
        }}
        fullWidth={true}
        maxWidth='sm'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add your Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add your own recipe adding a title, ingredients and an image.
          </DialogContentText>
          <TextField
            sx={{width: 300}}
            label="Name of Recipe"
            variant='outlined'
            required
            margin='normal'
          />
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
            error={errorN}
            onChange={(event) => setInputName(event.target.value)}
          />
          <FormControl sx={{ m: 2, width: 80 }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              value={inputWeight}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              error={errorW}
              onChange={(event) => setInputWeight(event.target.value)}
            />
            <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
          </FormControl>
          <IconButton 
            variant="outlined"
            sx={{mt: 2}}
            size="large"
            onClick={addIngredient}
          >
            <AddBoxIcon fontSize='large'/>
          </IconButton>
          {/*The paper show the ingredients list*/}
          <Paper style={{maxHeight: 200, overflow: 'auto'}}>
            <List>
              {ingredients.map((ingredient) => (
                <ListItem alignItems='center'>
                  {/* The Grid is used the components of a sigle list item */}
                  <Grid container spacing={2} component="main" direction="row">
                    <Grid item sm={7} overflow='auto'>
                      <ListItemText>
                        {ingredient.name}
                      </ListItemText>
                    </Grid>
                    <Grid item sm={3}>
                      <ListItemText>
                        {ingredient.quantity}g
                      </ListItemText>
                    </Grid>
                    <Grid item sm={2} alignItems='right' sx={{
                      float: 'right'
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