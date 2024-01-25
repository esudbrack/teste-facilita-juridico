const { pool } = require("../database");

const getClientes = (request, response) => {
  pool.query("SELECT * FROM clientes", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createCliente = (request, response) => {
  const { nome, email, telefone, x, y } = request.body

  pool.query('INSERT INTO clientes (nome, email, telefone, x, y) VALUES ($1, $2, $3, $4, $5)', [nome, email, telefone, x, y], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getDeliveryRoute = async (request, response) => {
  const query = `SELECT clientes.id, clientes.nome, tsp.cost AS distancia, tsp.agg_cost as distancia_total FROM (SELECT * FROM pgr_TSPeuclidean($$ 
      SELECT 0 AS id, 0.0 AS x, 0.0 AS y
      UNION
      SELECT id, x, y FROM clientes 
    $$, 0)) as tsp
    JOIN clientes ON clientes.id = tsp.node`

  let result = await pool.query(query);

  response.status(200).json(result.rows);
}

module.exports = {
    getClientes,
    createCliente,
    getDeliveryRoute
}