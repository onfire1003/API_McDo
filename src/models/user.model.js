/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   user.model.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'cook', 'waiter', 'customer'),
        defaultValue: 'customer'
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;