const { pool } = require("./database");

const clientes = [
  {
    nome: "Dewey Ankunding",
    email: "Coralie.Lesch@hotmail.com",
    telefone: "+552799717-2201",
    x: 38.54,
    y: 19.84,
    id: "1",
  },
  {
    nome: "Angelo Ortiz",
    email: "Javonte_Rodriguez7@hotmail.com",
    telefone: "+552799717-2202",
    x: 77.41,
    y: 40.39,
    id: "2",
  },
  {
    nome: "Hattie Kirlin",
    email: "Katlynn92@hotmail.com",
    telefone: "+552799717-2203",
    x: 74.3,
    y: 4.28,
    id: "3",
  },
  {
    nome: "Dana Witting",
    email: "Lilliana.Paucek@gmail.com",
    telefone: "+552799717-2204",
    x: 46.69,
    y: 6.4,
    id: "4",
  },
  {
    nome: "Wendell Goyette PhD",
    email: "Karson_Sanford3@gmail.com",
    telefone: "+552799717-2205",
    x: 27.27,
    y: 5.74,
    id: "5",
  },
  {
    nome: "Roderick King",
    email: "Jakob.Gibson@gmail.com",
    telefone: "+552799717-2206",
    x: 13.68,
    y: 36.41,
    id: "6",
  },
  {
    nome: "Christie Miller",
    email: "Barton95@gmail.com",
    telefone: "+552799717-2207",
    x: 92.25,
    y: 27.86,
    id: "7",
  },
  {
    nome: "Morris Reichel",
    email: "Lou.Greenfelder56@hotmail.com",
    telefone: "+552799717-2208",
    x: 6.91,
    y: 7.38,
    id: "8",
  },
  {
    nome: "Marcus Gibson II",
    email: "Augustus_Kerluke73@hotmail.com",
    telefone: "+552799717-2209",
    x: 1.05,
    y: 1.6,
    id: "9",
  },
  {
    nome: "Terrence Wolf",
    email: "Lizzie_Hansen@gmail.com",
    telefone: "+552799717-2210",
    x: 4.08,
    y: 2.26,
    id: "10",
  }
];

const columns = "id, nome, email, telefone, x, y";
const values = clientes
  .map(
    (cliente) =>
      `(${cliente.id}, '${cliente.nome}', '${cliente.email}', '${cliente.telefone}', ${cliente.x}, ${cliente.y})`
  )
  .join(",");

let clientesInsertManyQuery = `INSERT into clientes (${columns}) VALUES ${values};`;

pool.query(clientesInsertManyQuery, (error, results) => {
  if (error) {
    throw error;
  }
  console.log(results.rows);
});
