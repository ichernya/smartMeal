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

const userQueryPublicMealPlan = async (public, mealName) => {
    // unnest used to unwrap array in the database
    const select = `SELECT meals.*, ARRAY_AGG(DISTINCT recipes) AS recipes
                    FROM meals 
                    LEFT JOIN jsonb_each(meals.mealweek) AS dates(date_key, date_value) 
                    ON true
                    LEFT JOIN recipes 
                    ON recipes.recipeid = cast(date_value ->> 'breakfast' as integer) 
                    OR recipes.recipeid = cast(date_value ->> 'lunch' as integer)
                    OR recipes.recipeid = cast(date_value ->> 'dinner' as integer) 
                    WHERE LOWER(mealName) LIKE LOWER($1)
                    GROUP BY 
                    meals.mealsid, 
                    meals.mealname,
                    meals.public,
                    meals.firstday,
                    meals.mealweek;
                    `
                    
                
    const query = {
        text: select,
        values: [ '%' + mealName + '%' ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.pullpublicMeal = async (req, res) => {
    // caller function for pullFoodFull awaits return of rows of database
    const mealPlans = await userQueryPublicMealPlan( req.query.public, req.query.mealName);
    if (mealPlans) {res.status(200).json(mealPlans);}
    else {res.status(404).send();}
}

// public meal plan :: check if public is true, check query by the name of the mealplan


