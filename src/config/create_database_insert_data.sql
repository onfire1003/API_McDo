/*

-----------------------------------------------------------------------------------------------------------------------

nom du fichier      :   create_database_insert_data.sql

auteur              :   Joel Cunha Faria

collaborateurs      :   Jason Edmonds, Samuel Theytaz

date de création    :   04.03.2026

date de modification:   12.03.2026

version             :   1.1

-----------------------------------------------------------------------------------------------------------------------

*/

DROP
    DATABASE IF EXISTS app_macdo;

CREATE
    DATABASE app_macdo;

USE
    app_macdo;

DROP TABLE IF EXISTS dishes_has_ingredients;

DROP TABLE IF EXISTS orders_has_dishes;

DROP TABLE IF EXISTS orders_has_menus;

DROP TABLE IF EXISTS menus_has_dishes;

DROP TABLE IF EXISTS ingredients;

DROP TABLE IF EXISTS dishes;

DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS menus;

-- -----------------------------------------------------

-- Tables principales

-- -----------------------------------------------------

CREATE TABLE menus
(

    id          INT AUTO_INCREMENT NOT NULL PRIMARY KEY,

    name        VARCHAR(30)        NOT NULL,

    description VARCHAR(300)       NOT NULL,

    size        VARCHAR(30)        NOT NULL

);

CREATE TABLE orders
(

    id     INT AUTO_INCREMENT                                     NOT NULL PRIMARY KEY,

    number VARCHAR(30)                                            NOT NULL UNIQUE,

    price  DECIMAL(10, 2)                                         NOT NULL,

    status ENUM ('en_attente', 'en_preparation', 'pret', 'livre') NOT NULL DEFAULT 'en_attente'

);

CREATE TABLE dishes
(

    id           INT AUTO_INCREMENT NOT NULL PRIMARY KEY,

    name         VARCHAR(30)        NOT NULL,

    description  VARCHAR(300)       NOT NULL,

    price        DECIMAL(10, 2)     NOT NULL,

    availability BOOLEAN            NOT NULL DEFAULT FALSE,

    size         VARCHAR(30)        NOT NULL

);

CREATE TABLE ingredients
(

    id           INT AUTO_INCREMENT NOT NULL PRIMARY KEY,

    name         VARCHAR(30)        NOT NULL,

    description  VARCHAR(300)       NOT NULL,

    availability BOOLEAN            NOT NULL DEFAULT FALSE

);

-- -----------------------------------------------------

-- Tables de liaison

-- -----------------------------------------------------

CREATE TABLE menus_has_dishes
(

    id      INT AUTO_INCREMENT PRIMARY KEY,

    menu_id INT NOT NULL,

    dish_id INT NOT NULL,

    FOREIGN KEY (menu_id) REFERENCES menus (id) ON DELETE CASCADE,

    FOREIGN KEY (dish_id) REFERENCES dishes (id) ON DELETE CASCADE,

    UNIQUE (menu_id, dish_id)

);

CREATE TABLE orders_has_menus
(

    id       INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,

    menu_id  INT NOT NULL,

    quantity INT NOT NULL DEFAULT 1,

    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,

    FOREIGN KEY (menu_id) REFERENCES menus (id) ON DELETE CASCADE,

    UNIQUE (order_id, menu_id)

);

CREATE TABLE orders_has_dishes
(

    id       INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,

    dish_id  INT NOT NULL,

    quantity INT NOT NULL DEFAULT 1,

    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,

    FOREIGN KEY (dish_id) REFERENCES dishes (id) ON DELETE CASCADE,

    UNIQUE (order_id, dish_id)

);

CREATE TABLE dishes_has_ingredients
(

    id            INT AUTO_INCREMENT PRIMARY KEY,

    dish_id       INT NOT NULL,

    ingredient_id INT NOT NULL,

    FOREIGN KEY (dish_id) REFERENCES dishes (id) ON DELETE CASCADE,

    FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE,

    UNIQUE (dish_id, ingredient_id)

);

-- -----------------------------------------------------

-- Données menus

-- -----------------------------------------------------

INSERT INTO menus (name, description, size)
VALUES ('Menu Big Mac', 'Inclut un Big Mac, frites et boisson', 'Petit'),

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

-- -----------------------------------------------------

-- Données plats

-- -----------------------------------------------------

INSERT INTO dishes (name, description, price, availability, size)
VALUES ('Big Mac', 'Burger emblématique avec double steak, sauce spéciale, salade, fromage, cornichons, oignons', 7.50,
        TRUE, 'Standard'),

       ('Double Big Mac', 'Double Big Mac avec double steak, sauce spéciale, salade, fromage, cornichons, oignons',
        9.00, TRUE, 'Standard'),

       ('Cheeseburger Royal', 'Burger avec steak, fromage, ketchup, oignons', 6.50, TRUE, 'Standard'),

       ('McChicken', 'Burger au poulet pané avec salade et mayonnaise', 7.00, TRUE, 'Standard'),

       ('Big Tasty Single', 'Burger au bœuf, sauce Big Tasty, fromage, salade, tomate', 8.00, TRUE, 'Standard'),

       ('Big Tasty Double', 'Double Big Tasty avec double steak, sauce Big Tasty, fromage, salade, tomate', 10.00, TRUE,
        'Standard'),

       ('Filet-O-Fish', 'Filet de poisson pané avec sauce tartare et fromage', 7.00, TRUE, 'Standard'),

       ('McNuggets 6 pcs', '6 Chicken McNuggets croustillants', 6.50, TRUE, 'Standard'),

       ('McNuggets 9 pcs', '9 Chicken McNuggets croustillants', 9.00, TRUE, 'Standard'),

       ('Frites Mini', 'Frites croustillantes mini', 2.50, TRUE, 'Mini'),

       ('Frites Petit', 'Frites croustillantes petites', 3.00, TRUE, 'Petit'),

       ('Frites Moyen', 'Frites croustillantes moyennes', 3.50, TRUE, 'Moyen'),

       ('Coca-Cola Mini', 'Boisson gazeuse', 2.00, TRUE, 'Mini'),

       ('Coca-Cola Petit', 'Boisson gazeuse', 2.50, TRUE, 'Petit'),

       ('Coca-Cola Moyen', 'Boisson gazeuse', 3.00, TRUE, 'Moyen');

-- -----------------------------------------------------

-- Données ingrédients

-- -----------------------------------------------------

INSERT INTO ingredients (name, description, availability)
VALUES ('Pain burger', 'Pain utilisé pour les burgers', TRUE),

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

-- -----------------------------------------------------

-- Relations plats <-> ingrédients

-- -----------------------------------------------------

INSERT INTO dishes_has_ingredients (dish_id, ingredient_id)
VALUES (1, 1),

       (1, 2),

       (1, 4),

       (1, 5),

       (1, 7),

       (1, 8),

       (1, 9),

       (2, 1),

       (2, 2),

       (2, 4),

       (2, 5),

       (2, 7),

       (2, 8),

       (2, 9),

       (3, 1),

       (3, 2),

       (3, 4),

       (3, 7),

       (4, 1),

       (4, 3),

       (4, 5),

       (4, 10),

       (5, 1),

       (5, 2),

       (5, 4),

       (5, 5),

       (5, 6),

       (5, 11),

       (6, 1),

       (6, 2),

       (6, 4),

       (6, 5),

       (6, 6),

       (6, 11),

       (7, 1),

       (7, 4),

       (7, 12),

       (10, 13),

       (11, 13),

       (12, 13),

       (13, 14),

       (14, 14),

       (15, 14);

-- -----------------------------------------------------

-- Relations menus <-> plats

-- -----------------------------------------------------

INSERT INTO menus_has_dishes (menu_id, dish_id)
VALUES (1, 1),
       (1, 10),
       (1, 11),
       (1, 12),
       (1, 13),
       (1, 14),
       (1, 15),

       (2, 1),
       (2, 10),
       (2, 11),
       (2, 12),
       (2, 13),
       (2, 14),
       (2, 15),

       (3, 2),
       (3, 10),
       (3, 11),
       (3, 12),
       (3, 13),
       (3, 14),
       (3, 15),

       (4, 2),
       (4, 10),
       (4, 11),
       (4, 12),
       (4, 13),
       (4, 14),
       (4, 15),

       (5, 3),
       (5, 10),
       (5, 11),
       (5, 12),
       (5, 13),
       (5, 14),
       (5, 15),

       (6, 3),
       (6, 10),
       (6, 11),
       (6, 12),
       (6, 13),
       (6, 14),
       (6, 15),

       (7, 4),
       (7, 10),
       (7, 11),
       (7, 12),
       (7, 13),
       (7, 14),
       (7, 15),

       (8, 4),
       (8, 10),
       (8, 11),
       (8, 12),
       (8, 13),
       (8, 14),
       (8, 15),

       (9, 5),
       (9, 10),
       (9, 11),
       (9, 12),
       (9, 13),
       (9, 14),
       (9, 15),

       (10, 5),
       (10, 10),
       (10, 11),
       (10, 12),
       (10, 13),
       (10, 14),
       (10, 15),

       (11, 6),
       (11, 10),
       (11, 11),
       (11, 12),
       (11, 13),
       (11, 14),
       (11, 15),

       (12, 6),
       (12, 10),
       (12, 11),
       (12, 12),
       (12, 13),
       (12, 14),
       (12, 15),

       (13, 7),
       (13, 10),
       (13, 11),
       (13, 12),
       (13, 13),
       (13, 14),
       (13, 15),

       (14, 7),
       (14, 10),
       (14, 11),
       (14, 12),
       (14, 13),
       (14, 14),
       (14, 15),

       (15, 8),
       (15, 10),
       (15, 11),
       (15, 12),
       (15, 13),
       (15, 14),
       (15, 15),

       (16, 8),
       (16, 10),
       (16, 11),
       (16, 12),
       (16, 13),
       (16, 14),
       (16, 15),

       (17, 9),
       (17, 10),
       (17, 11),
       (17, 12),
       (17, 13),
       (17, 14),
       (17, 15),

       (18, 9),
       (18, 10),
       (18, 11),
       (18, 12),
       (18, 13),
       (18, 14),
       (18, 15);

-- -----------------------------------------------------

-- Données commandes

-- -----------------------------------------------------

INSERT INTO orders (number, price, status)
VALUES ('CMD001', 15.00, 'en_preparation'),

       ('CMD002', 20.00, 'livre');

-- -----------------------------------------------------

-- Relations commandes <-> menus

-- -----------------------------------------------------

INSERT INTO orders_has_menus (order_id, menu_id, quantity)
VALUES (1, 1, 1),

       (1, 7, 1),

       (2, 3, 2);

-- -----------------------------------------------------

-- Relations commandes <-> plats

-- -----------------------------------------------------

INSERT INTO orders_has_dishes (order_id, dish_id, quantity)
VALUES (1, 1, 1),

       (1, 4, 1),

       (2, 2, 2);
