const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

// requirements for the other files, to be able to use functions that query the database
const recipe = require('./recipe');
const meal = require('./meal');
const auth = require('./auth');
const mealWeek = require('./mealWeek');
const userSearch = require('./userSearch');
const switchOut = require('./switchOut');
const publicMeal = require('./publicMeal');

// use express to create the app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//setup swagger and api to allow easier testing
const apiSpec = path.join(__dirname, '../api/openapi.yaml');
const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

// openApiValidator setup to validify the schema in openapi.yaml
app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

// calls the functions that will query the database 
app.post('/v0/login', auth.login);
app.get('/v0/recipes', auth.check, recipe.getAll);
app.get('/v0/recipe', recipe.getOne);
app.get('/v0/meals', meal.pullFoodDay);
app.post('/v0/meals', meal.addFoodUser);
app.put('/v0/meals', meal.updateFoodUser);
app.get('/v0/mealWeek', mealWeek.pullFoodWeek);
app.get('/v0/userSearch', userSearch.getUserQuery);
app.get('/v0/switchOut', switchOut.swaps);
app.get('/v0/publicMeal', publicMeal.pullpublicMeal)

// outputting error codes and mesages for debugging
app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;