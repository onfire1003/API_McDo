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