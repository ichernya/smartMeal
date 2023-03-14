const supertest = require('supertest');
const http = require('http');

const db = require('./db.js');
const app = require('../app.js');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll((done) => {
  server.close(done);
});

const token = ['Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAYm9va3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA2Mjc3MDAxLCJleHAiOjE2MDYyNzcwNjF9.1nwY0lDMGrb7AUFFgSaYd4Q7Tzr-BjABclmoKZOqmr4`];

const testUser = {'email': 'molly@books.com', 'password': 'mollymember'};

test('Login Success', async () => {
  await request.post('/v0/login')
    .send(testUser)
    .expect(200);
});

const wrongUser = {'email': 'bigdog@books.com', 'password': 'bigdogcentral'};
test('Login Fail', async () => {
  await request.post('/v0/login')
    .send(wrongUser)
    .expect(401);
});

const newUser = {'email': 'dburger@gmail.com', 'testingNewPW#123'};
test('Signup success', asycn () => {
  await request.post('/v0/signup')
    .send(newUser)
    .expect(201);
})

const newRecipe = {
  'dishname': 'example',
  'ingredients': [ ['Chicken', '1', 'lbs'] ],
  'imageData': '/test.png',
  'vegan': false,
  'halal': false,
  'healthy': true,
  'kosher': false
};

test('POST recipe', async () => {
  await request.post('/v0/recipes')
    .send(newRecipe)
    .expect(201);
});


/*
{
  "dishname": "string",
  "ingredients": [
    [
      "egg",
      "1",
      "N/A"
    ],
    [
      "bacon",
      "1",
      "g"
    ],
    [
      "cheese",
      "1",
      "g"
    ]
  ],
  "ingredientAm": 0,
  "imageData": "string",
  "vegan": true,
  "halal": true,
  "healthy": true,
  "kosher": true
}

 */
