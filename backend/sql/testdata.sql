DELETE FROM recipes;
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, halal, kosher) VALUES ('Mushroom Poppers', '{"Baby Bella Mushrooms":{"amount" : "20", "unit": "mushrooms"}, "Cheese":{"amount": "2", "unit": "cups"}, "Jalepeno": {"amount": "4", "unit": "jalepeno"}}', '3', '/test.png', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, healthy, halal, kosher) VALUES ('Chicken Parmesan', '{"Chicken Breast":{"amount": "4","unit":"skinless chicken breast halves"}, "Parmesan":{"amount": "1","unit":"cup"}, "Pasta":{"amount": "8","unit":"ounces"}, "Butter":{"amount": "3","unit":"nobs"}}', '4', '/test.png', 'true', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, kosher, halal) VALUES ('Cheeseburger', '{"Beef":{"amount": ".25","unit":"pounds"}, "Buns":{"amount": "2","unit":"buns"}, "American Cheddar Cheese":{"amount": "2","unit":"slices"}, "Lettuce":{"amount": "1","unit":"N/A"}, "Pickels":{"amount": "4","unit":"N/A"}, "Mayonaise":{"amount": "1","unit":"tablespoon"}, "Ketchup":{"amount": "1","unit":"tablespoon"}}', '7', '/backend/images/cheeseburger.png', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData) VALUES ('Pepperoni Pizza', '{"Pizza Dough":{"amount": "1","unit":"pound"}, "Pepperoni":{"amount": "15","unit":"N/A"}, "Mozzarella Cheese":{"amount": "2","unit":"slices"}}', '3', '/test.png');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, halal, kosher)VALUES ('Burger', '{"Burger patty":{"amount": ".25","unit":"pounds"}, "Egg":{"amount":"1", "unit": "N/A"}, "Rice": {"amount": "4", "unit":"g"}}','3', '/test.png', 'true', 'true');
--INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, halal, kosher)VALUES ('Loco Moco','{"protein":{"burger patty":{"amount": ".25", "unit": "lbs"}, "egg":{"amount": "1", "unit": "NA"}},"carb":{"rice":{"amount": "4", "unit": "gram"}}}', '3', '/test.png', 'true', 'true');

DELETE FROM users;

INSERT INTO users(username, passwrd) VALUES ('admin', 'password');
INSERT INTO users(username, passwrd) VALUES ('user', 'drowssap');
INSERT INTO users(username, passwrd, vegan, halal, healthy, kosher) VALUES ('molly@books.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y', 'false', 'false', 'false', 'false');

DELETE FROM meals;
INSERT INTO meals(firstDay, mealName, public, mealWeek, mealsid) VALUES ('2023-02-19', 'Test Meal', 'true', '{ "id": "1", "2023-02-19": {"breakfast": "1", "lunch": "2", "dinner": "3"}, "2023-02-20": {"breakfast": "2", "lunch": "3", "dinner": "1"}, "2023-02-21": {"breakfast": "2", "lunch": "3", "dinner": "4"}, "2023-02-22": {"breakfast": "2", "lunch": "1", "dinner": "4"}, "2023-02-23": {"breakfast": "1", "lunch": "1", "dinner": "1"}}', 1);
INSERT INTO meals(firstDay, mealName, public, mealWeek, mealsid) VALUES ('2023-02-26', 'My Healthy Meal', 'true', '{ "id": "2", "2023-02-26": {"breakfast": "2", "lunch": "3", "dinner": "3"}, "2023-02-27": {"breakfast": "1", "lunch": "2", "dinner": "1"}}', 2);

DELETE FROM substitutions;
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Whole Milk', '{"Skimmed Milk", "Fat Free Milk"}', '{"Almond Milk", "Soy Milk", "Oat Milk"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Cheese', '{"Low Fat Cheese", "Fat Free Cheese"}', '{"Cashew Cheese", "Daiya Cheese"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Beef', '{"Bison", "Lamb"}', '{"Tempeh"}');

-- INSERT INTO ingredients (protein, dairy, vegetables, spices, grains) VALUES ('{"Chicken", "Pepperoni", "Beef"}', '{"Milk", "Cheddar Cheese", "Mozzarella Cheese"}', '{"Broccoli", "Cucumber", "Carrot"}', '{"Pepper", "Salt", "Garlic Powder"}', '{"Rice", "Wheat", "Oats"}');
insert into ingredients (protein, dairy, vegetables, spices, grains) values ('{"protein", "Chicken", "Pepperoni", "Beef"}', '{"diary", "Milk", "Cheddar Cheese", "Mozzarella Cheese"}', '{"vegetables", "Broccoli", "Cucumber", "Carrot"}', '{"spices", "Pepper", "Salt", "Garlic Powder"}', '{"grains", "Rice", "Wheat", "Oats"}');
