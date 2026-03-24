/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   associations.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   18.03.2026
version             :   0.2

-----------------------------------------------------------------------------------------------------------------------
*/
const Order = require('./order.model');
const Dish = require('./dish.model');
const OrderDish = require('./orderDish.model');

function setupAssociations() {
    Order.belongsToMany(Dish, { through: OrderDish, foreignKey: 'orderId', otherKey: 'dishId' });
    Dish.belongsToMany(Order, { through: OrderDish, foreignKey: 'dishId', otherKey: 'orderId' });
}

module.exports = setupAssociations;