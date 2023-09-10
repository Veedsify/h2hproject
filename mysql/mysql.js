const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_PORT,
    DB_NAME
} = process.env
const util = require('util');
const mysql = require('mysql');


// CONNECTION INSTANCE
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT
});

const dbQuery = util.promisify(pool.query).bind(pool);


module.exports = { dbQuery }