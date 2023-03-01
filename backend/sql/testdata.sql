DELETE FROM recipes;
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, halal, kosher) VALUES ('Mushroom Poppers', '{"Baby Bella Mushrooms", "Cheese", "Jalepeno"}', '3', '/test.png', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, healthy, halal, kosher) VALUES ('Chicken Parmesan', '{"Chicken Breast", "Parmesan", "Pasta", "Butter"}', '4', '/test.png', 'true', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, kosher, halal) VALUES ('Cheeseburger', '{"Beef Patty", "Buns", "American Cheddar", "Lettuce", "Pickels", "Mayonaise", "Ketchup"}', '7', '/images/cheeseburger.png', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData) VALUES ('Pepperoni Pizza', '{"Pizza Dough", "Pepperoni", "Mozzarella Cheese"}', '3', '/test.png');

DELETE FROM users;

INSERT INTO users(username, passwrd) VALUES ('admin', 'password');
INSERT INTO users(username, passwrd) VALUES ('user', 'drowssap');
INSERT INTO users(username, passwrd) VALUES ('molly@books.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y');


DELETE FROM meals;
INSERT INTO meals(mealWeek, mealsid) VALUES ('{ "id": "1", "2023-02-17": {"breakfast": "1", "lunch": "2", "dinner": "3"}, "2023-02-18": {"breakfast": "2", "lunch": "3", "dinner": "1"}}', 1);
INSERT INTO meals(mealWeek, mealsid) VALUES ('{ "id": "2", "2023-02-27": {"breakfast": "2", "lunch": "3", "dinner": "3"}, "2023-02-27": {"breakfast": "1", "lunch": "2", "dinner": "1"}}', 2);


DELETE FROM substitutions;
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Whole Milk', '{"Skimmed Milk", "Fat Free Milk"}', '{"Almond Milk", "Soy Milk", "Oat Milk"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Cheese', '{"Low Fat Cheese", "Fat Free Cheese"}', '{"Cashew Cheese", "Daiya Cheese"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Beef', '{"Bison", "Lamb"}', '{"Tempeh"}');