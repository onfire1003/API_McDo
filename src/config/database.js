const mysql = require('mysql2/promise');
const env = require('./env');
const db = mysql.createPool({
    host: env.dbHost,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    waitForConnections: true,
    connectionLimit: 10
});
db.query("SELECT 1")
    .then(function () {
        console.log("Connexion MySQL réussie");
    })
    .catch(function (error) {
        console.error("Erreur connexion MySQL :", error);
    });
module.exports = db;