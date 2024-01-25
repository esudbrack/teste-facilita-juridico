const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const { getClientes, createCliente, getDeliveryRoute } =  require("./routes/ClienteRoutes");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ message: "Olá" });
});

app.get("/clientes", getClientes);
app.post("/clientes", createCliente)
app.get('/clientes/rota', getDeliveryRoute)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
