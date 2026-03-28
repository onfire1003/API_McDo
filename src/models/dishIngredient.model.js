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
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'dish_id',
        references: {
            model: Dish,
            key: 'id'
        }
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ingredient_id',
        references: {
            model: Ingredient,
            key: 'id'
        }
    }
}, {
    tableName: 'dishes_has_ingredients',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['dish_id', 'ingredient_id'],
        }
    ]
});

Dish.belongsToMany(Ingredient, { through: DishIngredient, foreignKey: 'dishId' });
Ingredient.belongsToMany(Dish, { through: DishIngredient, foreignKey: 'ingredientId' });

module.exports = DishIngredient;