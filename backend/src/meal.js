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

// for pulling what meal to display on what date,
// need to recieve from frontend;
//      user
//      date (day, mealid)
//
// need to send back to frontend;
//      all meals saved on that day for that user matching mealid
const pullFood = async ( dayof , mealsid ) => {
    // select query for when day matches and mealid matches
    const select = 'SELECT * FROM meals WHERE (dayof = $1) AND (mealsid = $2)';
    const query = {
        text: select,
        values: [ dayof, mealsid ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.pullFoodDay = async (req, res) => {
    // function caller, awaits pullFood to return database rows
    const food = await pullFood(req.query.dayof, req.query.mealsid);
    if (food) {res.status(200).json(food);}
    else {res.status(404).send();}
}

// for adding food to a userid on a specific date
// need to recieve from frontend;
//      mealid
//      recipeid
//      date
//  
// need to send back to frontend;
//      a 201 confirmation when the meal was created to the user
//      or default error when not possible
const addFood = async ( mealsid, breakfast, lunch, dinner, dayof) => {
    var insert = 'INSERT INTO meals(mealsid, breakfast, lunch, dinner, dayof) VALUES ($1, $2, $3, $4, $5)'
    const query = {
            text: insert,
            values: [ mealsid, breakfast, lunch, dinner, dayof ]
        }
    await pool.query(query);
}

exports.addFoodUser = async (req, res) => {
    // caller function that awaits addFood and returns a 201 on Success 
    const food = await addFood(req.body.mealsid, req.body.breakfast, req.body.lunch, req.body.dinner, req.body.dayof);
    res.status(201).send(req.body);
    
}

const updateFood = async ( mealsid, breakfast, lunch, dinner, dayof) => {
    var insert = 'UPDATE meals SET breakfast = $2, lunch = $3, dinner = $4 WHERE mealsid = $1 AND dayof = $5'
    const query = {
            text: insert,
            values: [ mealsid, breakfast, lunch, dinner, dayof ]
        }
    await pool.query(query);
}

exports.updateFoodUser = async (req, res) => {
    // caller function that awaits addFood and returns a 201 on Success 
    const food = await updateFood(req.body.mealsid, req.body.breakfast, req.body.lunch, req.body.dinner, req.body.dayof);
    res.status(201).send(req.body);
    
}
