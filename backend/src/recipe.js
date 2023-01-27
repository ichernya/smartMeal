const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
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