const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  database: "teste_facilita_juridico",
  user: "postgres",
  password: "postgres",
  port: 5432,
});

module.exports = {
    pool
}