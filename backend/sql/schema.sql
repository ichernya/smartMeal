DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes(
    dishname VARCHAR(32),
    ingredients text[]
    );

DROP TABLE IF EXISTS user;

CREATE TABLE users(
    userid int NOT NULL AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL,
    passwrd VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
    );


