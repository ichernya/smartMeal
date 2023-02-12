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

const switchOut = async (ingredient) => {
    const select = `SELECT * FROM substitutions WHERE LOWER(ingredient) = LOWER($1)`
    const query = {
        text: select,
        values: [ ingredient ]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.swaps = async (req, res) => {
    const newIng = await switchOut( req.query.ingredient );
    if (newIng) {res.status(200).json(newIng);}
    else {res.status(404).send();}
}