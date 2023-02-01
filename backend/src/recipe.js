const {Pool} = require('pg');

const user = "postgres";
    const host = "localhost";
    const database = "dev";
    const password = "postgres"; 
    const port = "5432";

const pool = new Pool({
    host: 'localhost',
    port: port,
    database: database,
    user: user,
    password: password,
});

// for pulling the recipe to display dishname and ingredients 
const pullAllRecipe = async () => {
    const select = 'SELECT * FROM recipes';
    const query = {
        text: select,
        values: [ ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.getAll = async (req, res) => {
    const recipe = await pullAllRecipe();
    if (recipe) {res.status(200).json(recipe);}
    else {res.status(404).send();}
}

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
    const recipe = await pullOneRecipe(req.query.recipeid);
    if (recipe) {res.status(200).json(recipe);}
    else {res.status(404).send();}
}
