/*
Author : Joel Cunha Faria
Date : 20.10.2025
*/

DROP DATABASE if exists app_Macdo ;
CREATE DATABASE app_Macdo;

USE app_Macdo;

DROP TABLE if exists Menus ;
DROP TABLE if exists Orders ;
DROP TABLE if exists Dishes ;
DROP TABLE if exists Ingredients ;
DROP TABLE if exists Menus_has_Dishes ;
DROP TABLE if exists Orders_has_Menus ;
DROP TABLE if exists Orders_has_Dishes ;
DROP TABLE if exists Dishes_has_Ingredients ;


CREATE TABLE Menus (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          email VARCHAR(255) NOT NULL
);

INSERT INTO contacts (name, email) VALUES
                                       ('John Doe', 'johndoe@gmail.com'),
                                       ('Jane Smith', 'janesmith@gmail.com');