/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   dishIngredient.model.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   17.03.2026
modification date   :   17.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------

*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Dish = require('./dish.model');
const Ingredient = require('./ingredient.model');

const DishIngredient = sequelize.define('DishIngredient', {
    dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Dish,
            key: 'id'
        }
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ingredient,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'dish_ingredients',
    timestamps: false
});

Dish.belongsToMany(Ingredient, { through: DishIngredient, foreignKey: 'dishId' });
Ingredient.belongsToMany(Dish, { through: DishIngredient, foreignKey: 'ingredientId' });

module.exports = DishIngredient;