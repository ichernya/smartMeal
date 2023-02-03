DELETE FROM recipes;
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData) VALUES ('Mushroom Poppers', '{"Baby Bella Mushrooms", "Cheese", "Jalepeno"}', '3', '/test.png');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData) VALUES ('Chicken Parmesan', '{"Chicken Breast", "Parmesan", "Pasta", "Butter"}', '4', '/test.png');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData) VALUES ('Cheeseburger', '{"Beef Patty", "Buns", "American Cheddar", "Lettuce", "Pickels", "Mayonaise", "Ketchup"}', '7', '/test.png');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData) VALUES ('Pepperoni Pizza', '{"Pizza Dough", "Pepperoni", "Mozzarella Cheese"}', '3', '/test.png');

DELETE FROM users;

INSERT INTO users(username, passwrd) VALUES ('admin', 'password');
INSERT INTO users(username, passwrd) VALUES ('user', 'drowssap');
INSERT INTO users(username, passwrd) VALUES ('molly@books.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y');


DELETE FROM meals;
INSERT INTO meals(mealsid, recipeid, dayof) VALUES (1, 1, '2023-01-19');
