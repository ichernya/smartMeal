DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes(
    recipeid SERIAL UNIQUE NOT NULL,
    dishname VARCHAR(32),
    ingredients text[],
    ingredientAm integer,
    imageData text,
    vegan boolean DEFAULT FALSE,
    halal boolean DEFAULT FALSE,
    healthy boolean DEFAULT FALSE,
    kosher boolean DEFAULT FALSE
    );

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    userid SERIAL UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    passwrd VARCHAR(255) NOT NULL,
    PRIMARY KEY (userid)
    );

DROP TABLE IF EXISTS meals;

CREATE TABLE meals(
    mealsid int,
    recipeid int,
    dayof date NOT NULL,
    FOREIGN KEY (recipeid) REFERENCES recipes(recipeid),
    FOREIGN KEY (mealsid) REFERENCES users(userid)
);

DROP TABLE IF EXISTS substitutions;

CREATE TABLE substitutions (
    ingredient text,
    tradeFor text [],
    veganAlternative text []
);

/*
Every user has an id used to match meals object with same id
Every meal has an id used to match recipe for that meal

to find what someone has on that day of eating:
query for userid date and recipeid,
and you will recieve a meal objects where all 3 are true.
*/


