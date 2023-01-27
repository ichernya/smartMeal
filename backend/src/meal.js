
const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});
// for pulling what meal to display on what date, 
// need to recieve from frontend;
//      user
//      date (day, year, month)
//
// need to send back to frontend;
//      all meals saved on that day
const pullFood = async ( mealsid, day ) => {
    const select = 'SELECT * FROM meals WHERE mealsid = $1, AND day = $2'
    const query = {
        text: select,
        values: [ mealsid, day ]
    }
    return ret;
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