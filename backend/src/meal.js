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
    // ${2}::text ->> 'breakfast' OR recipeid = mealweek ->> ${2}::text ->> 'lunch' OR recipeid = mealweek ->> ${2}::text ->> 'dinner'
    //        JOIN recipes on recipeid = (mealWeek::jsonb ->> '2023-02-17'::text ->> 'dinner'::)


    //query to select a week of food and tie the recipes in that week of food given a day in the week and a userid

    //works by importing an array aggregate of recipes to join to a meal where the userid exists along with the date as a key

    //casting ids as integer is important to lookup json data otherwise errors

    const select = `
    SELECT meals.*, 
       ARRAY_AGG(DISTINCT recipes) AS recipes
    FROM meals 
    LEFT JOIN jsonb_each(meals.mealweek) AS dates(date_key, date_value) 
        ON true
    LEFT JOIN recipes 
        ON recipes.recipeid = cast(date_value ->> 'breakfast' as integer) 
        OR recipes.recipeid = cast(date_value ->> 'lunch' as integer)
        OR recipes.recipeid = cast(date_value ->> 'dinner' as integer) 
    WHERE meals.mealweek->>'id' = $1 AND meals.firstDay = $2
    GROUP BY 
        meals.mealsid, 
        meals.mealname,
        meals.public,
        meals.firstday,
        meals.mealweek;
    `
    const query = {
        text: select,
        values: [ mealsid, dayof ]
    }

    //deprecated queries of old database
    // const select_2 = `
    // SELECT * 
    // FROM recipes
    //    JOIN meals ON recipeid = breakfast OR recipeid = lunch OR recipeid = dinner
    // WHERE (dayof = $1) AND (mealsid = $2)
    // `
    // const select = `
    // SELECT * 
    // FROM recipes
    // WHERE recipeid IN 
    // (SELECT breakfast FROM meals WHERE (dayof = $1) AND (mealsid = $2))
    // UNION
    // SELECT * 
    // FROM recipes
    // WHERE recipeid IN 
    // (SELECT lunch FROM meals WHERE (dayof = $1) AND (mealsid = $2))
    // UNION
    // SELECT * 
    // FROM recipes
    // WHERE recipeid IN 
    // (SELECT dinner FROM meals WHERE (dayof = $1) AND (mealsid = $2))
    // `
    
    const {rows} = await pool.query(query);
    return rows;
}

exports.pullFoodDay = async (req, res) => {
    // function caller, awaits pullFood to return database rows
    const food = await pullFood(req.query.dayof, req.query.mealsid);
    //replace recipe into id 
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
const addFood = async ( mealWeek ) => {
    const x = JSON.stringify(mealWeek)
    //{ "id": "1", "2023-02-17": {"breaktfast": "1", "lunch": "2", "dinner": "3"}
    //var insert = 'INSERT INTO meals(mealsid, breakfast, lunch, dinner, dayof) VALUES ($1, $2, $3, $4, $5)'
    var insert = 'INSERT INTO meals(mealWeek) VALUES ($1)'
    const query = {
            text: insert,
            values: [ x ]
        }
    
    return pool.query(query);
}

exports.addFoodUser = async (req, res) => {
    // caller function that awaits addFood and returns a 201 on Success 
    const food = await addFood(req.body.mealWeek);
    if (food) {res.status(201).send(req.body);}
    else {res.status(404);}

}

const updateFood = async ( mealsid, dayof, changes) => {
    //var insert = 'UPDATE meals SET breakfast = $2, lunch = $3, dinner = $4 WHERE mealsid = $1 AND dayof = $5'
        //{ "id": "1", "2023-02-17": {"breaktfast": "1", "lunch": "2", "dinner": "3"}

    // IMPORTANT FORMAT :::    '{2023-02-20}', '{"breakfast": "2", "lunch": "2", "dinner": "4"}'
    
    
    const dayofs = '{2023-02-20}'
    const chagne = '{"breakfast": "2", "lunch": "2", "dinner": "4"}'
    
    dayofFinal = dayof.replace(/\\/g, '').replace(/"/g, '');
    changesFinal = changes.replace(/'/g, "\"")
    
    const insert = `UPDATE meals SET
                    mealweek = jsonb_set(mealweek, $2, $3)
                    WHERE mealweek ->> 'id' = $1`;
    const query = {
        text: insert,
        values: [mealsid, dayofFinal, changesFinal]
    }
    await pool.query(query);
}

exports.updateFoodUser = async (req, res) => {
    // caller function that awaits addFood and returns a 201 on Success 
    const food = await updateFood(req.body.mealsid, req.body.dayof, req.body.changes);
    res.status(201).send(food);
    //else {res.status(404).send();}
    
}
