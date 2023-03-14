import {waitFor, render, fireEvent, act} from '@testing-library/react';
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
  rest.put(URL + '/mealName', (req, res, ctx) => {
    return res(
      ctx.status(200),
    );
  }),

  rest.put(URL + '/meals', (req, res, ctx) => {
    return res(
      ctx.status(200),
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
 * @param {integer} width somehting
 */
function setWidth(width) {
  global.innerWidth = width;
  act(() => {
    global.dispatchEvent(new Event('resize'));
  });
}


/**
 */
test('open sidebar', async () => {
  window.alert.mockClear();
  render(<App/>);
  fireEvent.click(screen.getByText('Login'));

  // Log in
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
    const home = screen.getByText('New Meal');
    expect(home).toBeInTheDocument();
  });
  await screen.findByText('New Meal');
  await screen.findByText('Mushroom Poppers');
  await screen.findByText('Cheeseburger');


  fireEvent.click(screen.getByTestId('openSidebar'));
});

/**
 */
test('hide sidebar', async () => {
  window.alert.mockClear();
  render(<App/>);

  waitFor(() => {
    const home = screen.getByText('New Meal');
    expect(home).toBeInTheDocument();
  });
  await screen.findByText('New Meal');
  await screen.findByText('Mushroom Poppers');
  await screen.findByText('Cheeseburger');

  setWidth(600);
});


/**
 */
test('settings', async () => {
  window.alert.mockClear();
  render(<App/>);

  waitFor(() => {
    const home = screen.getByText('New Meal');
    expect(home).toBeInTheDocument();
  });
  await screen.findByText('New Meal');
  await screen.findByText('Mushroom Poppers');
  await screen.findByText('Cheeseburger');

  fireEvent.click(screen.getByTestId('Settings'));
  fireEvent.click(screen.getByTestId('other'));
  fireEvent.click(screen.getByTestId('closeSetting'));
});


/**
 */
test('logout', async () => {
  window.alert.mockClear();
  render(<App/>);

  waitFor(() => {
    const home = screen.getByText('New Meal');
    expect(home).toBeInTheDocument();
  });
  await screen.findByText('New Meal');
  await screen.findByText('Mushroom Poppers');
  await screen.findByText('Cheeseburger');

  fireEvent.click(screen.getByTestId('Logout'));
});

