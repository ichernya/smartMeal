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


test('Get meal with dayof , mealsid, firstDay', async () => {
    const meal = await request.get('/v0/meals?dayof=2023-02-19&mealsid=1&firstDay=2023-02-19').set(token[0], token[1])
    expect(meal.statusCode).toBe(200);
  });

test('Create meal with dayof , mealsid, firstDay', async () => {
    const meal = await request.get('/v0/meals?dayof=2023-02-40&mealsid=1&firstDay=2023-02-40').set(token[0], token[1])
    expect(meal.statusCode).toBe(201);
    const mealRetry = await request.get('/v0/meals?dayof=2023-02-40&mealsid=1&firstDay=2023-02-40').set(token[0], token[1])
    expect(mealRetry.statusCode).toBe(200);
  });

test('Create grocerylist with mealsid, firstDay', async () => {
    const meal = await request.get('/v0/groceryList?mealsid=1&firstDay=2023-02-19').set(token[0], token[1])
    expect(meal.statusCode).toBe(201);
    const mealRetry = await request.get('/v0/groceryList?mealsid=1&firstDay=2023-02-19').set(token[0], token[1])
    expect(mealRetry.statusCode).toBe(200);
  });

//   curl -X 'PUT' \
//   'http://localhost:3010/v0/meals' \
//   -H 'accept: application/json' \
//   -H 'Authorization: Bearer aaa' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "mealsid": 1,
//   "dayof": "{2023-02-24}",
//   "changes": "{'\''breakfast'\'': '\''2'\'', '\''lunch'\'': '\''2'\'', '\''dinner'\'': '\''4'\''}",
//   "firstDay": "2023-02-19"
// }'

test('Create grocerylist with mealsid, firstDay', async () => {
  
  const body = {
    mealsid: 1,
    dayof: "{2023-02-24}",
    changes: "{'\''breakfast'\'': '\''2'\'', '\''lunch'\'': '\''2'\'', '\''dinner'\'': '\''4'\''}",
    firstDay: "2023-02-19"
  }
  const meal = await request.get('/v0/meals').send(body).set(token[0], token[1]);
  expect(meal.statusCode).toBe(201);
});
