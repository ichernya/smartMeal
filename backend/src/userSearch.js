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

const userQuery = async (userInput) => {
    
    const select = `SELECT * FROM recipes WHERE LOWER(dishname)LIKE LOWER($1) 
                    UNION 
                    SELECT * FROM recipes WHERE EXISTS 
                    (SELECT FROM unnest(ingredients) elem WHERE LOWER(elem) LIKE LOWER($1))`
    const query = {
        text: select,
        values: [ '%' + userInput + '%' ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.getUserQuery = async (req, res) => {
    const user = await userQuery(req.query.userInput);
    if (user) {res.status(200).json(user);}
    else {res.status(404).send();}
}
