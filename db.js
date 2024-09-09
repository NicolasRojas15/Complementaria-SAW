const mysql2 = require('mysql2');
require('dotenv').config();


const pool = mysql2.createPool({
    host: process.env.localhost,
    user: process.env.root,
    password: process.env.password,
    database: process.env.api_datanase
});

module.exports = pool.promise();