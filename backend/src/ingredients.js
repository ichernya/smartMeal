const groceryList = require('./groceryList');
const {Pool} = require('pg');
const {ingredientCategories} = require('./categorical')
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
// No longer Used
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
  const {rows} = await pool.query(query);
  if (rows.length !== 0) {
    return rows[0].protein[0];
  } else {
    return 'other';
  }
  // return rows[0].protein[0]; //crashes backend if it doesnt find the category
}
// No longer Used
exports.getIngredients = async (req, res) => {
  const recipe = await findIngredient(req.query.ingredient);
  if (recipe) {res.status(200).json(recipe);}
  else {res.status(404).send();}
}

// No longer Used
const pullIngredientsSql = async () => {
  const select = 'SELECT ingredients FROM recipes';
  const query = {
    text: select,
    values: [ ],
  }
  const {rows} = await pool.query(query);
  return rows;
}

// use pullIngredients. need to add to openapi and app.js
// no longer used
exports.pullIngredients = async (req, res) => {
  // const ingredients = await pullIngredientsSql();
  const recipe = await pullIng(req.query.diet);
  const list = [];
  for (const elem of recipe) {
    for (const food in elem.ingredients) {
      let foodGroup = await findIngredient(food);
      list.push(foodGroup);
    }
  }
  if (recipe) {res.status(200).json(recipe);}
  else {res.status(404).send();}
}

// no longer used
const pullIng = async (diet) => {
  let select = 'SELECT * FROM recipes';
  if (diet) {
    // select += ' WHERE $1=true';
    select += ` WHERE ` + diet+ `=true`;
  }
  const query = {
    text: select,
    values: [ ],
  }
  const {rows} = await pool.query(query);
  return rows;
}

// Delete grocery list,
//
// to be called when a a new grocerylist should be generated, delete old and return for comparison
//
const deleteGrocerylist = async (mealsid, firstDay) => {
  // query
  const deletes = `DELETE FROM checklistUser WHERE mealsid = $2 AND firstDay = $1 RETURNING checklist`
  const query = {
    text: deletes,
    values: [firstDay, mealsid]
  }
  const {rows} = await pool.query(query);
  return rows
}

//Update checklist to be true when checked
const updatePutQuery = async (firstDay, mealsid, category, ingredient) => {
  //query one
  //sets the jsonb at category->ingredients->ingredient->checked to be true
  const update = `
  UPDATE checklistUser
  SET checklist = jsonb_set(checklist, $3, 'true', true)
  WHERE mealsid = $2 AND firstDay = $1;`
  const query = {
      text: update,
      values: [firstDay, mealsid, `{${category},"ingredients","${ingredient}","checked"}`]
  }
  await pool.query(query);

  // category mapping to value wouldnt work in values, so query design had to change
  // weird conversions because integer cant cast to jsonb, but integer can to text then to jsonb
  // increments the amount checked at category->amountChecked by one
  const result = await pool.query(
    `UPDATE checklistUser
     SET checklist = jsonb_set(checklist, '{${category},amountChecked}', ((checklist->'${category}'->>'amountChecked')::integer + 1)::text::jsonb)      
     WHERE mealsid = $2 AND firstDay = $1
     RETURNING checklist`,
    [firstDay, mealsid]
  );

  const updatedList = result.rows[0].checklist;
  // return the updated list
  return updatedList;
  
}
//inverse of the updateQuery, decrements and sets a true to false
//to be called when a box is unchecked
const downdatePutQuery = async (firstDay, mealsid, category, ingredient) => {
  const update = `
  UPDATE checklistUser
  SET checklist = jsonb_set(checklist, $3, 'false', false)
  WHERE mealsid = $2 AND firstDay = $1;`
  const query = {
      text: update,
      values: [firstDay, mealsid, `{${category},"ingredients","${ingredient}","checked"}`]
  }
  await pool.query(query);

  // category mapping to value wouldnt work in values, so query design had to change
  // weird conversions because integer cant cast to jsonb, but integer can to text then to jsonb
  const result = await pool.query(
    `UPDATE checklistUser
     SET checklist = jsonb_set(checklist, '{${category},amountChecked}', ((checklist->'${category}'->>'amountChecked')::integer - 1)::text::jsonb)      
     WHERE mealsid = $2 AND firstDay = $1
     RETURNING checklist`,
    [firstDay, mealsid]
  );

  const updatedList = result.rows[0].checklist;
  return updatedList;
  
}

//calledfunction for upvote vs downvote, as box can never be checked twice or unchecked twice
//we know that whatever value is sent is the right one
exports.updateAsChecked = async (req, res) => {
  if (req.body.check) {var update = await updatePutQuery(req.body.firstDay, req.body.mealsid, req.body.category, req.body.ingredient);}
  else {var update = await downdatePutQuery(req.body.firstDay, req.body.mealsid, req.body.category, req.body.ingredient);}
  res.status(201).json(update)
}
// creates a grocerylist, given a generated list made from meal plans and passed as a parameter
const createGroceryList = async (mealsid, firstDay, ingredientList) => {
  const insert = `INSERT INTO checklistUser(firstDay, mealsid, checklist) VALUES ($1, $2, $3) RETURNING firstday, mealsid, checklist`
  const query = {
    text: insert,
    values: [firstDay, mealsid, ingredientList]
  }
  const {rows} = await pool.query(query);
  //returns the created grocerylist for display
  return rows;

};

// check the grocerylist, pulls a grocery list for comparison
const checkGroceryList = async (mealsid, firstDay) => {
  const select = `SELECT checklist FROM checklistUser WHERE mealsid = $1 AND firstDay = $2`
  const query = {
    text: select,
    values: [mealsid, firstDay]
  }
  const {rows} = await pool.query(query);
  return rows;
}

// returns the full mealplan, to create a grocerylist
const pullGroceryListFull = async (mealsid, firstDay) => {
  // Select query that returns a week of meals tied to the recipes that are used 
  // JSON_AGG found online helps return recipies as a whole json
  // JSONB_EACH allows to split meals as date, object
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

// Generates a full correct grocerylist that keeps track of users bought groceries
exports.pullGroceryList = async (req, res) => {
  //recieves the current users mealplan for the week
  //if doesnt exists, 404 as grocerylist cant be generated
  var food = await pullGroceryListFull(req.query.mealsid, req.query.firstDay);
  if (!food[0]) {res.status(404).json(food[0])}
  else {
    // ingredient categories, 
    // allows us to display the checklist grouped by categories
    if (food[0]) {
      //if food exists,
      for (let date in food[0].mealweek) {
          // if id we dont care
          if (date === 'id') {
              continue;
          }
          // itterate through the dates, to recieve the meal object for the day
          for (let meal in food[0].mealweek[date]) {
              let recipeId = parseInt(food[0].mealweek[date][meal]);
              if (recipeId) {
                  // Find the recipe in recipes with matching recipeid
                  // stackoverflow find function
                  let recipe = food[0]["recipes"].find(recipe => recipe && recipe.recipeid === recipeId);
                  // Replace the recipe id in mealPlan with the recipe object
                  food[0].mealweek[date][meal] = recipe;
              }
          }
      }
    }
    const ingredientList = {};
    // Iterate through each ingredient in the recipe
    // need to re iterate through DAYS not RECIPES store data for multiple days recipe
    // assuming the object is stored in a variable called "meal"

    // iterate through each date in the "mealweek" object
    for (let date in food[0].mealweek) {
        if (!food[0].mealweek.hasOwnProperty(date)) {
          // skip over non-date properties of "mealweek" (such as "id")
        continue;
      } 
      for (let mealtime in food[0].mealweek[date]) {
        // iterate through each meal (breakfast, lunch, dinner) for this date
        // skip over non-mealtime properties of this date (such as "id")
        if (typeof(food[0].mealweek[date]) == "string") {
          continue;
        } 
        for (let ingredient in food[0].mealweek[date][mealtime].ingredients) {
          // print out the unit and amount of this ingredient
          // iterate through each ingredient of this meal
          const amountOf = food[0].mealweek[date][mealtime].ingredients[ingredient].amount;
          const unit = food[0].mealweek[date][mealtime].ingredients[ingredient].unit;
          // for every single ingredient, iterate throughtout categories, until category is found
          let category = '';
          for (const [categoryName, categoryIngredients] of Object.entries(ingredientCategories)) {
            if (categoryIngredients.includes(ingredient)) {
                          category = categoryName;
            } if (category === '') {
              // If no category found, add the ingredient to the Other category
              category = 'Other';
            } 
          }
            console.log(category, ingredient)
            if (!ingredientList[category]) {
              // If the category doesn't exist in the ingredient list, create it
              ingredientList[category] = {
                amount: 0,
                amountChecked: 0,
                hidden: false,
                ingredients: {}

              };
            }
            // else means the category does exists, so we need to:
            // add the ingredient to the category 
              if (ingredientList[category].ingredients[ingredient]) {
                // if the ingredient already exists, we must increment amount
                const amount = ingredientList[category].ingredients[ingredient].amount;
                ingredientList[category].ingredients[ingredient] = {
                  checked: false,
                  amount: (+amountOf + +amount).toString(),
                  unit: unit
                };

            
            } else {
              ingredientList[category].ingredients[ingredient] = {
                checked: false,
                amount: amountOf,
                unit: unit
              };
              ingredientList[category].amount += 1;
              }
        }
      }
  }
    // pull the current grocerylist that is generated (old grocery list as new one is already generated)
    const grocerylistInitial = await checkGroceryList(req.query.mealsid, req.query.firstDay);
    // if the old grocery list doesnt exist, that means it never existed in the first place
    if (!grocerylistInitial[0]) {
      // generate a new grocery list using the generated one from the users current meal plan 
      const grocerylist = await createGroceryList(req.query.mealsid, req.query.firstDay, ingredientList);
      // send a 201 created and the current grocer list
      res.status(201).json(grocerylist)
    }
    else {
      // this means that the grocery list DOES exist, so we have to DELETE it, and compare the newly generated one
      // to the OLD one, to see the difference in ingredient amount
      // if an ingredient stays the same, but the amount increases, that means it should now be unchecked in the new grocerylist
      const oldlist = await deleteGrocerylist(req.query.mealsid, req.query.firstDay);
      const newlist = await createGroceryList(req.query.mealsid, req.query.firstDay, ingredientList);
      for (const category in newlist[0].checklist) {
        if (oldlist[0].checklist[category]) {
          for (const ingredient in oldlist[0].checklist[category].ingredients) {
            if (newlist[0].checklist[category].ingredients[ingredient]) {
              const oldAmount = oldlist[0].checklist[category].ingredients[ingredient].amount;
              const newAmount = newlist[0].checklist[category].ingredients[ingredient].amount;
              const oldChecked = oldlist[0].checklist[category].ingredients[ingredient].checked;
              //const newChecked = newlist[0].checklist[category].ingredients[ingredient].checked;
              // iterate newlist
              // make sure that the category exists
              // check if the amount is greater, then downtick
              // if true and AMOUNT is less than > then set to true
              if (oldChecked && oldAmount >= newAmount) {
                await updatePutQuery(req.query.firstDay, req.query.mealsid, category, ingredient);
              }
              // if (newAmount > oldAmount) {
              //   // if the new amount is greater than the old amount then we should
              //   // call the funcion that sets that ingredient to false
              //   await downdatePutQuery(req.query.firstDay, req.query.mealsid, category, oldlist[0].checklist[category].ingredients[ingredient]);
              // }
            }
          }
        }
      }
      const grocerylistFinal = await checkGroceryList(req.query.mealsid, req.query.firstDay);
      res.status(200).json(grocerylistFinal);

      }
    }
  
  }
