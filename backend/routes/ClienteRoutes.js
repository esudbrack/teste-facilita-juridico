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
  const { nome, email, telefone, x, y } = request.body;

  if (!nome || !email || !telefone || !x || !y) {
    return response
      .status(400)
      .json({
        message:
          "É necessário enviar todos os campos para efetuar o cadastro de clientes.",
      });
  }

  try {
    pool.query(
      "INSERT INTO clientes (nome, email, telefone, x, y) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nome, email, telefone, x, y],
      (error, results) => {
        if (error) {
          if (error.code == "22P02") {
            return response
              .status(400)
              .send({ message: "Os valores de x e y devem ser numéricos." });
          }
          return response
            .status(500)
            .json({ error, message: "Internal server error." });
        }
        return response.status(200).json({ cliente: results.rows[0], message: "Cliente cadastrado com sucesso." });
      }
    );
  } catch (error) {
    response.status(500).json({ error, message: "Internal server error." });
  }
};

const getDeliveryRoute = async (request, response) => {
  const query = `SELECT clientes.id, clientes.nome, clientes.x, clientes.y, tsp.cost AS distancia, tsp.agg_cost as distancia_total FROM (SELECT * FROM pgr_TSPeuclidean($$ 
      SELECT 0 AS id, 0.0 AS x, 0.0 AS y
      UNION
      SELECT id, x, y FROM clientes 
    $$, 0)) as tsp
    JOIN clientes ON clientes.id = tsp.node`;

  let result = await pool.query(query);

  response.status(200).json({ clientesRota: result.rows });
};

module.exports = {
  getClientes,
  createCliente,
  getDeliveryRoute,
};
