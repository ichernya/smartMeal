DELETE FROM recipes;
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, halal, kosher) VALUES ('Mushroom Poppers', '{"Baby Bella Mushrooms", "Cheese", "Jalepeno"}', '3', '/test.png', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, healthy, halal, kosher) VALUES ('Chicken Parmesan', '{"Chicken Breast", "Parmesan", "Pasta", "Butter"}', '4', '/test.png', 'true', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, kosher, halal) VALUES ('Cheeseburger', '{"Beef Patty", "Buns", "American Cheddar", "Lettuce", "Pickels", "Mayonaise", "Ketchup"}', '7', '/test.png', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData) VALUES ('Pepperoni Pizza', '{"Pizza Dough", "Pepperoni", "Mozzarella Cheese"}', '3', '/test.png');

DELETE FROM users;

INSERT INTO users(username, passwrd) VALUES ('admin', 'password');
INSERT INTO users(username, passwrd) VALUES ('user', 'drowssap');
INSERT INTO users(username, passwrd) VALUES ('molly@books.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y');


DELETE FROM meals;
INSERT INTO meals(mealsid, breakfast, lunch, dinner, dayof) VALUES (1, 1, 0, 0, '2023-01-19');

DELETE FROM substitutions;
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Whole Milk', '{"Skimmed Milk", "Fat Free Milk"}', '{"Almond Milk", "Soy Milk", "Oat Milk"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Cheese', '{"Skimmed Milk", "Fat Free Milk"}', '{"Cashew Cheese", "Daiya Cheese"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Beef', '{"Bison", "Lamb"}', '{"Tempeh"}');