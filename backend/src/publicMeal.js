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


// required  public or private
//optional search
// return everything public or private
const userQueryPublicMealPlan = async (pub, mealName) => {
    // unnest used to unwrap array in the database
    const select = `SELECT meals.*, JSON_AGG(DISTINCT recipes) AS recipes
                    FROM meals 
                    LEFT JOIN jsonb_each(meals.mealweek) AS dates(date_key, date_value) 
                    ON true
                    LEFT JOIN recipes 
                    ON recipes.recipeid = cast(date_value ->> 'breakfast' as integer) 
                    OR recipes.recipeid = cast(date_value ->> 'lunch' as integer)
                    OR recipes.recipeid = cast(date_value ->> 'dinner' as integer) 
                    WHERE LOWER(mealName) LIKE LOWER($1) and (public = $2::boolean)
                    GROUP BY 
                    meals.mealsid, 
                    meals.mealname,
                    meals.public,
                    meals.firstday,
                    meals.mealweek;
                    `
                    
                
    const query = {
        text: select,
        values: [ '%' + mealName + '%', pub]
    }
    const {rows} = await pool.query(query);
    return rows;
}

const userNoQueryPublicMealPlan = async (pub) => {
    // unnest used to unwrap array in the database
    const select = `SELECT meals.*, JSON_AGG(DISTINCT recipes) AS recipes
                    FROM meals 
                    LEFT JOIN jsonb_each(meals.mealweek) AS dates(date_key, date_value) 
                    ON true
                    LEFT JOIN recipes 
                    ON recipes.recipeid = cast(date_value ->> 'breakfast' as integer) 
                    OR recipes.recipeid = cast(date_value ->> 'lunch' as integer)
                    OR recipes.recipeid = cast(date_value ->> 'dinner' as integer) 
                    WHERE public = $1::boolean
                    GROUP BY 
                    meals.mealsid, 
                    meals.mealname,
                    meals.public,
                    meals.firstday,
                    meals.mealweek;
                    `
                    
                
    const query = {
        text: select,
        values: [pub]
    }
    const {rows} = await pool.query(query);
    return rows;
}


const userQueryPrivateMealPlan = async (mealName, mealsid) => {
    // unnest used to unwrap array in the database
    const select = `SELECT meals.*, JSON_AGG(DISTINCT recipes) AS recipes
                    FROM meals 
                    LEFT JOIN jsonb_each(meals.mealweek) AS dates(date_key, date_value) 
                    ON true
                    LEFT JOIN recipes 
                    ON recipes.recipeid = cast(date_value ->> 'breakfast' as integer) 
                    OR recipes.recipeid = cast(date_value ->> 'lunch' as integer)
                    OR recipes.recipeid = cast(date_value ->> 'dinner' as integer) 
                    WHERE (meals.mealweek->>'id') = $1 AND (LOWER(mealName) LIKE LOWER($2))
                    GROUP BY 
                    meals.mealsid, 
                    meals.mealname,
                    meals.public,
                    meals.firstday,
                    meals.mealweek;
                    `
                    
                
    const query = {
        text: select,
        values: [mealsid, '%' + mealName + '%']
    }
    const {rows} = await pool.query(query);
    return rows;
}

const userNoQueryPrivateMealPlan = async ( mealsid ) => {
    // unnest used to unwrap array in the database
    console.log('entered')
    
    const select = `SELECT meals.*, JSON_AGG(DISTINCT recipes) AS recipes
                    FROM meals 
                    LEFT JOIN jsonb_each(meals.mealweek) AS dates(date_key, date_value) 
                    ON true
                    LEFT JOIN recipes 
                    ON recipes.recipeid = cast(date_value ->> 'breakfast' as integer) 
                    OR recipes.recipeid = cast(date_value ->> 'lunch' as integer)
                    OR recipes.recipeid = cast(date_value ->> 'dinner' as integer)
                    WHERE meals.mealweek->>'id' = $1
                    GROUP BY 
                    meals.mealsid, 
                    meals.mealname,
                    meals.public,
                    meals.firstday,
                    meals.mealweek;
                    `
                    
                
    const query = {
        text: select,
        values: [ mealsid ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.pullpublicMeal = async (req, res) => {
    // caller function for pullFoodFull awaits return of rows of database
    pub = req.query.public
    meal = req.query.mealName
    
    console.log(pub, meal)
    if ((pub) && (!(meal == null))) {        // if the public is true, and query exists, query public meals by the query
        var mealPlans = await userQueryPublicMealPlan( pub, meal );
        
    }
    else if ((pub) && (meal == null)) {    // if the public is true, and query is empty, return all public meal plans
        var mealPlans = await userNoQueryPublicMealPlan( pub );
        
    }
    else if (!(pub) && !(meal == null)) {   // if the public is false, and query exists, return all users meal plans by query
        var mealPlans = await userQueryPrivateMealPlan( meal, req.query.mealsid );
        
    }
    else {                                           //public mst be false, and no query return all of users meal plans
        var mealPlans = await userNoQueryPrivateMealPlan( req.query.mealsid );
        
    }
    
    //parse the data, replacing the numbers inside the week to be the recipe that matches that number 
    if (mealPlans[0]) {
        
        for (let date in mealPlans[0].mealweek) {
            // if id we dont care
            if (date == 'id') {
                continue;
            }
            for (let meal in mealPlans[0].mealweek[date]) {
                let recipeId = parseInt(mealPlans[0].mealweek[date][meal]);
                if (recipeId) {
                    // Find the recipe in recipes with matching recipeid
                    let recipe = mealPlans[0]["recipes"].find(recipe => recipe && recipe.recipeid == recipeId);
                    // Replace the recipe id in mealPlan with the recipe object
                    mealPlans[0].mealweek[date][meal] = recipe;
                }
            }
        
        }
        res.status(200).json(mealPlans)
        
    }
    else {
        res.status(404).send();
    }
}

// public meal plan :: check if public is true, check query by the name of the mealplan


