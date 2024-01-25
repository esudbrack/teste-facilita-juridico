require('dotenv').config()

const Pool = require("pg").Pool;

const { DB_HOST, DB_NAME, DB_USER, DB_PWD, DB_PORT } = process.env;

const pool = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PWD,
  port: DB_PORT || 5432,
});

module.exports = {
    pool
}