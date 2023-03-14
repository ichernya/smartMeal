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
  weekday, timeOfDay, createList, setIngredientList) => {
  const parsedRecipe = {...newRecipe};
  parsedRecipe.ingredients = [];
  delete parsedRecipe.recipeid;
  Object.keys(newRecipe.ingredients).forEach((ingredient) => {
    const ingredientParam = [ingredient,
      newRecipe.ingredients[ingredient].amount,
      newRecipe.ingredients[ingredient].unit];
    parsedRecipe.ingredients.push(ingredientParam);
  });
  parsedRecipe.imageData = parsedRecipe.imagedata;
  delete parsedRecipe.imagedata;
  // The day of the week that is being updated
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
      // calculates the start and end of the week
      const currentDay = new Date();
      const dateOffset = currentDay.getDay();
      const startWeek = new Date();
      startWeek.setDate(currentDay.getDate() - dateOffset);
      let [month, day, year] = startWeek.toLocaleDateString().split('/');
      if (parseInt(month) < 10) {
        month = '0' + month;
      }
      if (parseInt(day) < 10) {
        day = '0' + day;
      }
      const start = `${year}-${month}-${day}`;
      console.log(start);
      // format the changes in the format needed for backend
      const bodyStringified =
        `{'breakfast': '${update['breakfast']}', ` +
        `'lunch': '${update['lunch']}', ` +
        `'dinner': '${update['dinner']}'}`;
      const body = {
        'mealsid': userId,
        'dayof': `{${start}}`,
        'firstDay': start,
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
      })
        .then(() => {
          createList(setIngredientList, startWeek);
        });
    });
};

export const postChangeAllRecipes = (mealsWithIngredient, mealPlan,
  s, specificIngredient, createList, setIngredientList) => {
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
  // calculates the start and end of the week
  const currentDay = new Date();
  const dateOffset = currentDay.getDay();
  const startWeek = new Date();
  startWeek.setDate(currentDay.getDate() - dateOffset);
  let [month, day, year] = startWeek.toLocaleDateString().split('/');
  if (parseInt(month) < 10) {
    month = '0' + month;
  }
  if (parseInt(day) < 10) {
    day = '0' + day;
  }
  const start = `${year}-${month}-${day}`;

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
            const [month, dday, year] =
             dateCopy.toLocaleDateString().split('/');
            const dateIso = `${year}-${month}-${dday}`;
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
              'dayof': `{${dateIso}}`,
              'firstDay': start,
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
            }).then(() => {
              createList(setIngredientList, startWeek);
            });
          }
        });
      });
  });
};
