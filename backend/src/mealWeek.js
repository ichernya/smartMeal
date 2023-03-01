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
    var date = new Date(dayof);
    date.setDate(date.getDate() + 7);
    news = new Date(date.toISOString().split('T')[0]);
    

    return {dayof, news}
    //{ "id": "1", "2023-02-17": {"breaktfast": "1", "lunch": "2", "dinner": "3"}
    const select_2 = `
    SELECT m.mealweek, ARRAY_AGG(R3) AS recipes
    FROM meals m
    RIGHT JOIN recipes R3 
    ON R3.recipeid = (cast(m.mealweek -> $2 -> 'breakfast' #>> '{}' as integer))
    OR
    R3.recipeid = (cast(m.mealweek -> $2 -> 'lunch' #>> '{}' as integer))
    OR
    R3.recipeid = (cast(m.mealweek -> $2 -> 'dinner' #>> '{}' as integer))
    WHERE m.mealweek ->> 'id' = $1 AND m.mealweek ? $2
    GROUP BY m.mealweek;
    `
    const query = {
        text: select_2,
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

