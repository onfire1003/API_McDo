"use strict";

import mysql from "mysql2/promise";

let con;

try {
    con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "app_McDo",
    });
} catch (err) {
    console.error("failed to connect to database", err);
    process.exit(1);
}

console.log("Connected to MySQL successfully");