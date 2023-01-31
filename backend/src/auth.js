const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secrets = require('./secrets');

const selectEmailPassword = async (email) => {
  // const select = 'SELECT email, password FROM member WHERE email= $1';
  const select = 'SELECT username, passwrd FROM member WHERE username= $1';
  const query = {
    text: select,
    values: [email],
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
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
