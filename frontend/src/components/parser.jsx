/**
 * Queries the database for the meals the user has chosen for the week
 * @param {object} setMeal
 * @param {json} json
 */
function parsePlanData(setMeal, json) {
  const data = json['mealweek'];
  console.log(data);
  const mealPlan = {'mealname': json['mealname']};
  const daysOfWeek = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];
  const TIMES = ['breakfast', 'lunch', 'dinner'];

  const defaultMeal = {
    'recipeid': 0,
    'dishname': '',
    'ingredients': [
    ],
    'ingredientam': 0,
    'imagedata': '',
    'vegan': false,
    'halal': false,
    'healthy': false,
    'kosher': false,
  };

  const defaultDay = [
    // Breakfast
    {...defaultMeal},
    // Lunch
    {...defaultMeal},
    // Dinner
    {...defaultMeal},
  ];

  // Represents the current day I'm getting the meal data for
  const [year, month, day] = json['firstday'].split('-');
  const startDate = new Date(year, month - 1, day);

  for (const weekday of daysOfWeek) {
    const dateIso = startDate.toISOString().split('T')[0];

    const mealsForDay = data[dateIso];

    if (mealsForDay) {
      // User has data for this day
      mealPlan[weekday] = [];
      for (const time of TIMES) {
        if (mealsForDay[time]) {
          // User has meal for the specific time of day
          // breakfast, lunch, dinner
          mealPlan[weekday].push({...mealsForDay[time]});
        } else {
          // User doesnt have a meal for the specific time of day
          mealPlan[weekday].push({...defaultMeal});
        }
      }
    } else {
      // User does not have a meal plan for the day
      // they get the default day meal plan
      mealPlan[weekday] = [...defaultDay];
    }

    // Increment to the next day of the week
    startDate.setDate(startDate.getDate() + 1);
  }

  console.log(mealPlan);
  setMeal(mealPlan);
};


export default parsePlanData;
