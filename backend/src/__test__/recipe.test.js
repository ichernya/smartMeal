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

test('Get recipe with id', async () => {
    const meal = await request.get('/v0/recipe?recipeid=1').set(token[0], token[1])
    expect(meal.statusCode).toBe(200);

  });

test('Recieve non existing recipe', async () => {
    const mealNone = await request.get('/v0/recipe?recipeid=0').set(token[0], token[1])
    expect(mealNone.statusCode).toBe(404);
})

test ('Create a new recipe', async () => {
    const newRecipe = {
        'dishname': 'example',
        'ingredients': [ ['Chicken', '1', 'lbs'] ],
        'imageData': '/test.png',
        'vegan': false,
        'halal': false,
        'healthy': true,
        'kosher': false
      };
      const recipe = await request.post('/v0/recipes')
      .send(newRecipe).set(token[0], token[1])
      expect(recipe.statusCode).toBe(201);
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
    .expect(201)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
    });
});

