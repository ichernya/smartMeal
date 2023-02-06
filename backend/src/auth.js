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

const selectEmailPassword = async (email) => {
  // const select = 'SELECT email, password FROM member WHERE email= $1';
  const select = 'SELECT username, passwrd FROM users WHERE username= $1';
  const query = {
    text: select,
    values: [email],
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
};

const createUser = async (email, password) => {

};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  const loginInfo = await selectEmailPassword(email);
  let user = {'email': 'placeholder@books.com', 'password': 'placeholder'};
  if (loginInfo.length != 0) {
    user = {'email': loginInfo[0].username, 'password': loginInfo[0].passwrd};
  }
  if (user.email === email && bcrypt.compareSync(password, user.password)) {
    const accessToken = jwt.sign(
      {email: user.email},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
    res.status(200).json({name: user.email, accessToken: accessToken});
  } else {
    res.status(401).send('Invalid credentials');
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
