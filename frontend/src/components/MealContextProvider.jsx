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

export const MealsProvider = ({children}) => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    setMeals(testData);
  }, []);
  return (
    <MealsContext.Provider value={{meals}}>
      {children}
    </MealsContext.Provider>
  );
};

// eslint-disable-next-line require-jsdoc
export function useMeals() {
  return useContext(MealsContext);
};

export default MealsProvider;
