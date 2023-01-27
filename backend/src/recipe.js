const {Pool} = require('pg');

const user = "postgres";
    const host = "test";
    const database = "dev";
    const password = "pass"; 
    const port = "5432";

const pool = new Pool({
    host: 'localhost',
    port: port,
    database: database,
    user: host,
    password: password,
});

// for pulling the recipe to display dishname and ingredients 
const pullAllRecipe = async () => {
    const select = 'SELECT * FROM recipes'
    const query = {
        text: select,
        values: [ ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.getAll = async (req, res) => {
    const channels = await pullAllRecipe();
    if (channels) {res.status(200).json(channels);}
    else {res.status(404).send();}
}

// for pulling the ingredients from a single recipe 
//const pullIngredients = async () => {

//}