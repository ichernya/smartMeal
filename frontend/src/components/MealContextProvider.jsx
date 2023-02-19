import React, {createContext, useContext, useState, useEffect} from 'react';

const MealsContext = createContext();

const testData = [
  {
    'recipeid': 1,
    'dishname': 'Mushroom Poppers',
    'ingredients': {
      'Vegetable': ['Baby Bella Mushrooms', 'Jalepeno'],
      'Dairy': ['Cheese'],
    },
    'ingredientam': 3,
    'imagedata': '/test.png',
    'vegan': false,
    'halal': true,
    'healthy': false,
    'kosher': true,
  },
  {
    'recipeid': 2,
    'dishname': 'Chicken Parmesan',
    'ingredients': {
      'Protein': 'Chicken Breast',
      'Dairy': ['Parmesan', 'Butter'],
      'Breads | Pasta | Grains': ['Pasta'],
    },
    'ingredientam': 4,
    'imagedata': '/test.png',
    'vegan': false,
    'halal': true,
    'healthy': true,
    'kosher': true,
  },
];
const testIngredientList = {
  'Protein': {
    'amount': 3,
    'amountChecked': 2,
    'hidden': false,
    'ingredients': {
      'Beef': {
        'checked': true,
        'quantity': '15 lbs',
        'pricePerUnitWeight': '$20',
      },
      'Lentils': {
        'checked': false,
        'quantity': '12 kg',
        'pricePerUnitWeight': '$10',
      },
      'Salmon': {
        'checked': true,
        'quantity': '50 fillets',
        'pricePerUnitWeight': '$25',
      },
    },
  },
  'Dairy': {
    'amount': 1,
    'amountChecked': 1,
    'hidden': false,
    'ingredients': {
      'Whole milk': {
        'checked': true,
        'quantity': '15 liters',
        'pricePerUnitWeight': '$20',
      },
    },
  },
};

export const MealsProvider = ({children}) => {
  const [meals, setMeals] = useState([]);
  const [ingredientState, setIngredientState] = useState({});
  const [isChosenIngredient, setChosenIngredient] = useState(
    {
      'name': 'Pick an item from the list',
      'img': '',
      'pricePerUnitWeight': 'by clicking on the name of the item',
      'quantity': '',
    },
  );
  useEffect(() => {
    setMeals(testData);
    setIngredientState(testIngredientList);
  }, []);
  return (
    <MealsContext.Provider value={{meals, ingredientState, setIngredientState,
      isChosenIngredient, setChosenIngredient}}>
      {children}
    </MealsContext.Provider>
  );
};

// eslint-disable-next-line require-jsdoc
export function useMeals() {
  return useContext(MealsContext);
};

export default MealsProvider;
