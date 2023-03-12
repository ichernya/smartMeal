const {Pool} = require('pg');

const user = "postgres";
const host = "localhost";
const database = "dev";
const password = "postgres";
const port = "5432";

const pool = new Pool({
  host: host,
  port: port,
  database: database,
  user: user,
  password: password,
});

// Finds the food group the ingredients belongs to
const findIngredient = async (ingredient) => {
  const select = `
SELECT protein FROM ingredients WHERE $1=ANY(protein) UNION ALL SELECT dairy FROM ingredients WHERE $1=ANY(dairy)
UNION ALL SELECT vegetables FROM ingredients WHERE $1=ANY(vegetables)
UNION ALL SELECT spices FROM ingredients WHERE $1=ANY(spices)
UNION ALL SELECT grains FROM ingredients WHERE $1=ANY(grains)`;
  // const select = 'SELECT * FROM ingredients';
  const query = {
    text: select,
    values: [ ingredient ],
  }
  console.log(query);
  const {rows} = await pool.query(query);
  console.log(query);
  console.log(rows);
  if (rows.length !== 0) {
    return rows[0].protein[0];
  } else {
    return 'other';
  }
  // return rows[0].protein[0]; //crashes backend if it doesnt find the category
}

exports.getIngredients = async (req, res) => {
  const recipe = await findIngredient(req.query.ingredient);
  console.log(recipe);
  if (recipe) {res.status(200).json(recipe);}
  else {res.status(404).send();}
}

//need to do a get all, get the ingredients as an array, loop thru array and categorize them
//first, get an array of all the ingredients
// const getAllIngredients = async() => {
//
// }
//
// exports.formatIngredients = async (req, res) => {
//
// }


const pullIngredientsSql = async () => {
  const select = 'SELECT ingredients FROM recipes';
  const query = {
    text: select,
    values: [ ],
  }
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
}

// use pullIngredients. need to add to openapi and app.js
exports.pullIngredients = async (req, res) => {
  // const ingredients = await pullIngredientsSql();
  const recipe = await pullIng(req.query.diet);
  const list = [];
  for (const elem of recipe) {
    // console.log(elem.ingredients);
    for (const food in elem.ingredients) {
      let foodGroup = await findIngredient(food);
      list.push(foodGroup);
      // console.log(foodGroup);
      // console.log(food);
    }
  }
  console.log(list);
  if (recipe) {res.status(200).json(recipe);}
  else {res.status(404).send();}
}

const pullIng = async (diet) => {
  let select = 'SELECT * FROM recipes';
  if (diet) {
    // select += ' WHERE $1=true';
    select += ` WHERE ` + diet+ `=true`;
  }
  console.log(diet);
  const query = {
    text: select,
    values: [ ],
  }
  console.log(select);

  const {rows} = await pool.query(query);
  // console.log(rows.ingredients);
  // for (const elem of rows) {
  //   console.log(elem.ingredients);
  // }
  return rows;
}

// exports.pullIngredients() = async (req, res) => {
//   // caller function that awaits pullAllRecipe return full week or 404
//   const recipe = await pullIng();
//   if (recipe) {res.status(200).json(recipe);}
//   else {res.status(404).send();}
// }

// const pullAllRecipe = async () => {
//   const select = 'SELECT * FROM recipes';
//   const query = {
//     text: select,
//     values: [ ]
//   }
//   const {rows} = await pool.query(query);
//   return rows;
// }
//
// exports.getAll = async (req, res) => {
//   // caller function that awaits pullAllRecipe return full week or 404
//   const recipe = await pullAllRecipe();
//   if (recipe) {res.status(200).json(recipe);}
//   else {res.status(404).send();}
// }
const createGroceryList = async (mealsid, firstDay, ingredientList) => {
  const insert = `INSERT INTO checklistUser(firstDay, mealsid, checklist) VALUES ($1, $2, $3)`
  const query = {
    text: insert,
    values: [firstDay, mealsid, ingredientList]
  }
  await pool.query(query);
  return ingredientList;
};

const checkGroceryList = async (mealsid, firstDay) => {
  const select = `SELECT checklist FROM checklistUser WHERE mealsid = $1 AND firstDay = $2`
  const query = {
    text: select,
    values: [mealsid, firstDay]
  }
  const {rows} = await pool.query(query);
  return rows;
}


const pullGroceryListFull = async (mealsid, firstDay) => {
  const select = `
    SELECT meals.*, 
       JSON_AGG(DISTINCT recipes) AS recipes
    FROM meals 
    LEFT JOIN jsonb_each(meals.mealweek) AS dates(date_key, date_value) 
        ON true
    LEFT JOIN recipes 
        ON recipes.recipeid = cast(date_value ->> 'breakfast' as integer) 
        OR recipes.recipeid = cast(date_value ->> 'lunch' as integer)
        OR recipes.recipeid = cast(date_value ->> 'dinner' as integer) 
    WHERE meals.mealweek->>'id' = $1 AND meals.firstDay = $2 AND meals.mealsid = $1::int
    GROUP BY 
        meals.mealsid, 
        meals.mealname,
        meals.public,
        meals.firstday,
        meals.mealweek;
    `
    const query = {
      text: select,
      values: [ mealsid, firstDay ]
  }
  
  const {rows} = await pool.query(query);
  return rows;
}


exports.pullGroceryList = async (req, res) => {
  var food = await pullGroceryListFull(req.query.mealsid, req.query.firstDay);
  if (!food[0].recipes) {res.status(404).json(food[0])}
  const ingredientCategories = {
    'Protein': ['Beef', 'Chicken', 'Fish', 'Pork', 'Tofu'],
    'Grains': ['Pasta', 'Bread', 'Rice'],
    'Dairy': ['Milk', 'Cheese', 'Butter', 'Yogurt'],
    'Vegetables': ['Lettuce', 'Tomato', 'Onion', 'Pepper', 'Baby Bella Mushrooms'],
    'Fruit': ['Apple', 'Banana', 'Orange', 'Berries'],
    'Nuts and Seeds': ['Almonds', 'Walnuts', 'Sesame seeds', 'Flax seeds'],
    'Oils': ['Olive oil', 'Canola oil', 'Coconut oil', 'Sesame oil']
  };
  
  const ingredientList = {};
  // Iterate through each ingredient in the recipe
  //console.log(food[0].recipes)
  for (const recipe of food[0].recipes) {
    if (recipe != null) {
      Object.entries(recipe.ingredients).forEach(([ingredientName, ingredientData]) => {
        // Check which category the ingredient belongs to
        let category = '';
        for (const [categoryName, categoryIngredients] of Object.entries(ingredientCategories)) {
          if (categoryIngredients.includes(ingredientName)) {
            category = categoryName;
            break;
          }
        }
        // If no category found, add the ingredient to the Other category
        if (category === '') {
          category = 'Other';
        }
      
        // If the category doesn't exist in the ingredient list, create it
        if (!ingredientList[category]) {
          ingredientList[category] = {
            amount: 0,
            amountChecked: 0,
            hidden: false,
            ingredients: {}
          };
        }
      
        // Add the ingredient to the category in the ingredient list
        ingredientList[category].ingredients[ingredientName] = {
          checked: false,
          amount: ingredientData.amount,
          unit: ingredientData.unit
        };
        ingredientList[category].amount += 1;
      });
  }
  }
  grocerylistInitial = await checkGroceryList(req.query.mealsid, req.query.firstDay);
  if (!grocerylistInitial[0]) {
    grocerylist = await createGroceryList(req.query.mealsid, req.query.firstDay, ingredientList);
    res.status(201).json(grocerylist)
  }
  else {
    // we have to compare grocerylistinitial to grocerylist
    res.status(200).json(grocerylistInitial)
  }
  
}