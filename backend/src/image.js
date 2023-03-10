const {Pool} = require('pg');
const multer = require('multer');
const imageUpload = multer({
    dest: 'images',
});

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




// exports.getImage = async (req, res) => { 
//     return req;
// }


// const userQueryPublicMealPlan = async (public, mealName) => { }

// exports.postImage = async (req, res) => {
//     console.log(req.file)
//     res.status(404)
//  }