const {Pool} = require('pg');
/*
const user = "test";
    const host = "localhost";
    const database = "dev";
    const password = "pass";
    const port = "5432";
    */

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

// PullFood for the enitre week for a user 
// need to recieve from frontent;
//      mealid
//      date
// need to send to frontend;
//      week of food for the date in the week provided
//      if no food, send empty list
const pullFoodFull = async ( mealsid, dayof) => {
    // calculate the Saturday and Sunday for the week given a date in the week 
    let curr = new Date(dayof); 
    let first = curr.getDate() - curr.getDay()-1; 
    let last = first + 6; 
    let start = new Date(curr.setDate(first)).toISOString().split('T')[0];
    let end = new Date(curr.setDate(last)).toISOString().split('T')[0] ;
    const select = 'SELECT * FROM meals WHERE (mealsid = $3) AND dayof::date BETWEEN $1::date AND $2::date';
    const query = {
        text: select,
        values: [ start, end, mealsid ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.pullFoodWeek = async (req, res) => {
    // caller function for pullFoodFull awaits return of rows of database
    const food = await pullFoodFull( req.query.mealsid, req.query.dayof);
    if (food) {res.status(200).json(food);}
    else {res.status(404).send();}
}

