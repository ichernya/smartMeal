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
const userSearch = require('./userSearch');
const switchOut = require('./switchOut');
const publicMeal = require('./publicMeal');
const signup = require('./signup');
const ingredients = require('./ingredients');
const tags = require('./tags');

// use express to create the app
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));

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
app.put('/v0/meals', meal.updateFoodUser);
app.get('/v0/userSearch', userSearch.getUserQuery);
app.get('/v0/switchOut', switchOut.swaps);
app.get('/v0/publicMeal', publicMeal.pullpublicMeal);
app.post('/v0/recipes', recipe.postRecipe);
app.post('/v0/signup', signup.putUser);
app.post('/v0/meals', meal.addFoodUser);
app.put('/v0/mealName', meal.updateMealName);
app.get('/v0/ingredients', ingredients.getIngredients);
app.get('/v0/allIngredients', ingredients.pullIngredients);
app.get('/v0/diets', tags.getDiets);
app.put('/v0/diets', tags.updateDiet);
app.get('/v0/groceryList', ingredients.pullGroceryList);
app.put('/v0/groceryList', ingredients.updateAsChecked);


// outputting error codes and mesages for debugging
app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status || 500,
  });
});

module.exports = app;
