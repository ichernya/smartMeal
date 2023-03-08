const {Pool} = require('pg');

const user = "postgres";
const host = "localhost";
const database = "dev";
const password = "postgres";
const port = "5432";

const pool = new Pool({
  host: 'localhost',
  port: port,
  database: database,
  user: user,
  password: password,
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secrets = require('./secrets');

const checkUser = async(email) => {
  const select = 'SELECT * FROM users WHERE username = ($1)';
  const query = {
    text: select,
    values: [ email ],
  }
  // console.log('dubmode');
  const {rows} = await pool.query(query);
  console.log(rows.length);
  if (rows.length > 0){
    console.log("false");
    return false;
  }
  else {
    console.log("true");
    return true;
  }
}

const createUser = async (email, password) => {
  let hashPW = 'placeholder';
  // console.log(email, password, hashPW);
  // console.log(hashPW);
  let id = 'new user';
  bcrypt.hash(password, 10, async function(err, hash) {
    // console.log('inside hashing function');
    // console.log(hash);
    hashPW = hash;
    // console.log(hashPW);
    const insert = 'INSERT INTO users(username, passwrd) VALUES ($1, $2) RETURNING userid';
    const query = {
      text: insert,
      values: [email, hashPW]
    };
    const id = await pool.query(query);
    console.log(insert, query);
    return id;
  });
  return id;
  // console.log(hashPW);
  // console.log(hashPW);
  // const insert = 'INSERT INTO users(username, passwrd) VALUES ($1, $2) RETURNING userid';
  // const query = {
  //   text: insert,
  //   values: [email, hashPW]
  // };
  // const id = await pool.query(query);
  // console.log(insert, query);
  // return id;
};

const testSignup = async (email, passwrd) => {
  const saltRounds = 10;
  bcrypt
    .hash(passwrd, saltRounds)
    .then(hash => {
      console.log('Hash: ${hash}');
    })
    .catch(err => console.error(err.message));
};

exports.putUser = async (req, res) => {
  console.log("here");
  const newUserEmail = req.body.email;
  const newUserPW = req.body.password;
  console.log(newUserEmail, newUserPW);
  const temp = await checkUser(newUserEmail);
  if(temp === true) {
    const id = await createUser(newUserEmail, newUserPW);
    if (id) {
      res.status(200).send("this is the id " + id);
    } else {
      res.status(404).send();
    }
  } else {
      res.status(409).send();
  }
};


// bcrypt.hash(password, 10, function(err, hash) {
//   const insert = 'INSERT INTO users(username, passwrd) VALUES ($1, hash) RETURNING userid';
//   const query = {
//     text: insert,
//     values: [email],
//   };
//   const id = await pool.query(query);
//   console.log(insert, query);
//   return id;
// });
