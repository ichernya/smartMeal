const {Pool} = require('pg');

const user = "test";
    const host = "localhost";
    const database = "dev";
    const password = "pass"; 
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
const pullFood = async ( tim ) => {
    const select = 'SELECT * FROM meals WHERE tim >= $1';
    const query = {
        text: select,
        values: [ tim ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.pullFoodDay = async (req, res) => {
    const food = await pullFood();
    if (food) {res.status(200).json(food);}
    else {res.status(404).send();}
}

// for adding a meal to a specific date
// need to recieve the userid, the meal, and the date they are adding to
const addFood = async ( userid, date, dishname, recipeid) => {
    const insert = 'INSERT INTO meals(userid, date, dishname, recipeid) VALUES ($1, $2, $3, $4)'
    const query = {
        text: insert,
        values: [ userid, date, dishname, recipeid ]
    }
    await pool.query(query);
}

