CREATE DATABASE app_foodies;
USE app_foodies;

CREATE TABLE foodie(
foodie_id          INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
foodie_name        VARCHAR (40)  NOT NULL, 
foodie_last_name   VARCHAR (60) NOT NULL, 
foodie_email       VARCHAR (100) UNIQUE NOT NULL, 
foodie_password    VARCHAR (255) NOT NULL, 
foodie_description TINYTEXT,   
foodie_img         VARCHAR(255),
foodie_is_deleted  BOOLEAN NOT NULL DEFAULT 0
);

SELECT * FROM foodie;

CREATE TABLE dish(
dish_id              BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
dish_name            VARCHAR (100) NOT NULL,
dish_review          TINYTEXT NOT NULL,
dish_score           VARCHAR (5) NOT NULL, 
dish_ingredients     TEXT,
dish_restaurant_name VARCHAR (100) NOT NULL,
dish_restaurant_city VARCHAR (50) NOT NULL, 
dish_img             VARCHAR (255),
dish_is_deleted      BOOLEAN NOT NULL DEFAULT 0,
foodie_id            INT UNSIGNED NOT NULL,

CONSTRAINT fk_foodie_id FOREIGN KEY (foodie_id)
    REFERENCES foodie (foodie_id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM dish;

