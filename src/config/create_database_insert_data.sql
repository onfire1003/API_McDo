/*
-----------------------------------------------------------------------------------------------------------------------
Nom du fichier      :   create_database_insert_data.sql
Auteur              :   Joel Cunha Faria
Collaborateurs      :   Jason Edmonds, Samuel Theytaz
Date de création    :   04.03.2026
Date de modification:   11.03.2026
Version             :   0.1
-----------------------------------------------------------------------------------------------------------------------
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

-- Créations des tables
CREATE TABLE Menus (
                    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    Name VARCHAR(30) NOT NULL,
                    Description VARCHAR(300) NOT NULL,
                    Size VARCHAR(30) NOT NULL
);

CREATE TABLE Orders (
                    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    Number VARCHAR(30) NOT NULL UNIQUE,
                    Price FLOAT NOT NULL,
                    Status VARCHAR(30) NOT NULL
);

CREATE TABLE Dishes (
                    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    Name VARCHAR(30) NOT NULL,
                    Description VARCHAR(300) NOT NULL,
                    Price Float NOT NULL,
                    Availability BOOLEAN NOT NULL DEFAULT FALSE,
                    Size VARCHAR(30) NOT NUL
);

CREATE TABLE Ingredients (
                    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    Name VARCHAR(30) NOT NULL,
                    Description VARCHAR(300) NOT NULL,
                    Availability BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Menus_has_Dishes (
                    Id INT AUTO_INCREMENT PRIMARY KEY,
                    Menu_Id INT NOT NULL,
                    Dish_Id INT NOT NULL,
                    FOREIGN KEY (Menu_Id) REFERENCES Menus(Id) ON DELETE CASCADE,
                    FOREIGN KEY (Dish_Id) REFERENCES Dishes(Id) ON DELETE CASCADE,
                    UNIQUE (Menu_Id, Dish_Id)  -- pour éviter les doublons
);

CREATE TABLE Orders_has_Menus (
                    Id INT AUTO_INCREMENT PRIMARY KEY,
                    Order_Id INT NOT NULL,
                    Menu_Id INT NOT NULL,
                    Quantity INT NOT NULL DEFAULT 1,
                    FOREIGN KEY (Order_Id) REFERENCES Orders(Id) ON DELETE CASCADE,
                    FOREIGN KEY (Menu_Id) REFERENCES Menus(Id) ON DELETE CASCADE,
                    UNIQUE (Order_Id, Menu_Id)  -- pour éviter les doublons
);

CREATE TABLE Orders_has_Dishes (
                    Id INT AUTO_INCREMENT PRIMARY KEY,
                    Order_Id INT NOT NULL,
                    Dish_Id INT NOT NULL,
                    Quantity INT NOT NULL DEFAULT 1,
                    FOREIGN KEY (Order_Id) REFERENCES Orders(Id) ON DELETE CASCADE,
                    FOREIGN KEY (Dish_Id) REFERENCES Dishes(Id) ON DELETE CASCADE,
                    UNIQUE (Order_Id, Dish_Id)  -- pour éviter les doublons
);

CREATE TABLE Dishes_has_Ingredients (
                    Id INT AUTO_INCREMENT PRIMARY KEY,
                    Dish_Id INT NOT NULL,
                    Ingredients_Id INT NOT NULL,
                    FOREIGN KEY (Dish_Id) REFERENCES Dishes(Id) ON DELETE CASCADE,
                    FOREIGN KEY (Ingredients_Id) REFERENCES Ingredients(Id) ON DELETE CASCADE,
                    UNIQUE (Dish_Id, Ingredients_Id)  -- pour éviter les doublons
);




INSERT INTO Menus (Name, Description, Size) VALUES
                                                ('Menu Big Mac', 'Inclut un Big Mac, frites et boisson', 'Petit'),
                                                ('Menu Big Mac', 'Inclut un Big Mac, frites et boisson', 'Moyen'),
                                                ('Menu Double Big Mac', 'Inclut un Double Big Mac, frites et boisson', 'Petit'),
                                                ('Menu Double Big Mac', 'Inclut un Double Big Mac, frites et boisson', 'Moyen'),
                                                ('Menu Cheeseburger Royal', 'Inclut un Cheeseburger Royal, frites et boisson', 'Petit'),
                                                ('Menu Cheeseburger Royal', 'Inclut un Cheeseburger Royal, frites et boisson', 'Moyen'),
                                                ('Menu McChicken', 'Inclut un McChicken, frites et boisson', 'Petit'),
                                                ('Menu McChicken', 'Inclut un McChicken, frites et boisson', 'Moyen'),
                                                ('Menu Big Tasty Single', 'Inclut un Big Tasty Single, frites et boisson', 'Petit'),
                                                ('Menu Big Tasty Single', 'Inclut un Big Tasty Single, frites et boisson', 'Moyen'),
                                                ('Menu Big Tasty Double', 'Inclut un Big Tasty Double, frites et boisson', 'Petit'),
                                                ('Menu Big Tasty Double', 'Inclut un Big Tasty Double, frites et boisson', 'Moyen'),
                                                ('Menu Filet-O-Fish', 'Inclut un Filet-O-Fish, frites et boisson', 'Petit'),
                                                ('Menu Filet-O-Fish', 'Inclut un Filet-O-Fish, frites et boisson', 'Moyen'),
                                                ('Menu McNuggets 6 pcs', 'Inclut 6 McNuggets, frites et boisson', 'Petit'),
                                                ('Menu McNuggets 6 pcs', 'Inclut 6 McNuggets, frites et boisson', 'Moyen'),
                                                ('Menu McNuggets 9 pcs', 'Inclut 9 McNuggets, frites et boisson', 'Petit'),
                                                ('Menu McNuggets 9 pcs', 'Inclut 9 McNuggets, frites et boisson', 'Moyen');

-- Burgers / plats principaux
INSERT INTO Dishes (Name, Description, Price, Availability, Size) VALUES
                                                                      ('Big Mac', 'Burger emblématique avec double steak, sauce spéciale, salade, fromage, cornichons, oignons', 7.5, TRUE, 'Standard'),
                                                                      ('Double Big Mac', 'Double Big Mac avec double steak, sauce spéciale, salade, fromage, cornichons, oignons', 9.0, TRUE, 'Standard'),
                                                                      ('Cheeseburger Royal', 'Burger avec steak, fromage, ketchup, oignons', 6.5, TRUE, 'Standard'),
                                                                      ('McChicken', 'Burger au poulet pané avec salade et mayonnaise', 7.0, TRUE, 'Standard'),
                                                                      ('Big Tasty Single', 'Burger au bœuf, sauce Big Tasty, fromage, salade, tomate', 8.0, TRUE, 'Standard'),
                                                                      ('Big Tasty Double', 'Double Big Tasty avec double steak, sauce Big Tasty, fromage, salade, tomate', 10.0, TRUE, 'Standard'),
                                                                      ('Filet-O-Fish', 'Filet de poisson pané avec sauce tartare et fromage', 7.0, TRUE, 'Standard'),
                                                                      ('McNuggets 6 pcs', '6 Chicken McNuggets croustillants', 6.5, TRUE, 'Standard'),
                                                                      ('McNuggets 9 pcs', '9 Chicken McNuggets croustillants', 9.0, TRUE, 'Standard'),

-- Frites
                                                                      ('Frites Mini', 'Frites croustillantes mini', 2,5, TRUE, 'Mini'),
                                                                      ('Frites Petit', 'Frites croustillantes petites', 3.0, TRUE, 'Petit'),
                                                                      ('Frites Moyen', 'Frites croustillantes moyennes', 3.5, TRUE, 'Moyen'),

-- Boissons
                                                                      ('Coca-Cola Mini', 'Boisson gazeuse', 2, TRUE, 'Mini'),
                                                                      ('Coca-Cola Petit', 'Boisson gazeuse', 2.5, TRUE, 'Petit'),
                                                                      ('Coca-Cola Moyen', 'Boisson gazeuse', 3.0, TRUE, 'Moyen');

INSERT INTO Ingredients (Name, Description, Availability) VALUES
                                                              ('Pain burger', 'Pain utilisé pour les burgers', TRUE),
                                                              ('Steak de boeuf', 'Steak haché de boeuf', TRUE),
                                                              ('Poulet pané', 'Filet de poulet pané', TRUE),
                                                              ('Fromage', 'Tranche de fromage', TRUE),
                                                              ('Salade', 'Feuilles de salade', TRUE),
                                                              ('Tomate', 'Tranche de tomate', TRUE),
                                                              ('Oignons', 'Oignons frais', TRUE),
                                                              ('Cornichons', 'Cornichons tranchés', TRUE),
                                                              ('Sauce spéciale', 'Sauce signature McDonald''s', TRUE),
                                                              ('Mayonnaise', 'Sauce mayonnaise', TRUE),
                                                              ('Sauce Big Tasty', 'Sauce Big Tasty', TRUE),
                                                              ('Sauce tartare', 'Sauce tartare pour poisson', TRUE),
                                                              ('Frites', 'Pommes de terre frites', TRUE),
                                                              ('Coca-Cola', 'Boisson gazeuse', TRUE);


INSERT INTO Dishes_has_Ingredients (Dish_Id, Ingredients_Id) VALUES
                                                                 -- Big Mac
                                                                (1, 1), -- Pain
                                                                (1, 2), -- Steak
                                                                (1, 4), -- Fromage
                                                                (1, 5), -- Salade
                                                                (1, 8), -- Cornichons
                                                                (1, 9), -- Sauce spéciale
                                                                (1, 7), -- Oignons

                                                                -- McChicken

                                                                (4, 1), -- Pain
                                                                (4, 3), -- Poulet pané
                                                                (4, 5), -- Salade
                                                                (4, 10), -- Mayonnaise

                                                                -- Frites Moyen

                                                                (10, 12), -- Frites

                                                                -- Coca-Cola Moyen

                                                                (13, 13), -- Coca-Cola

-- Orders
INSERT INTO Orders (Number, Price, Status) VALUES
    ('CMD001', 15.0, 'En préparation'),
    ('CMD002', 20.0, 'Livré');

-- Lier menus à commandes
INSERT INTO Orders_has_Menus (Order_Id, Menu_Id, Quantity) VALUES
                                                               (1, 1, 1), -- Menu Big Mac pour CMD001
                                                               (1, 5, 1), -- Menu McChicken pour CMD001
                                                               (2, 3, 2); -- Menu Double Big Mac pour CMD002

-- Lier plats individuels (facultatif si tu veux détailler)
INSERT INTO Orders_has_Dishes (Order_Id, Dish_Id, Quantity) VALUES
                                                                (1, 1, 1), -- Big Mac
                                                                (1, 4, 1), -- McChicken
                                                                (2, 2, 2); -- Double Big Mac