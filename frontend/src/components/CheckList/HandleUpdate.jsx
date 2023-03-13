const dateToIntConvert = (day) => {
  const dateMap = {
    'sun': 0,
    'mon': 1,
    'tues': 2,
    'wed': 3,
    'thurs': 4,
    'fri': 5,
    'sat': 6,
  };
  return dateMap[day];
};

export const postChangeRecipe = (newRecipe, mealForDay, startWeek,
  weekday, timeOfDay) => {
  const parsedRecipe = {...newRecipe};
  parsedRecipe.ingredients = [];
  delete parsedRecipe.recipeid;
  Object.keys(newRecipe.ingredients).forEach((ingredient) => {
    const ingredientParam = [];
    ingredientParam.push(ingredient);
    ingredientParam.push(newRecipe.ingredients[ingredient].unit);
    ingredientParam.push(newRecipe.ingredients[ingredient].amount);
    parsedRecipe.ingredients.push(ingredientParam);
  });
  // The first day of the week
  const startDay = startWeek.toISOString().split('T')[0];
  // The  day of the week that is being updated
  const dateCopy = new Date(startWeek);
  dateCopy.setDate(dateCopy.getDate() + dateToIntConvert(weekday));
  const TIMES = ['breakfast', 'lunch', 'dinner'];
  // updated data in the formatted needed by backend
  const update = {
    'breakfast': '0',
    'lunch': '0',
    'dinner': '0',
  };
  for (const [ind, meal] of Object.entries(mealForDay[weekday])) {
    const time = TIMES[ind];
    update[time] = `${meal['recipeid']}`;
  }
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const userId = person.userid;
  const bearerToken = person ? person.accessToken : '';
  fetch('http://localhost:3010/v0/recipes', {
    method: 'POST',
    body: JSON.stringify(parsedRecipe),
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((id) => {
      update[TIMES[timeOfDay]] = id;
      // format the changes in the format needed for backend
      const bodyStringified =
        `{'breakfast': '${update['breakfast']}', ` +
        `'lunch': '${update['lunch']}', ` +
        `'dinner': '${update['dinner']}'}`;
      const body = {
        'mealsid': userId,
        'dayof': `{${dateCopy.toISOString().split('T')[0]}}`,
        'firstDay': startDay,
        'changes': bodyStringified,
      };
      fetch('http://localhost:3010/v0/meals', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    });
};

export const postChangeAllRecipes = (mealsWithIngredient, mealPlan,
  startWeek, specificIngredient) => {
  const toChangeDayMap = {
    'sun': {},
    'mon': {},
    'tues': {},
    'wed': {},
    'thurs': {},
    'fri': {},
    'sat': {},
  };
  const uniqueMeals = {};
  // The first day of the week
  const startDay = startWeek.toISOString().split('T')[0];
  // The  day of the week that is being updated
  const TIMES = ['breakfast', 'lunch', 'dinner'];
  mealsWithIngredient.forEach((meal, i) => {
    if (Object.keys(uniqueMeals).includes(meal.meal.recipeid.toString())) {
      uniqueMeals[meal.meal.recipeid]['index'].push(i);
    } else {
      uniqueMeals[meal.meal.recipeid] = {'meal': meal.meal};
      uniqueMeals[meal.meal.recipeid]['index'] = [i];
    };
  });
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const userId = person.userid;
  const bearerToken = person ? person.accessToken : '';
  Object.values(uniqueMeals).forEach((meal) => {
    const parsedRecipe = {...meal.meal};
    parsedRecipe.ingredients = [];
    delete parsedRecipe.recipeid;
    parsedRecipe.dishname = `(${specificIngredient}) ${meal.meal.dishname}`;
    Object.keys(meal.meal.ingredients).forEach((ingredient) => {
      const ingredientParam = [];
      ingredientParam.push(ingredient);
      ingredientParam.push(meal.meal.ingredients[ingredient].unit);
      ingredientParam.push(meal.meal.ingredients[ingredient].amount);
      parsedRecipe.ingredients.push(ingredientParam);
    });
    console.log(meal);
    fetch('http://localhost:3010/v0/recipes', {
      method: 'POST',
      body: JSON.stringify(parsedRecipe),
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((id) => {
        meal.index.forEach((i) => {
          toChangeDayMap[mealsWithIngredient[i].date][mealsWithIngredient[i]
            .timeOfDay] = id;
        });
      })
      .then(() => {
        Object.keys(toChangeDayMap).forEach((day) => {
          if (Object.keys(toChangeDayMap[day]).length !== 0) {
            const timeOfDayNotChanged = ['0', '1', '2'].filter((val) =>
              !Object.keys(toChangeDayMap[day]).includes(val));
            timeOfDayNotChanged.forEach((timeOfDay) => {
              toChangeDayMap[day][timeOfDay] =
               mealPlan[day][timeOfDay].recipeid ?? 0;
            });
          }
        });
      }).then(() => {
        Object.keys(toChangeDayMap).forEach((day) => {
          if (Object.keys(toChangeDayMap[day]).length !== 0) {
            // updated data in the formatted needed by backend
            const update = {
              'breakfast': '0',
              'lunch': '0',
              'dinner': '0',
            };
            const dateCopy = new Date(startWeek);
            dateCopy.setDate(dateCopy.getDate() + dateToIntConvert(day));
            for (const [ind, recipeid] of Object.entries(toChangeDayMap[day])) {
              const time = TIMES[ind];
              update[time] = `${recipeid}`;
            }
            const bodyStringified =
            `{'breakfast': '${update['breakfast']}', ` +
            `'lunch': '${update['lunch']}', ` +
            `'dinner': '${update['dinner']}'}`;
            const body = {
              'mealsid': userId,
              'dayof': `{${dateCopy.toISOString().split('T')[0]}}`,
              'firstDay': startDay,
              'changes': bodyStringified,
            };
            fetch('http://localhost:3010/v0/meals', {
              method: 'PUT',
              body: JSON.stringify(body),
              headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            });
          }
        });
      });
  });
};
