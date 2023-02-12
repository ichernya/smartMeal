import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { TextField } from '@mui/material';

export default function AddMealDialog() {

  const [open, setOpen] = React.useState(true);

  const [ingredients, setIngredients] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
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
          />
          <FormControl sx={{ m: 2, width: 80 }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
          </FormControl>
          <Button 
          variant="outlined"
          sx={{mt: 2, ml: 2}}
          size="large"
          >+</Button>
          <Box>
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}