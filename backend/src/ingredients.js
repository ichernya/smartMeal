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

exports.pullIngredients = async (req, res) => {
  // const ingredients = await pullIngredientsSql();
  const recipe = await pullIng(req.query.diet);
  if (recipe) {res.status(200).json(recipe);}
  else {res.status(404).send();}
  // console.log(ingredients[0]['ingredients']);
  // console.log(ingredients[1]['ingredients']);
  // const ingredientsList = [];
  // for (const elem of ingredients) {
  //   // ingredientsList.push(elem['ingredients']);
  //   for (const food of elem['ingredients']){
  //     ingredientsList.push(food);
  //   }
  // }
  // console.log(ingredients);
  // console.log(ingredientsList);
  // if (ingredients) {res.status(200).json(ingredients[0]);}
  // else {res.status(404).send();}
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
