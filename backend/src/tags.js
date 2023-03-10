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


// for adding food to a userid on a specific date
// need to recieve from frontend;
//      mealid
//      recipeid
//      date
//  
// need to send back to frontend;
//      a 201 confirmation when the meal was created to the user
//      or default error when not possible

const getTags = async (mealsid) => {
    const select = 'SELECT vegan, halal, healthy, kosher FROM users WHERE username = $1'
    const query = {
            text: select,
            values: [mealsid],
        }
    const {rows} = await pool.query(query);
    return rows;
}

exports.getDiets = async (req, res) => {
    const mid = req.query.mealsid
    const diets = await getTags(mid);
    res.status(200).json(diets)
}
