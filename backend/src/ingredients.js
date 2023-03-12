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
  const select = `SELECT protein FROM ingredients WHERE $1=ANY(protein) UNION ALL SELECT dairy FROM ingredients WHERE $1=ANY(dairy)
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
