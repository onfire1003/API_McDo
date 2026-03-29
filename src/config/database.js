/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   auth.controller.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   04.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/
const { Sequelize } = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(
    env.dbName,
    env.dbUser,
    env.dbPassword,
    {
        host: env.dbHost,
        dialect: 'mysql'
    }
);

sequelize.authenticate()
    .then(() => console.log("Connexion Sequelize réussie"))
    .catch(err => console.error("Erreur connexion :", err));

module.exports = sequelize;