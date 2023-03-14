DELETE FROM recipes;
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, halal, kosher) VALUES ('Mushroom Poppers', '{"Baby Bella Mushrooms":{"amount" : "20", "unit": "mushrooms"}, "Cheese":{"amount": "2", "unit": "cups"}, "Jalepeno": {"amount": "4", "unit": "jalepeno"}}', '3', 'mushroom_poppers.png', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, healthy, halal, kosher) VALUES ('Chicken Parmesan', '{"Chicken Breast":{"amount": "4","unit":"skinless chicken breast halves"}, "Parmesan":{"amount": "1","unit":"cup"}, "Pasta":{"amount": "8","unit":"ounces"}, "Butter":{"amount": "3","unit":"nobs"}}', '4', 'chicken_parmesean.jpg', 'true', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, kosher, halal) VALUES ('Cheeseburger', '{"Beef":{"amount": ".25","unit":"pounds"}, "Buns":{"amount": "2","unit":"buns"}, "American Cheddar Cheese":{"amount": "2","unit":"slices"}, "Lettuce":{"amount": "1","unit":"N/A"}, "Pickles":{"amount": "4","unit":"pickles"}, "Mayonaise":{"amount": "1","unit":"tablespoon"}, "Ketchup":{"amount": "1","unit":"tablespoon"}}', '7', 'cheeseburger.png', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData) VALUES ('Pepperoni Pizza', '{"Pizza Dough":{"amount": "1","unit":"pound"}, "Pepperoni":{"amount": "15","unit":"N/A"}, "Mozzarella Cheese":{"amount": "2","unit":"slices"}}', '3', 'pepperoni_pizza.png');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, halal, kosher)VALUES ('Burger', '{"Burger patty":{"amount": ".25","unit":"pounds"}, "Egg":{"amount":"1", "unit": "N/A"}, "Rice": {"amount": "4", "unit":"g"}}','3', 'burger.png', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Spaghetti Carbonara', '{"spaghetti": {"amount": 150, "unit": "g"}, "pancetta": {"amount": 50, "unit": "g"}, "eggs": {"amount": 2, "unit": "eggs"}, "parmesan cheese": {"amount": 10, "unit": "g"}, "black pepper": {"amount": 1, "unit": "tsp"}}', '5', 'carbonara.png', 'false', 'false', 'false', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Vegetable Stir Fry', '{"tofu":{"amount": 350, "unit": "g"}, "carrot": {"amount": 2, "unit": "carrot"}, "broccoli": {"amount": 1, "unit": "broccoli"}, "bell pepper": {"amount": 1, "unit": "bell pepper"}, "garlic": {"amount": 3, "unit": "cloves"}, "soy sauce": {"amount": 3, "unit": "tbs"}, "sesame oil": {"amount": 1, "unit": "tsp"}, "cornstarch": {"amount": 1, "unit": "tbs"}, "water": {"amount": 1, "unit": "cup"}}', '9', 'vegetable_stir_fry.png', 'true', 'true', 'true', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Chicken Alfredo', '{"fettuccine":{"amount": 500, "unit": "g"} , "chicken breast": {"amount": 500, "unit": "g"}, "heavy cream": {"amount": 500, "unit": "ml"}, "garlic": {"amount": 2, "unit": "cloves"}, "butter": {"amount": 1, "unit": "cup"}, "salt": {"amount": 1, "unit": "tsp"}, "black pepper": {"amount": 1, "unit": "tsp"}, "parmesan cheese": {"amount": 100, "unit": "g"}}', '8', 'Chicken_Alfredo.jpg', 'false', 'false', 'true', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Greek Salad', '{"tomatoe":{"amount": 3, "unit": "tomatoe"}, "cucumber": {"amount": 1, "unit": "unit"}, "red onion": {"amount": 1, "unit": "red onion"}, "kalamata olives": {"amount": 100, "unit": "g"}, "feta cheese": {"amount": 100, "unit": "g"}, "olive oil": {"amount": 3, "unit": "tbs"}, "red wine vinegar": {"amount": 1, "unit": "tbs"}, "oregano": {"amount": 1, "unit": "tsp"}, "salt": {"amount": 1, "unit": "tsp"}, "black pepper": {"amount": 1, "unit": "tsp"}}', '10', 'greek_salad.png', 'true', 'true', 'true', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Beef Stroganoff', '{"beef sirloin": {"amount": 500, "unit": "g"}, "onion": {"amount": 1, "unit": "onion"}, "mushrooms": {"amount": 200, "unit": "g"}, "sour cream": {"amount": 200, "unit": "ml"}, "beef broth": {"amount": 250, "unit": "ml"}, "paprika": {"amount": 1, "unit": "tsp"}, "flour": {"amount": 2, "unit": "tbs"}, "butter": {"amount": 2, "unit": "tbs"}, "egg noodles": {"amount": 400, "unit": "g"}}', '4', 'beef_stroganoff.png', 'false', 'false', 'false', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Roasted Vegetables', '{"sweet potato": {"amount": 1, "unit": "sweet potato"}, "carrot": {"amount": 2, "unit": "carrot"}, "red bell pepper": {"amount": 1, "unit": "red bell pepper"}, "zucchini": {"amount": 1, "unit": "zucchini"}, "red onion": {"amount": 1, "unit": "red onion"}, "olive oil": {"amount": 2, "unit": "tbs"}, "garlic": {"amount": 2, "unit": "cloves"}, "rosemary": {"amount": 1, "unit": "tsp"}, "salt": {"amount": 1, "unit": "tsp"}, "black pepper": {"amount": 1, "unit": "tsp"}}', '4', 'roasted_vegetables.jpg', 'true', 'true', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Spicy Szechuan Noodles', '{"spaghetti": {"amount": 250, "unit": "g"}, "ground pork": {"amount": 250, "unit": "g"}, "garlic": {"amount": 4, "unit": "cloves"}, "ginger": {"amount": 2, "unit": "cm"}, "soy sauce": {"amount": 2, "unit": "tbs"}, "chili bean paste": {"amount": 2, "unit": "tbs"}, "chinese black vinegar": {"amount": 1, "unit": "tbs"}, "sugar": {"amount": 1, "unit": "tsp"}, "sesame oil": {"amount": 1, "unit": "tbs"}, "green onion": {"amount": 2, "unit": "green onion"}}', '4', 'Spicy_Szechuan_Noodles.png', 'false', 'true', 'false', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Grilled Salmon', '{"salmon fillet": {"amount": 4, "unit": "salmon fillet"}, "olive oil": {"amount": 2, "unit": "tbs"}, "lemon juice": {"amount": 2, "unit": "tbs"}, "garlic": {"amount": 2, "unit": "cloves"}, "salt": {"amount": 1, "unit": "tsp"}, "black pepper": {"amount": 1, "unit": "tsp"}, "asparagus": {"amount": 1, "unit": "bunch"}}', '4', 'grilled_salmon.png', 'false', 'true', 'true', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Ratatouille', '{"eggplant": {"amount": 1, "unit": "eggplant"}, "zucchini": {"amount": 1, "unit": "zucchini"}, "yellow squash": {"amount": 1, "unit": "yellow squash"}, "red bell pepper": {"amount": 1, "unit": "red bell pepper"}, "onion": {"amount": 1, "unit": "onion"}, "garlic": {"amount": 2, "unit": "cloves"}, "tomato sauce": {"amount": 1, "unit": "cup"}, "olive oil": {"amount": 2, "unit": "tbs"}, "thyme": {"amount": 1, "unit": "tsp"}, "salt": {"amount": 1, "unit": "tsp"}, "black pepper": {"amount": 1, "unit": "tsp"}}', '4', 'ratatouille.png', 'true', 'true', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Pesto Pasta', '{"pasta": {"amount": 250, "unit": "g"}, "basil": {"amount": 2, "unit": "cup"}, "garlic": {"amount": 3, "unit": "cloves"}, "pine nuts": {"amount": 1, "unit": "dl"}, "olive oil": {"amount": 1, "unit": "dl"}, "parmesan cheese": {"amount": 1, "unit": "dl"}, "salt": {"amount": 1, "unit": "tsp"}, "black pepper": {"amount": 1, "unit": "tsp"}}', '4', 'pasta_pesto.png', 'false', 'false', 'false', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Quinoa Salad', '{"quinoa": {"amount": 1, "unit": "cup"}, "cherry tomatoes": {"amount": 1, "unit": "cup"}, "cucumber": {"amount": 1, "unit": "cucumber"}, "red onion": {"amount": 1, "unit": "red onion"}, "avocado": {"amount": 1, "unit": "avocado"}, "feta cheese": {"amount": 50, "unit": "g"}, "olive oil": {"amount": 2, "unit": "tbs"}, "lemon juice": {"amount": 2, "unit": "tbs"}, "honey": {"amount": 1, "unit": "tsp"}, "salt": {"amount": 1, "unit": "tsp"}, "black pepper": {"amount": 1, "unit": "tsp"}}', '4', 'quinoa_salad.jpg', 'true', 'true', 'false', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Shepherds Pie', '{"ground beef": {"amount": 500, "unit": "g"}, "onion": {"amount": 1, "unit": "onion"}, "carrot": {"amount": 2, "unit": "carrot"}, "peas": {"amount": 1, "unit": "cup"}, "corn": {"amount": 1, "unit": "cup"}, "beef broth": {"amount": 1, "unit": "cup"}, "tomato paste": {"amount": 2, "unit": "tbs"}, "butter": {"amount": 2, "unit": "tbs"}, "milk": {"amount": 1, "unit": "dl"}, "potatoes": {"amount": 4, "unit": "potatoes"}}', '4', 'sheperds_pie.png', 'false', 'false', 'false', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Lemon Garlic Shrimp', '{"shrimp": {"amount": 500, "unit": "g"}, "garlic": {"amount": 3, "unit": "cloves"}, "lemon juice": {"amount": 2, "unit": "tbs"}, "butter": {"amount": 2, "unit": "tbs"}, "olive oil": {"amount": 2, "unit": "tbs"}, "salt": {"amount": 1, "unit": "tsp"}, "black pepper": {"amount": 1, "unit": "tsp"}}', '4', 'lemon_garlic_shrimps.jpg', 'false', 'true', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Chicken Fajitas', '{"chicken breast": {"amount": 4, "unit": "chicken breast"}, "bell pepper": {"amount": 2, "unit": "bell pepper"}, "onion": {"amount": 1, "unit": "onion"}, "lime juice": {"amount": 2, "unit": "tbs"}, "olive oil": {"amount": 2, "unit": "tbs"}, "chili powder": {"amount": 1, "unit": "tbs"}, "cumin": {"amount": 1, "unit": "tbs"}, "garlic powder": {"amount": 1, "unit": "tsp"}, "paprika": {"amount": 1, "unit": "tsp"}}', '4', 'chicken_fajitas.png', 'false', 'true', 'false', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Beef and Broccoli Stir Fry', '{"beef sirloin": {"amount": 500, "unit": "g"}, "broccoli": {"amount": 2, "unit": "cup"}, "soy sauce": {"amount": 3, "unit": "tbs"}, "brown sugar": {"amount": 2, "unit": "tbs"}, "cornstarch": {"amount": 1, "unit": "tbs"}, "garlic": {"amount": 2, "unit": "cloves"}, "ginger": {"amount": 1, "unit": "tsp"}, "sesame oil": {"amount": 1, "unit": "tbs"}, "rice": {"amount": 2, "unit": "cup"}}', '4', 'beef_and_broccoli_stir_fry.png', 'false', 'true', 'false', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Hawaiian Pizza', '{"pizza dough": {"amount": 1, "unit": "pizza dough"}, "tomato sauce": {"amount": 1, "unit": "cup"}, "mozzarella cheese": {"amount": 2, "unit": "cup"}, "pineapple": {"amount": 1, "unit": "cup"}, "ham": {"amount": 1, "unit": "cup"}}', '4', 'hawaiian_pizza.png', 'false', 'false', 'false', 'false');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, vegan, healthy, halal, kosher) VALUES ('Black Bean Burgers', '{"black beans": {"amount": 2, "unit": "cup"}, "red bell pepper": {"amount": 1, "unit": "unit"}, "red bell pepper": {"amount": 1, "unit": "onion"}, "garlic": {"amount": 3, "unit": "cloves"}, "cumin": {"amount": 1, "unit": "tsp"}, "chili powder": {"amount": 1, "unit": "tsp"}, "oats": {"amount": 1, "unit": "cup"}, "egg": {"amount": 1, "unit": "egg"}, "hamburger buns": {"amount": 4, "unit": "hamburger buns"}}', '6', 'black_bean_burger.png', 'true', 'true', 'true', 'true');
INSERT INTO recipes(dishname, ingredients, ingredientAm, imageData, halal, kosher) VALUES ('Mushroom Poppers2', '{"Baby Bella Mushrooms":{"amount" : "20", "unit": "mushrooms"}, "Cheese":{"amount": "2", "unit": "cups"}, "Jalepeno": {"amount": "4", "unit": "jalepeno"}}', '3', 'mushroom_poppers.png', 'true', 'true');

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
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Skimmed Milk', '{"Whole Milk", "Fat Free Milk"}', '{"Almond Milk", "Soy Milk", "Oat Milk"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Fat Free Milk', '{"Skimmed Milk", "Whole Milk"}', '{"Almond Milk", "Soy Milk", "Oat Milk"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Almond Milk', '{"Whole Milk", "Skimmed Milk", "Fat Free Milk"}', '{"Soy Milk", "Oat Milk"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Soy Milk', '{"Whole Milk", "Skimmed Milk", "Fat Free Milk"}', '{"Almond Milk", "Oat Milk"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Oat Milk', '{"Whole Milk", "Skimmed Milk", "Fat Free Milk"}', '{"Almond Milk", "Soy Milk"}');

INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Cheese', '{"Low Fat Cheese", "Fat Free Cheese"}', '{"Cashew Cheese", "Daiya Cheese"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Low Fat Cheese', '{"Cheese", "Fat Free Cheese"}', '{"Cashew Cheese", "Daiya Cheese"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Fat Free Cheese', '{"Low Fat Cheese", "Cheese"}', '{"Cashew Cheese", "Daiya Cheese"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Cashew Cheese', '{"Cheese", "Low Fat Cheese", "Fat Free Cheese"}', '{"Daiya Cheese"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Daiya Cheese', '{"Cheese", "Low Fat Cheese", "Fat Free Cheese"}', '{"Cashew Cheese"}');

INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Beef', '{"Bison", "Lamb"}', '{"Tempeh"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Bison', '{"Beef", "Lamb"}', '{"Tempeh"}');
INSERT INTO substitutions(ingredient, tradeFor, veganAlternative) VALUES ('Lamb', '{"Bison", "Beef"}', '{"Tempeh"}');
INSERT INTO substitutions(ingredient, tradeFor) VALUES ('Tempeh', '{"Beef", "Bison", "Lamb"}');

-- INSERT INTO ingredients (protein, dairy, vegetables, spices, grains) VALUES ('{"Chicken", "Pepperoni", "Beef"}', '{"Milk", "Cheddar Cheese", "Mozzarella Cheese"}', '{"Broccoli", "Cucumber", "Carrot"}', '{"Pepper", "Salt", "Garlic Powder"}', '{"Rice", "Wheat", "Oats"}');
insert into ingredients (protein, dairy, vegetables, spices, grains) values ('{"protein", "Chicken", "Pepperoni", "Beef", "Egg", "Chicken Breast", "Beef Rib", "Brisket", "Chicken Thigh", "Chicken Wing", "Bacon", "Ground Beef", "Ground Pork", "Ham", "Porky Belly", "Pork Chop", "Pork Rib", "Lamb", "Lamb Chop", "Salmon", "Cod", "Cod Fillet", "Steak", "Mackerel", "Bass", "Tuna", "Ahi Tuna", "Swordfish", "Sardine", "Nuts", "Almond", "Peanut"}', '{"diary", "Milk", "Cheddar Cheese", "Mozzarella Cheese", "Whole Milk", "2% Milk", "Low-Fat Milk", "Skimmed Milk", "Buttermilk", "Goat Milk", "Butter", "Brie", "Gruyere", "Feta", "Mozzarella", "Manchego", "Gorgonzola", "Swiss", "Gouda", "Smoked Gouda", "Pepperjack", "Blue Cheese", "Ricotta", "Havarti", "Provolone", "Cream Cheese", "Yogurt", "Cream", "Ice Cream", "Heavy Cream", "Sour Cream"}', '{"vegetables", "Broccoli", "Cucumber", "Carrot", "Artichoke", "Asparagus", "Aubergine", "Bean Sprout", "Beet", "Bok Choy", "Arugula", "Cabbage", "Calabrese", "Capers", "Cauliflower", "Squash", "Radish", "Pumpkin", "Edamame", "Eggplant", "Garlic", "Green Beans", "Green Onion", "Red Onion", "Shallots", "Purple Onion", "Yellow Onion", "White Onion", "Onion", "Avocado", "Lettuce", "Iceberg Lettuce", "Jalapeno", "Kale", "Celery", "Lentil", "Mushroom", "Olive", "Parsley", "Pickles", "Pea", "Tomato", "Seaweed", "Leek", "Yam", "Zucchini"}', '{"spices", "Pepper", "Salt", "Garlic Powder", "Bay Leaf", "Basil", "Cumin", "Mustard", "Black Pepper", "Cayenne", "Chives", "Cinnamon", "Curry", "Fennel", "Ginger", "Horseradish", "Lavender", "Licorice", "Paprika", "Saffron", "Wasabi", "Vanilla", "Sage", "Sesame", "Spearmint", "Mint", "Tumeric", "Thyme"}', '{"grains", "Rice", "Wheat", "Oats", "White Rice", "Brown Rice", "Quinoa", "Barley", "Corn Flour", "Flour", "Whole Oats", "Rye", "Bread", "Whole Grain Bread"}');
