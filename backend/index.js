const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.port || 3333;

const {
  getClientes,
  createCliente,
  getDeliveryRoute,
} = require("./routes/ClienteRoutes");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get("/", (request, response) => {
  response.json({ message: "Olá" });
});

app.get("/clientes", getClientes);
app.post("/clientes", createCliente);
app.get("/clientes/rota", getDeliveryRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
