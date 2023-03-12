const { hasSelectionSupport } = require('@testing-library/user-event/dist/utils');
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

// function to match either dishname or ingredient to userinput
// need to recieve from frontend:
//      userInput
// need to return to frontend
//      return every hit on either ingredients or on dishname

//    {"Chicken Breast":{"amount": "4","unit":"skinless chicken breast halves"}
const userQuery = async (userInput, userid) => {
    // unnest used to unwrap array in the database

    const selecttest = `
    
    SELECT * FROM recipes 
    WHERE 
    ((vegan = false OR vegan = (SELECT vegan FROM users WHERE userid = $1))
    AND 
    (halal = false OR halal = (SELECT halal FROM users WHERE userid = $1))
    AND 
    (healthy = false OR healthy = (SELECT healthy FROM users WHERE userid = $1))
    AND 
    (kosher = false OR kosher = (SELECT kosher FROM users WHERE userid = $1)))
    
        `
    const select = `SELECT * FROM recipes
                        WHERE 
                            LOWER(dishname) LIKE LOWER($1) AND (
                            (vegan = false OR vegan = (SELECT vegan FROM users WHERE userid = $2))
                            AND 
                            (halal = false OR halal = (SELECT halal FROM users WHERE userid = $2))
                            AND 
                            (healthy = false OR healthy = (SELECT healthy FROM users WHERE userid = $2))
                            AND 
                            (kosher = false OR kosher = (SELECT kosher FROM users WHERE userid = $2)))
                            
                UNION 
                    SELECT * FROM recipes WHERE
                    (vegan = false OR vegan = (SELECT vegan FROM users WHERE userid = $2))
                            AND 
                            (halal = false OR halal = (SELECT halal FROM users WHERE userid = $2))
                            AND 
                            (healthy = false OR healthy = (SELECT healthy FROM users WHERE userid = $2))
                            AND 
                            (kosher = false OR kosher = (SELECT kosher FROM users WHERE userid = $2)) AND EXISTS 
                        (SELECT FROM jsonb_each(recipes.ingredients) AS food(food_key, food_value)  
                            WHERE LOWER(food_key) LIKE LOWER($1))
                `
                
    const query = {
        text: select,
        values: [ '%' + userInput + '%' , userid]
    }
    const query2 = {
        text: selecttest,
        values: [ userid]
    }
    const {rows} = await pool.query(query);
    return rows;
}


exports.getUserQuery = async (req, res) => {
    // caller function that awaits and returns entire recipe for hit, send 404 on error
    const user = await userQuery(req.query.userInput, req.query.userid);
    if (user) {
        res.status(200).json(user);
    }
    else {res.status(404).send();}
}
