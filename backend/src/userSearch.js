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
    const tags = 'SELECT vegan, halal, healthy, kosher FROM users WHERE userid = $1';
    let query = {
        text: tags,
        values: [userid]
    }
    let {rows} = await pool.query(query);

    let allFalse = true;

    // If allFalse, return all recipes
    for (const tag of Object.values(rows[0])) {
        if (tag) {
            allFalse = false;
        }
    }

    let base = 'SELECT * FROM recipes WHERE LOWER(dishname) LIKE LOWER($1)';

    let select = base;

    // Determines whether to add an "AND"
    let tagsFilter = '';
    let count = 0;
    if (!allFalse) {
        // If allFalse, return all recipes
        tagsFilter += ' AND ';
        for (const [tag, bool] of Object.entries(rows[0])) {
            if (count > 0 && bool) {
              tagsFilter += ' AND '
            }
            if (bool) {
                tagsFilter += `${tag} = true`
                count += 1
            }
        }
    }

    select += tagsFilter + ' UNION ' + base + tagsFilter;

    select += ' AND EXISTS (SELECT FROM jsonb_each(recipes.ingredients) AS food(food_key, food_value) WHERE LOWER(food_key) LIKE LOWER($1))';

    query = {
        text: select,
        values: ['%' + userInput + '%']
    }
    rows = await pool.query(query);
    return rows['rows'];

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
}


exports.getUserQuery = async (req, res) => {
    // caller function that awaits and returns entire recipe for hit, send 404 on error
    const user = await userQuery(req.query.userInput, req.query.userid);
    if (user) {
        res.status(200).json(user);
    }
    else {res.status(404).send();}
}
