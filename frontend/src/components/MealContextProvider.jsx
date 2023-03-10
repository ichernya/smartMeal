import React, {createContext, useContext, useState, useEffect} from 'react';

const MealsContext = createContext();

const testIngredientList = {
  'Protein': {
    'amount': 1,
    'amountChecked': 0,
    'hidden': false,
    'ingredients': {
      'Beef': {
        'checked': false,
        'quantity': 65,
        'unit': 'Ton',
      },
    },
  },
  'Dairy': {
    'amount': 2,
    'amountChecked': 1,
    'hidden': false,
    'ingredients': {
      'Whole milk': {
        'checked': true,
        'quantity': 33,
        'unit': 'liters',
      },
      'Cheese': {
        'checked': false,
        'quantity': 22,
        'unit': 'Ton',
      },
    },
  },
  'Vegetables': {
    'amount': 1,
    'amountChecked': 0,
    'hidden': false,
    'ingredients': {
      'Jalepeno': {
        'checked': false,
        'quantity': 36,
        'unit': 'Ton',
      },
    },
  },
};

const testMeal = {
  'recipeid': 1,
  'dishname': 'Beef stew',
  'portion': 1,
  'ingredients': {
    'Beef': {
      'quantity': 15,
      'unit': 'Ton',
    },
    'Whole milk': {
      'quantity': 11,
      'unit': 'litter',
    },
    'Jalepeno': {
      'quantity': 12,
      'unit': 'Ton',
    },
  },
  'ingredientam': 3,
  'imagedata': '',
  'vegan': false,
  'halal': true,
  'healthy': false,
  'kosher': true,
};
const testMeal1 = {
  'recipeid': 1,
  'portion': 2,
  'dishname': 'Beef Stick',
  'ingredients': {
    'Beef': {
      'quantity': 10,
      'unit': 'Ton',
    },
    'Cheese': {
      'quantity': 11,
      'unit': 'Ton',
    },
  },
  'ingredientam': 2,
  'imagedata': '',
  'vegan': false,
  'halal': true,
  'healthy': false,
  'kosher': true,
};

const weekMealData = {
  'id': '1',
  'sun': [
    {...testMeal},
    {...testMeal1},
  ],
  'mon': [
    {...testMeal},
    {...testMeal},
  ],
  'tues': [
  ],
  'wed': [
    {...testMeal1},
  ],
  'thrus': [
  ],
  'fri': [
  ],
  'sat': [
  ],
};

export const MealsProvider = ({children}) => {
  const [ingredientList, setIngredientList] = useState({});
  const [meals, setMeals] = useState({});
  const [mealsWithIngredient, setMealsWithIngredient] = useState([]);
  const [alteratives, setAlteratives] = useState({});
  const [isChosenIngredient, setChosenIngredient] = useState(
    {
      'name': 'Pick an item from the list',
      'img': '',
      'pricePerUnitWeight': 'by clicking on the name of the item',
      'quantity': '',
      'category': '',
    },
  );
  useEffect(() => {
    setIngredientList(testIngredientList);
  }, []);
  useEffect(() => {
    setMeals(weekMealData);
  }, []);
  return (
    <MealsContext.Provider value={{
      ingredientList, setIngredientList,
      isChosenIngredient, setChosenIngredient,
      alteratives, setAlteratives,
      meals, setMeals,
      mealsWithIngredient, setMealsWithIngredient,
    }}>
      {children}
    </MealsContext.Provider>
  );
};

// eslint-disable-next-line require-jsdoc
export function useMeals() {
  return useContext(MealsContext);
};

export default MealsProvider;
