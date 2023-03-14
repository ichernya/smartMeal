import {act, waitFor, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {configure} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App.js';

const URL = 'http://localhost:3010/v0';
window.alert = jest.fn();

const currentDay = new Date();
const dateOffset = currentDay.getDay();
const startDay = new Date();
startDay.setDate(currentDay.getDate() - dateOffset);
const start = startDay.toISOString().split('T')[0];


const server = setupServer(
  rest.get(URL + '/groceryList', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        [
          {
            'firstday': start,
            'mealsid': 3,
            'checklist': {
              'Dairy': {
                'amount': 2,
                'hidden': false,
                'ingredients': {
                  'Butter': {
                    'unit': 'nobs',
                    'amount': '9',
                    'checked': false,
                  },
                  'Cheese': {
                    'unit': 'cups',
                    'amount': '12',
                    'checked': false,
                  },
                },
                'amountChecked': 0,
              },
              'Other': {
                'amount': 12,
                'hidden': false,
                'ingredients': {
                  'Buns': {
                    'unit': 'buns',
                    'amount': '6',
                    'checked': false,
                  },
                  'Ketchup': {
                    'unit': 'tablespoon',
                    'amount': '3',
                    'checked': false,
                  },
                  'Pickels': {
                    'unit': 'N/A',
                    'amount': '12',
                    'checked': false,
                  },
                  'Jalepeno': {
                    'unit': 'jalepeno',
                    'amount': '24',
                    'checked': false,
                  },
                  'Parmesan': {
                    'unit': 'cup',
                    'amount': '3',
                    'checked': false,
                  },
                  'Mayonaise': {
                    'unit': 'tablespoon',
                    'amount': '3',
                    'checked': false,
                  },
                  'Pepperoni': {
                    'unit': 'N/A',
                    'amount': '30',
                    'checked': false,
                  },
                  'Pizza Dough': {
                    'unit': 'pound',
                    'amount': '2',
                    'checked': false,
                  },
                  'Chicken Breast': {
                    'unit': 'skinless chicken breast halves',
                    'amount': '16',
                    'checked': false,
                  },
                  'Mozzarella Cheese': {
                    'unit': 'slices',
                    'amount': '4',
                    'checked': false,
                  },
                  'Baby Bella Mushrooms': {
                    'unit': 'mushrooms',
                    'amount': '120',
                    'checked': false,
                  },
                  'American Cheddar Cheese': {
                    'unit': 'slices',
                    'amount': '6',
                    'checked': false,
                  },
                },
                'amountChecked': 0,
              },
              'Grains': {
                'amount': 1,
                'hidden': false,
                'ingredients': {
                  'Pasta': {
                    'unit': 'ounces',
                    'amount': '24',
                    'checked': false,
                  },
                },
                'amountChecked': 0,
              },
              'Protein': {
                'amount': 1,
                'hidden': false,
                'ingredients': {
                  'Beef': {
                    'unit': 'pounds',
                    'amount': '0.5',
                    'checked': false,
                  },
                },
                'amountChecked': 0,
              },
              'Vegetables': {
                'amount': 1,
                'hidden': false,
                'ingredients': {
                  'Lettuce': {
                    'unit': 'N/A',
                    'amount': '2',
                    'checked': false,
                  },
                },
                'amountChecked': 0,
              },
            },
          },
        ],
      ),
    );
  }),
  rest.post(URL + '/login', (req, res, ctx) => {
    sessionStorage.clear('is-authenticated');
    const {email, password} = req.body;
    if (email !== 'molly@books.com' ||
        password !== 'mollymember') {
      sessionStorage.setItem('is-authenticated', 'false');
      return res(ctx.status(401));
    }
    sessionStorage.setItem('is-authenticated', 'true');
    return res(
      ctx.status(200),
      ctx.json({
        name: 'Josh Kew',
        userid: 3,
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
          'eyJlbWFpbCI6ImFubmFAYm9va3MuY29tIiwicm9sZSI6ImFkb' +
          'WluIiwiaWF0IjoxNjA2Mjc3MDAxLCJleHAiOjE2MDYyNzcwNj' +
          'F9.1nwY0lDMGrb7AUFFgSaYd4Q7Tzr-BjABclmoKZOqmr4',
      }),
    );
  }),

  rest.get(URL + '/recipes', (req, res, ctx) => {
    if (!sessionStorage.getItem('is-authenticated') ||
      sessionStorage.getItem('is-authenticated') === 'false') {
      return res(ctx.status(403));
    } else {
      return res(
        ctx.status(200),
        ctx.json(
          [
            {
              'recipeid': 1,
              'dishname': 'Mushroom Poppers',
              'ingredients': {
                'Cheese': {
                  'unit': 'cups',
                  'amount': '2',
                },
                'Jalepeno': {
                  'unit': 'jalepeno',
                  'amount': '4',
                },
                'Baby Bella Mushrooms': {
                  'unit': 'mushrooms',
                  'amount': '20',
                },
              },
              'ingredientam': 3,
              'imagedata': 'test.png',
              'vegan': false,
              'halal': true,
              'healthy': false,
              'kosher': true,
            },
            {
              'recipeid': 2,
              'dishname': 'Chicken Parmesan',
              'ingredients': {
                'Pasta': {
                  'unit': 'ounces',
                  'amount': '8',
                },
                'Butter': {
                  'unit': 'nobs',
                  'amount': '3',
                },
                'Parmesan': {
                  'unit': 'cup',
                  'amount': '1',
                },
                'Chicken Breast': {
                  'unit': 'skinless chicken breast halves',
                  'amount': '4',
                },
              },
              'ingredientam': 4,
              'imagedata': 'test.png',
              'vegan': false,
              'halal': true,
              'healthy': true,
              'kosher': true,
            },
            {
              'recipeid': 3,
              'dishname': 'Cheeseburger',
              'ingredients': {
                'Buns': {
                  'unit': 'buns',
                  'amount': '2',
                },
                'Ketchup': {
                  'unit': 'tablespoon',
                  'amount': '1',
                },
                'Lettuce': {
                  'unit': 'N/A',
                  'amount': '1',
                },
                'Pickels': {
                  'unit': 'N/A',
                  'amount': '4',
                },
                'Mayonaise': {
                  'unit': 'tablespoon',
                  'amount': '1',
                },
                'Beef Patty': {
                  'unit': 'pounds',
                  'amount': '.25',
                },
                'American Cheddar': {
                  'unit': 'slices',
                  'amount': '2',
                },
              },
              'ingredientam': 7,
              'imagedata': 'cheeseburger.png',
              'vegan': false,
              'halal': true,
              'healthy': false,
              'kosher': true,
            },
            {
              'recipeid': 4,
              'dishname': 'Pepperoni Pizza',
              'ingredients': {
                'Pepperoni': {
                  'unit': 'N/A',
                  'amount': '15',
                },
                'Pizza Dough': {
                  'unit': 'pound',
                  'amount': '1',
                },
                'Mozzarella Cheese': {
                  'unit': 'slices',
                  'amount': '2',
                },
              },
              'ingredientam': 3,
              'imagedata': 'test.png',
              'vegan': false,
              'halal': false,
              'healthy': false,
              'kosher': false,
            },
            {
              'recipeid': 5,
              'dishname': 'Burger',
              'ingredients': {
                'Egg': {
                  'unit': 'N/A',
                  'amount': '1',
                },
                'Rice': {
                  'unit': 'g',
                  'amount': '4',
                },
                'Burger patty': {
                  'unit': 'pounds',
                  'amount': '.25',
                },
              },
              'ingredientam': 3,
              'imagedata': 'test.png',
              'vegan': false,
              'halal': true,
              'healthy': false,
              'kosher': true,
            },
          ],
        ));
    }
  }),

  rest.get(URL + `/meals`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        [
          {
            'firstday': start,
            'mealname': 'New Meal',
            'public': true,
            'mealweek': {
              'id': '3',
            },
            'mealsid': 3,
            'recipes': [
              null,
            ],
          },
        ],
      ),
    );
  }),

  rest.get(URL + `/diets`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          'vegan': false,
          'halal': false,
          'healthy': true,
          'kosher': false,
        },
      ),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

configure({
  testIdAttribute: 'id',
});


/**
 */
test('Invalid Login', async () => {
  window.alert.mockClear();
  render(<App/>);
  fireEvent.click(screen.getByText('Login'));
  await screen.findByText('Sign In');
  fireEvent.change(screen.getByTestId('email'), {target: {value: ''}});
  fireEvent.change(screen.getByTestId('password'), {target: {value: ''}});
  fireEvent.change(screen.getByTestId('email'),
    {target: {value: 'test@pa.edu'}});
  fireEvent.change(screen.getByLabelText('Password *'),
    {target: {value: 'wringpass'}});
  act(() => {
    fireEvent.click(screen.getByText('Sign In'));
  });
  await screen.findByText('Sign In');
});

/**
 */
test('Login', async () => {
  window.alert.mockClear();
  render(<App/>);
  await screen.findByText('Sign In');
  fireEvent.change(screen.getByTestId('email'), {target: {value: ''}});
  fireEvent.change(screen.getByTestId('password'), {target: {value: ''}});
  fireEvent.change(screen.getByTestId('email'),
    {target: {value: 'molly@books.com'}});
  fireEvent.change(screen.getByLabelText('Password *'),
    {target: {value: 'mollymember'}});
  act(() => {
    fireEvent.click(screen.getByText('Sign In'));
  });

  waitFor(() => {
    const home = screen.findByText('New Meal');
    expect(home).toBeInTheDocument();
  });
  await screen.findByText('Mushroom Poppers');
  await screen.findByText('Cheeseburger');
});
