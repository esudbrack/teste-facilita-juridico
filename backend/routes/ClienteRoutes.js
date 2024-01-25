const { pool } = require("../database");

const getClientes = (request, response) => {
  pool.query("SELECT * FROM clientes", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
    getClientes
}