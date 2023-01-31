DELETE FROM recipes;
INSERT INTO recipes(dishname, ingredients) VALUES ('Mushroom Poppers', '{"Baby Bella Mushrooms", "Cheese", "Jalepeno"}');
INSERT INTO recipes(dishname, ingredients) VALUES ('Chicken Parmesan', '{"Chicken Breast", "Parmesan", "Pasta", "Butter"}');

DELETE FROM users;

INSERT INTO users(username, passwrd) VALUES ('admin', 'password');
INSERT INTO users(username, passwrd) VALUES ('user', 'drowssap');
INSERT INTO users(username, passwrd) VALUES ('molly@books.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y');


DELETE FROM meals;
INSERT INTO meals(mealsid, recipeid, dayof) VALUES (1, 1, '2023-01-19');
