/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   associations.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/
const Order = require('./order.model');
const Dish = require('./dish.model');
const Menu = require('./menu.model');
const Ingredient = require('./Ingredient.model');

const OrderDish = require('./orderDish.model');
const OrderMenu = require('./orderMenu.model');
const DishIngredient = require('./dishIngredient.model');
const MenuDish = require('./menuDish.model');

function setupAssociations() {
    Order.belongsToMany(Dish, { through: OrderDish, foreignKey: 'orderId', otherKey: 'dishId' });
    Dish.belongsToMany(Order, { through: OrderDish, foreignKey: 'dishId', otherKey: 'orderId' });

    Order.belongsToMany(Menu, { through: OrderMenu, foreignKey: 'orderId', otherKey: 'menuId' });
    Menu.belongsToMany(Order, { through: OrderMenu, foreignKey: 'menuId', otherKey: 'orderId'});

    Dish.belongsToMany(Ingredient, { through: DishIngredient, foreignKey: 'dishId', otherKey: 'ingredientId' });
    Ingredient.belongsToMany(Dish, { through: DishIngredient, foreignKey: 'ingredientId', otherKey: 'dishId'});

    Menu.belongsToMany(Dish, { through: MenuDish, foreignKey: 'menuId', otherKey: 'dishId' });
    Dish.belongsToMany(Menu, { through: MenuDish, foreignKey: 'dishId', otherKey: 'menuId' });
}

module.exports = setupAssociations;