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

testuserInput, userid

test('user search with userinput and userid', async () => {
  const meal = await request.get('/v0/userSearch?userInput=che&userid=1').set(token[0], token[1])
  expect(meal.statusCode).toBe(200);
});

test('user search with userinput matching none and userid', async () => {
  const meal = await request.get('/v0/userSearch?userInput=jhadwdjijiqwjid&userid=1').set(token[0], token[1])
  expect(meal.statusCode).toBe(404);
});

test('user search with userinput and userid', async () => {
  const meal = await request.get('/v0/userSearch?userInput=che&userid=2').set(token[0], token[1])
  expect(meal.statusCode).toBe(200);
});
