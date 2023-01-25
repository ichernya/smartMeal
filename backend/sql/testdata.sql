DELETE FROM recipes;
INSERT INTO recipes(dishname, ingredients) VALUES ('Mushroom Poppers', {"Baby Bella Mushrooms", "Cheese", "Jalepeno"});
INSERT INTO recipes(dishname, ingredients) VALUES ('Chicken Parmesan', {"Chicken Breast", "Parmesan", "Pasta", "Butter"});

DELETE FROM users;
INSERT INTO users(username, passwrd) VALUES ('admin', 'password')
INSERT INTO users(username, passwrd) VALUES ('user', 'drowssap');
