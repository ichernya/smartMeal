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


test('Get public meals query empty', async () => {
    const meal = await request.get('/v0/publicMeal?public=true').set(token[0], token[1])
    expect(meal.statusCode).toBe(200);
  });

test('Get public meals query full', async () => {
    const meal = await request.get('/v0/publicMeal?mealName=my&public=true').set(token[0], token[1])
    expect(meal.statusCode).toBe(200);
    for (let dict in meal[0]) {
        expect(meal[0][dict]["mealname"]).toBe("My Healthy Meal");
        break;
    }
    
  });

test('Get private meals query empty user1', async () => {
    const meal = await request.get('/v0/publicMeal?public=false&mealsid=1').set(token[0], token[1])
    expect(meal.statusCode).toBe(200);
  });

test('Get private meals query full user1', async () => {
    const meal = await request.get('/v0/publicMeal?mealName=e&public=false&mealsid=1').set(token[0], token[1])
    expect(meal.statusCode).toBe(200);
    for (let dict in meal[0]) {
        expect(meal[0][dict]["mealname"]).toBe("NoMoreIdeas");
        break;
    }
    
  });