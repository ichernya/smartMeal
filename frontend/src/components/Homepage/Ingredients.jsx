import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';

import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {useTheme} from '@mui/material/styles';

import './Menu.css';
import './Home.css';

/**
 * Represents the display for the ingredients of a meal
 * @param {Object} props
 * @return {JSX} Jsx
 */
function IngredientsPopup(props) {
  const {
    setPopup, ingredientPopup, foodIngredient, setFoodIngredient,
  } = React.useContext(props['HomeContext']);

  // Closes dialog of the ingredients
  const clearFoodInfo = () => {
    setFoodIngredient({});
    setPopup(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <Dialog
      fullScreen={fullScreen}
      open={ingredientPopup}
      onClose={clearFoodInfo}
      aria-labelledby="responsive-dialog-title"
      style={{display: ingredientPopup ? '' : 'none'}}
    >
      <DialogTitle id="responsive-dialog-title">
        {`Ingredients for ${foodIngredient['dishname']}`}
      </DialogTitle>
      <DialogContent>
        <List>
          {foodIngredient['ingredients'] &&
            Object.keys(foodIngredient['ingredients']).map((food) => {
              const data = foodIngredient['ingredients'][food];
              const amount = data['amount'] || data['quantity'];
              let unit = data['unit'] === 'N/A' ? food : data['unit'];
              if (
                parseInt(amount) > 1 && data['unit'] === 'N/A'
              ) {
                unit += 's';
              }
              return (

                <div key={food}>
                  <ListItem>
                    {`${food}: ${amount} ${unit}`}
                  </ListItem>
                  <Divider/>
                </div>
              );
            })
          }
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearFoodInfo} autoFocus id='closeSetting'>
            Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default IngredientsPopup;

