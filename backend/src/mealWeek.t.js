import request from 'supertest';
import express from 'express';
import mealWeek from 'mealWeek.js';

const app = new express();
app.use('/', mealWeek);

describe('mealWeak', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
    });
  
  });