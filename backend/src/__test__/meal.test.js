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
    meals = [
        {
          "firstday": "2023-02-19",
          "mealname": "TEST",
          "public": true,
          "mealweek": {
            "id": "1",
            "2023-02-19": {
              "lunch": {
                "recipeid": 2,
                "dishname": "Chicken Parmesan",
                "ingredients": {
                  "Pasta": {
                    "unit": "ounces",
                    "amount": "8"
                  },
                  "Butter": {
                    "unit": "nobs",
                    "amount": "3"
                  },
                  "Parmesan": {
                    "unit": "cup",
                    "amount": "1"
                  },
                  "Chicken Breast": {
                    "unit": "skinless chicken breast halves",
                    "amount": "4"
                  }
                },
                "ingredientam": 4,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": true,
                "kosher": true
              },
              "dinner": {
                "recipeid": 3,
                "dishname": "Cheeseburger",
                "ingredients": {
                  "Buns": {
                    "unit": "buns",
                    "amount": "2"
                  },
                  "Ketchup": {
                    "unit": "tablespoon",
                    "amount": "1"
                  },
                  "Lettuce": {
                    "unit": "N/A",
                    "amount": "1"
                  },
                  "Pickels": {
                    "unit": "N/A",
                    "amount": "4"
                  },
                  "Mayonaise": {
                    "unit": "tablespoon",
                    "amount": "1"
                  },
                  "Beef Patty": {
                    "unit": "pounds",
                    "amount": ".25"
                  },
                  "American Cheddar": {
                    "unit": "slices",
                    "amount": "2"
                  }
                },
                "ingredientam": 7,
                "imagedata": "/backend/images/cheeseburger.png",
                "vegan": false,
                "halal": true,
                "healthy": false,
                "kosher": true
              },
              "breakfast": {
                "recipeid": 1,
                "dishname": "Mushroom Poppers",
                "ingredients": {
                  "Cheese": {
                    "unit": "cups",
                    "amount": "2"
                  },
                  "Jalepeno": {
                    "unit": "jalepeno",
                    "amount": "4"
                  },
                  "Baby Bella Mushrooms": {
                    "unit": "mushrooms",
                    "amount": "20"
                  }
                },
                "ingredientam": 3,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": false,
                "kosher": true
              }
            },
            "2023-02-20": {
              "lunch": {
                "recipeid": 3,
                "dishname": "Cheeseburger",
                "ingredients": {
                  "Buns": {
                    "unit": "buns",
                    "amount": "2"
                  },
                  "Ketchup": {
                    "unit": "tablespoon",
                    "amount": "1"
                  },
                  "Lettuce": {
                    "unit": "N/A",
                    "amount": "1"
                  },
                  "Pickels": {
                    "unit": "N/A",
                    "amount": "4"
                  },
                  "Mayonaise": {
                    "unit": "tablespoon",
                    "amount": "1"
                  },
                  "Beef Patty": {
                    "unit": "pounds",
                    "amount": ".25"
                  },
                  "American Cheddar": {
                    "unit": "slices",
                    "amount": "2"
                  }
                },
                "ingredientam": 7,
                "imagedata": "/backend/images/cheeseburger.png",
                "vegan": false,
                "halal": true,
                "healthy": false,
                "kosher": true
              },
              "dinner": {
                "recipeid": 1,
                "dishname": "Mushroom Poppers",
                "ingredients": {
                  "Cheese": {
                    "unit": "cups",
                    "amount": "2"
                  },
                  "Jalepeno": {
                    "unit": "jalepeno",
                    "amount": "4"
                  },
                  "Baby Bella Mushrooms": {
                    "unit": "mushrooms",
                    "amount": "20"
                  }
                },
                "ingredientam": 3,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": false,
                "kosher": true
              },
              "breakfast": {
                "recipeid": 2,
                "dishname": "Chicken Parmesan",
                "ingredients": {
                  "Pasta": {
                    "unit": "ounces",
                    "amount": "8"
                  },
                  "Butter": {
                    "unit": "nobs",
                    "amount": "3"
                  },
                  "Parmesan": {
                    "unit": "cup",
                    "amount": "1"
                  },
                  "Chicken Breast": {
                    "unit": "skinless chicken breast halves",
                    "amount": "4"
                  }
                },
                "ingredientam": 4,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": true,
                "kosher": true
              }
            },
            "2023-02-21": {
              "lunch": {
                "recipeid": 3,
                "dishname": "Cheeseburger",
                "ingredients": {
                  "Buns": {
                    "unit": "buns",
                    "amount": "2"
                  },
                  "Ketchup": {
                    "unit": "tablespoon",
                    "amount": "1"
                  },
                  "Lettuce": {
                    "unit": "N/A",
                    "amount": "1"
                  },
                  "Pickels": {
                    "unit": "N/A",
                    "amount": "4"
                  },
                  "Mayonaise": {
                    "unit": "tablespoon",
                    "amount": "1"
                  },
                  "Beef Patty": {
                    "unit": "pounds",
                    "amount": ".25"
                  },
                  "American Cheddar": {
                    "unit": "slices",
                    "amount": "2"
                  }
                },
                "ingredientam": 7,
                "imagedata": "/backend/images/cheeseburger.png",
                "vegan": false,
                "halal": true,
                "healthy": false,
                "kosher": true
              },
              "dinner": {
                "recipeid": 4,
                "dishname": "Pepperoni Pizza",
                "ingredients": {
                  "Pepperoni": {
                    "unit": "N/A",
                    "amount": "15"
                  },
                  "Pizza Dough": {
                    "unit": "pound",
                    "amount": "1"
                  },
                  "Mozzarella Cheese": {
                    "unit": "slices",
                    "amount": "2"
                  }
                },
                "ingredientam": 3,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": false,
                "healthy": false,
                "kosher": false
              },
              "breakfast": {
                "recipeid": 2,
                "dishname": "Chicken Parmesan",
                "ingredients": {
                  "Pasta": {
                    "unit": "ounces",
                    "amount": "8"
                  },
                  "Butter": {
                    "unit": "nobs",
                    "amount": "3"
                  },
                  "Parmesan": {
                    "unit": "cup",
                    "amount": "1"
                  },
                  "Chicken Breast": {
                    "unit": "skinless chicken breast halves",
                    "amount": "4"
                  }
                },
                "ingredientam": 4,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": true,
                "kosher": true
              }
            },
            "2023-02-22": {
              "lunch": {
                "recipeid": 1,
                "dishname": "Mushroom Poppers",
                "ingredients": {
                  "Cheese": {
                    "unit": "cups",
                    "amount": "2"
                  },
                  "Jalepeno": {
                    "unit": "jalepeno",
                    "amount": "4"
                  },
                  "Baby Bella Mushrooms": {
                    "unit": "mushrooms",
                    "amount": "20"
                  }
                },
                "ingredientam": 3,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": false,
                "kosher": true
              },
              "dinner": {
                "recipeid": 4,
                "dishname": "Pepperoni Pizza",
                "ingredients": {
                  "Pepperoni": {
                    "unit": "N/A",
                    "amount": "15"
                  },
                  "Pizza Dough": {
                    "unit": "pound",
                    "amount": "1"
                  },
                  "Mozzarella Cheese": {
                    "unit": "slices",
                    "amount": "2"
                  }
                },
                "ingredientam": 3,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": false,
                "healthy": false,
                "kosher": false
              },
              "breakfast": {
                "recipeid": 2,
                "dishname": "Chicken Parmesan",
                "ingredients": {
                  "Pasta": {
                    "unit": "ounces",
                    "amount": "8"
                  },
                  "Butter": {
                    "unit": "nobs",
                    "amount": "3"
                  },
                  "Parmesan": {
                    "unit": "cup",
                    "amount": "1"
                  },
                  "Chicken Breast": {
                    "unit": "skinless chicken breast halves",
                    "amount": "4"
                  }
                },
                "ingredientam": 4,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": true,
                "kosher": true
              }
            },
            "2023-02-23": {
              "lunch": {
                "recipeid": 1,
                "dishname": "Mushroom Poppers",
                "ingredients": {
                  "Cheese": {
                    "unit": "cups",
                    "amount": "2"
                  },
                  "Jalepeno": {
                    "unit": "jalepeno",
                    "amount": "4"
                  },
                  "Baby Bella Mushrooms": {
                    "unit": "mushrooms",
                    "amount": "20"
                  }
                },
                "ingredientam": 3,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": false,
                "kosher": true
              },
              "dinner": {
                "recipeid": 1,
                "dishname": "Mushroom Poppers",
                "ingredients": {
                  "Cheese": {
                    "unit": "cups",
                    "amount": "2"
                  },
                  "Jalepeno": {
                    "unit": "jalepeno",
                    "amount": "4"
                  },
                  "Baby Bella Mushrooms": {
                    "unit": "mushrooms",
                    "amount": "20"
                  }
                },
                "ingredientam": 3,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": false,
                "kosher": true
              },
              "breakfast": {
                "recipeid": 1,
                "dishname": "Mushroom Poppers",
                "ingredients": {
                  "Cheese": {
                    "unit": "cups",
                    "amount": "2"
                  },
                  "Jalepeno": {
                    "unit": "jalepeno",
                    "amount": "4"
                  },
                  "Baby Bella Mushrooms": {
                    "unit": "mushrooms",
                    "amount": "20"
                  }
                },
                "ingredientam": 3,
                "imagedata": "/test.png",
                "vegan": false,
                "halal": true,
                "healthy": false,
                "kosher": true
              }
            }
          },
          "mealsid": 1,
          "recipes": [
            {
              "recipeid": 1,
              "dishname": "Mushroom Poppers",
              "ingredients": {
                "Cheese": {
                  "unit": "cups",
                  "amount": "2"
                },
                "Jalepeno": {
                  "unit": "jalepeno",
                  "amount": "4"
                },
                "Baby Bella Mushrooms": {
                  "unit": "mushrooms",
                  "amount": "20"
                }
              },
              "ingredientam": 3,
              "imagedata": "/test.png",
              "vegan": false,
              "halal": true,
              "healthy": false,
              "kosher": true
            },
            {
              "recipeid": 2,
              "dishname": "Chicken Parmesan",
              "ingredients": {
                "Pasta": {
                  "unit": "ounces",
                  "amount": "8"
                },
                "Butter": {
                  "unit": "nobs",
                  "amount": "3"
                },
                "Parmesan": {
                  "unit": "cup",
                  "amount": "1"
                },
                "Chicken Breast": {
                  "unit": "skinless chicken breast halves",
                  "amount": "4"
                }
              },
              "ingredientam": 4,
              "imagedata": "/test.png",
              "vegan": false,
              "halal": true,
              "healthy": true,
              "kosher": true
            },
            {
              "recipeid": 3,
              "dishname": "Cheeseburger",
              "ingredients": {
                "Buns": {
                  "unit": "buns",
                  "amount": "2"
                },
                "Ketchup": {
                  "unit": "tablespoon",
                  "amount": "1"
                },
                "Lettuce": {
                  "unit": "N/A",
                  "amount": "1"
                },
                "Pickels": {
                  "unit": "N/A",
                  "amount": "4"
                },
                "Mayonaise": {
                  "unit": "tablespoon",
                  "amount": "1"
                },
                "Beef Patty": {
                  "unit": "pounds",
                  "amount": ".25"
                },
                "American Cheddar": {
                  "unit": "slices",
                  "amount": "2"
                }
              },
              "ingredientam": 7,
              "imagedata": "/backend/images/cheeseburger.png",
              "vegan": false,
              "halal": true,
              "healthy": false,
              "kosher": true
            },
            {
              "recipeid": 4,
              "dishname": "Pepperoni Pizza",
              "ingredients": {
                "Pepperoni": {
                  "unit": "N/A",
                  "amount": "15"
                },
                "Pizza Dough": {
                  "unit": "pound",
                  "amount": "1"
                },
                "Mozzarella Cheese": {
                  "unit": "slices",
                  "amount": "2"
                }
              },
              "ingredientam": 3,
              "imagedata": "/test.png",
              "vegan": false,
              "halal": false,
              "healthy": false,
              "kosher": false
            },
            null
          ]
        }
      ]
    expect(meal[0].toBe(meals[0]))
  });

test('Create meal with dayof , mealsid, firstDay', async () => {
    const meal = await request.get('/v0/meals?dayof=2023-02-40&mealsid=1&firstDay=2023-02-40').set(token[0], token[1])
    expect(meal.statusCode).toBe(201);
    const mealRetry = await request.get('/v0/meals?dayof=2023-02-40&mealsid=1&firstDay=2023-02-40').set(token[0], token[1])
    expect(mealRetry.statusCode).toBe(200);
  });


