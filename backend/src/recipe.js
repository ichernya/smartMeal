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

// for pulling the recipe to display dishname and ingredients
// send back entire week of food
const pullAllRecipe = async (mealsid) => {
    const tags = 'SELECT vegan, halal, healthy, kosher FROM users WHERE userid = $1';
    let query = {
        text: tags,
        values: [mealsid]
    }
    let {rows} = await pool.query(query);

    let allFalse = true;

    // If allFalse, return all recipes
    for (const tag of Object.values(rows[0])) {
        if (tag) {
            allFalse = false;
        }
    }

    let select = 'SELECT * FROM recipes';

    // Determines whether to add an "AND"
    let count = 0;
    if (!allFalse) {
        // If allFalse, return all recipes
        select += ' WHERE ';
        for (const [tag, bool] of Object.entries(rows[0])) {
            if (count > 0 && bool) {
              select += ' AND '
            }
            if (bool) {
                select += `${tag} = true`
                count += 1
            }
        }
    }

    query = {
        text: select,
        values: []
    }
    rows = await pool.query(query);
    return rows['rows'];
}

exports.getAll = async (req, res) => {
    // caller function that awaits pullAllRecipe return full week or 404
    const mealsid = req.query.mealsid
    const recipe = await pullAllRecipe(mealsid);
    if (recipe) {res.status(200).json(recipe);}
    else {res.status(404).send();}
}

// function to return one recipe
// from frontend recieve: recipeid
// send back to frontend recipe
const pullOneRecipe = async ( recipeid ) => {
    const select = 'SELECT * FROM recipes WHERE recipeid = $1';
    const query = {
        text: select,
        values: [ recipeid ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.getOne = async (req, res) => {
    // caller function for pullOneRecipe awaits and returns recipe of 404
    const recipe = await pullOneRecipe(req.query.recipeid);
    if (recipe) {res.status(200).json(recipe);}
    else {res.status(404).send();}
}


const postOneRecipe = async(newRecipe) => {
    const insert = 'INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, halal, healthy, kosher) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING recipeid';
    const query = {
        text: insert,
        values: [newRecipe.dishname, newRecipe.ingredients, newRecipe.ingredientAm, newRecipe.imageData, newRecipe.vegan, newRecipe.halal, newRecipe.healthy, newRecipe.kosher],
    };
    console.log(insert);
    const id = await pool.query(query);
    console.log(id.rows[0].recipeid);
    const recipeid = parseInt(id.rows[0].recipeid);
    return recipeid;
}

exports.postRecipe = async (req, res) => {
    const newRecipe = {};
    //add the stuff here
    //dishname
    newRecipe.dishname = req.body.dishname;

    //create dictionary
    let ingredientsList = {};
    for (const elem of req.body.ingredients) {
        // console.log(elem[0], elem[1], elem[2]);
        ingredientsList[elem[0]] = {'quantity': elem[1], 'unit': elem[2]};
        // console.log(ingredientsList);
    };
    console.log('finished ingredientsList');
    console.log(ingredientsList);


    // newRecipe.ingredients = req.body.ingredients;
    newRecipe.ingredients = ingredientsList;
    //idea -> newRecipe.ingredients = new dictionary created from req.body.ingredients
    // console.log(req.body.ingredients);

    //ingredients jsonb
    //ingredientAm
    newRecipe.ingredientAm = req.body.ingredients.length;
    //imageData
    newRecipe.imageData = req.body.imageData;
    //halal
    newRecipe.vegan = req.body.vegan;
    newRecipe.halal = req.body.halal;
    newRecipe.healthy = req.body.healthy;
    newRecipe.kosher = req.body.kosher;
    const id = await postOneRecipe(newRecipe);
    newRecipe.recipeid = id;
    console.log(id, newRecipe.recipeid);
    res.status(201).json(newRecipe.recipeid);
}
