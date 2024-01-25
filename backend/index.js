const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const { getClientes } =  require("./routes/ClienteRoutes");

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

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
