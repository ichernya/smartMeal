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
        'quantity': 80,
        'unit': 'Ton',
        'pricePerUnitWeight': '$20',
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
        'quantity': 44,
        'unit': 'liters',
        'pricePerUnitWeight': '$20',
      },
      'Cheese': {
        'checked': false,
        'quantity': 22,
        'unit': 'Ton',
        'pricePerUnitWeight': '$20',
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
        'quantity': 48,
        'unit': 'Ton',
        'pricePerUnitWeight': '$20',
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
  'amount': 6,
  '2023-02-19': {
    'breakfast': {...testMeal, 'id': 1},
    'lunch': {...testMeal, 'id': 2},
    'dinner': {...testMeal1, 'id': 3},
  },
  '2023-02-20': {
    'breakfast': {},
    'lunch': {},
    'dinner': {},
  },
  '2023-02-21': {
    'breakfast': {},
    'lunch': {},
    'dinner': {},
  },
  '2023-02-22': {
    'breakfast': {},
    'lunch': {},
    'dinner': {},
  },
  '2023-02-23': {
    'breakfast': {...testMeal, 'id': 13},
    'lunch': {...testMeal, 'id': 14},
    'dinner': {},
  },
  '2023-02-25': {
    'breakfast': {...testMeal1, 'id': 17},
    'lunch': {},
    'dinner': {},
  },
  '2023-02-26': {
    'breakfast': {},
    'lunch': {},
    'dinner': {},
  },
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
