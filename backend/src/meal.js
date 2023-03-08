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
const pullFood = async ( dayof , mealsid, firstDay ) => {
    // select query for when day matches and mealid matches
    // ${2}::text ->> 'breakfast' OR recipeid = mealweek ->> ${2}::text ->> 'lunch' OR recipeid = mealweek ->> ${2}::text ->> 'dinner'
    //        JOIN recipes on recipeid = (mealWeek::jsonb ->> '2023-02-17'::text ->> 'dinner'::)


    //query to select a week of food and tie the recipes in that week of food given a day in the week and a userid

    //works by importing an array aggregate of recipes to join to a meal where the userid exists along with the date as a key

    //casting ids as integer is important to lookup json data otherwise errors

    const select = `
    SELECT meals.*, 
       JSON_AGG(DISTINCT recipes) AS recipes
    FROM meals 
    LEFT JOIN jsonb_each(meals.mealweek) AS dates(date_key, date_value) 
        ON true
    LEFT JOIN recipes 
        ON recipes.recipeid = cast(date_value ->> 'breakfast' as integer) 
        OR recipes.recipeid = cast(date_value ->> 'lunch' as integer)
        OR recipes.recipeid = cast(date_value ->> 'dinner' as integer) 
    WHERE meals.mealweek->>'id' = $1 AND meals.firstDay = $2 AND meals.mealsid = $1::int
    GROUP BY 
        meals.mealsid, 
        meals.mealname,
        meals.public,
        meals.firstday,
        meals.mealweek;
    `
    const query = {
        text: select,
        values: [ mealsid, firstDay ]
    }
    
    const {rows} = await pool.query(query);
    return rows;
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

const addFood = async ( firstDay, mealsid) => {
    //{ "id": "1", "2023-02-17": {"breaktfast": "1", "lunch": "2", "dinner": "3"}
    //var insert = 'INSERT INTO meals(mealsid, breakfast, lunch, dinner, dayof) VALUES ($1, $2, $3, $4, $5)'

    const mealWeek = `{ "id": "${mealsid}"}`
    const pub = 't'
    const mealName = 'New Meal'
    var insert = `INSERT INTO meals(firstDay, mealName, public, mealWeek, mealsid) VALUES ($1, $2, $3, $4, $5)`
    const query = {
            text: insert,
            values: [ firstDay, mealName, pub, mealWeek, mealsid ]
        }
    await pool.query(query);
}
exports.addFoodUser = async (req, res) => {
    first = req.query.firstDay
    mid = req.query.mealsid
    await addFood(first, mid);
    res.status(201)
}
exports.pullFoodDay = async (req, res) => {
    // function caller, awaits pullFood to return database rows
    first = req.query.firstDay
    mid = req.query.mealsid
    const food = await pullFood(req.query.dayof, mid, first);
    //replace recipe into id 
    if (food[0]) {
        
        for (let date in food[0].mealweek) {
            // if id we dont care
            if (date == 'id') {
                continue;
            }
            for (let meal in food[0].mealweek[date]) {
                let recipeId = parseInt(food[0].mealweek[date][meal]);
                if (recipeId) {
                    // Find the recipe in recipes with matching recipeid
                    let recipe = food[0]["recipes"].find(recipe => recipe && recipe.recipeid == recipeId);
                    // Replace the recipe id in mealPlan with the recipe object
                    food[0].mealweek[date][meal] = recipe;
                }
            }
        
        }
        res.status(200).json(food)
        
    }
    // otherwise meal for this week does not exist so create 
    else {
        await addFood(first, mid);
        res.status(201).send()
        
    }
}



const updateFood = async ( mealsid, dayof, changes, firstDay) => {
    //var insert = 'UPDATE meals SET breakfast = $2, lunch = $3, dinner = $4 WHERE mealsid = $1 AND dayof = $5'
        //{ "id": "1", "2023-02-17": {"breaktfast": "1", "lunch": "2", "dinner": "3"}

    // IMPORTANT FORMAT :::    '{2023-02-20}', '{"breakfast": "2", "lunch": "2", "dinner": "4"}'
    
    
    // const dayofs = '{2023-02-20}'
    //const chagne = '{"breakfast": "2", "lunch": "2", "dinner": "4"}'
    //  "dayof": "{2023-02-24}",
    //  "changes": "{'breakfast': '2', 'lunch': '2', 'dinner': '4'}"
    dayofFinal = dayof.replace(/\\/g, '').replace(/"/g, '');
    changesFinal = changes.replace(/'/g, "\"")
    
    const insert = `UPDATE meals SET
                    mealweek = jsonb_set(mealweek, $2, $3, true)
                    WHERE mealweek ->> 'id' = $1 AND firstDay = $4`;
    const query = {
        text: insert,
        values: [mealsid, dayofFinal, changesFinal, firstDay]
    }
    await pool.query(query);
    return {dayofFinal, changesFinal}
}

exports.updateFoodUser = async (req, res) => {
    // caller function that awaits addFood and returns a 201 on Success 
    await updateFood(req.body.mealsid, req.body.dayof, req.body.changes, req.body.firstDay);
    res.status(200).send();

    //else {res.status(404).send();}
    
}

// function to change the name from a mealplan for a given week, checks mealsid, changes the name, returns nothing 
const changeMealName = async (firstDay, mealsid, mealName) => {


    const insert = `UPDATE meals SET
    mealName = $3
    WHERE mealweek ->> 'id' = $2 AND firstDay = $1`;
    const query = {
        text: insert,
        values: [firstDay, mealsid, mealName]
    }
    await pool.query(query);
    
}

exports.updateMealName = async (req, res) => {
    // caller function that awaits changemealname and returns a 201 on Success 
    await changeMealName(req.body.firstDay, req.body.mealsid, req.body.mealName);
    res.status(200).send();
    
}