DELETE FROM recipes;
INSERT INTO recipes(dishname, ingredients) VALUES ('Mushroom Poppers', '{"Baby Bella Mushrooms", "Cheese", "Jalepeno"}');
INSERT INTO recipes(dishname, ingredients) VALUES ('Chicken Parmesan', '{"Chicken Breast", "Parmesan", "Pasta", "Butter"}');

DELETE FROM users;

INSERT INTO users(username, passwrd) VALUES ('admin', 'password');
INSERT INTO users(username, passwrd) VALUES ('user', 'drowssap');
INSERT INTO users(username, passwrd) VALUES ('molly@books.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y');
INSERT INTO users(username, passwrd) VALUES ('bigdog@books.com', '$2y$10$njubsE2yINrqtF9tr8aukubqKQAX1EyXutfpkQf4ycG/WgyCj21TC');

-- $2y$10$wFk3nBhgnME7QaVFmOaxUO4YrRNGwwqy3OkSv9mruG2fiyQ1exH36


DELETE FROM meals;
INSERT INTO meals(mealsid, recipeid, dayof) VALUES (1, 1, '2023-01-19');
