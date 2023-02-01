const {Pool} = require('pg');

// const user = "test";
//     const host = "localhost";
//     const database = "dev";
//     const password = "pass";
//     const port = "5432";

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

// for pulling what meal to display on what date,
// need to recieve from frontend;
//      user
//      date (day, year, month)
//
// need to send back to frontend;
//      all meals saved on that day
const pullFood = async ( dayof , mealsid ) => {

    const select = 'SELECT * FROM meals WHERE (dayof = $1) AND (mealsid = $2)';
    const query = {
        text: select,
        values: [ dayof, mealsid ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.pullFoodDay = async (req, res) => {
    const food = await pullFood(req.query.dayof, req.query.mealsid);
    if (food) {res.status(200).json(food);}
    else {res.status(404).send();}
}

// for adding a meal to a specific date
// need to recieve the userid, the meal, and the date they are adding to
const addFood = async ( mealsid, recipeid, dayof) => {
    const insert = 'INSERT INTO meals(mealsid, recipeid, dayof) VALUES ($1, $2, $3)'
    const query = {
        text: insert,
        values: [ mealsid, recipeid, dayof ]
    }
    await pool.query(query);
}


exports.addFoodUser = async (req, res) => {
    await addFood(req.body.mealsid, req.body.recipeid, req.body.dayof);
    res.status(201).send(req.body);
}
