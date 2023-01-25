DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes(
    recipeid int NOT NULL AUTO_INCREMENT,
    dishname VARCHAR(32),
    ingredients text[]
    );

DROP TABLE IF EXISTS user;

CREATE TABLE users(
    userid int NOT NULL AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL,
    passwrd VARCHAR(32) NOT NULL,
    PRIMARY KEY (userid),
    );

DROP TABLE IF EXISTS meals;

CREATE TABLE meals(
    mealsid int,
    recipeid int,
    day DATETIME,
    FOREIGN KEY meals(recipeid) REFERENCES recipes(recipeid),
    FOREIGN KEY meals(mealsid) REFERENCES user(userid)
)

/*
Every user has an id used to match meals object with same id
Every meal has an id used to match recipe for that meal

to find what someone has on that day of eating:
query for userid date and recipeid,
and you will recieve a meal objects where all 3 are true.
*/


