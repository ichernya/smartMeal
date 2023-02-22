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
    'amount': 18,
    'amountChecked': 4,
    'hidden': false,
    'ingredients': {
      'Beef': {
        'checked': false,
        'quantity': '15 lbs',
        'pricePerUnitWeight': '$20',
      },
      'Lentils': {
        'checked': false,
        'quantity': '12 kg',
        'pricePerUnitWeight': '$10',
      },
      'Salmon': {
        'checked': false,
        'quantity': '50 fillets',
        'pricePerUnitWeight': '$25',
      },
      'Beef1': {
        'checked': false,
        'quantity': '15 lbs',
        'pricePerUnitWeight': '$20',
      },
      'Lentils2': {
        'checked': false,
        'quantity': '12 kg',
        'pricePerUnitWeight': '$10',
      },
      'Salmon3': {
        'checked': false,
        'quantity': '50 fillets',
        'pricePerUnitWeight': '$25',
      },
      'Beef2': {
        'checked': false,
        'quantity': '15 lbs',
        'pricePerUnitWeight': '$20',
      },
      'Lentils1': {
        'checked': false,
        'quantity': '12 kg',
        'pricePerUnitWeight': '$10',
      },
      'Salmon1': {
        'checked': false,
        'quantity': '50 fillets',
        'pricePerUnitWeight': '$25',
      },
      'Beef4': {
        'checked': false,
        'quantity': '15 lbs',
        'pricePerUnitWeight': '$20',
      },
      'Lentils3': {
        'checked': false,
        'quantity': '12 kg',
        'pricePerUnitWeight': '$10',
      },
      'Salmon2': {
        'checked': true,
        'quantity': '50 fillets',
        'pricePerUnitWeight': '$25',
      },
      'Beef32': {
        'checked': false,
        'quantity': '15 lbs',
        'pricePerUnitWeight': '$20',
      },
      'Lentils12': {
        'checked': false,
        'quantity': '12 kg',
        'pricePerUnitWeight': '$10',
      },
      'Salmon312': {
        'checked': true,
        'quantity': '50 fillets',
        'pricePerUnitWeight': '$25',
      },
      'Beef312321': {
        'checked': true,
        'quantity': '15 lbs',
        'pricePerUnitWeight': '$20',
      },
      'Lentils312321': {
        'checked': false,
        'quantity': '12 kg',
        'pricePerUnitWeight': '$10',
      },
      'Salmon123213': {
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
  const [alteratives, setAlteratives] = useState({});
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
      isChosenIngredient, setChosenIngredient, alteratives, setAlteratives}}>
      {children}
    </MealsContext.Provider>
  );
};

// eslint-disable-next-line require-jsdoc
export function useMeals() {
  return useContext(MealsContext);
};

export default MealsProvider;
