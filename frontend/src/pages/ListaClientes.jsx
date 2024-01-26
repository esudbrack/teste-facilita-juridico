import * as React from "react";
import { useEffect, useState } from "react";

import {
  Backdrop,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import api from "../services/api";

export default function ListaClientes() {
  let [clientes, setClientes] = useState([]);
  let [loading, setLoading] = useState(true);

  function fetchClientes() {
    api
      .get("/clientes")
      .then((response) => {
        console.log(response.data);
        setClientes(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <Container>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Telefone</TableCell>
              <TableCell align="right">X</TableCell>
              <TableCell align="right">Y</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow
                key={cliente.nome}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {cliente.nome}
                </TableCell>
                <TableCell align="right">{cliente.email}</TableCell>
                <TableCell align="right">{cliente.telefone}</TableCell>
                <TableCell align="right">{cliente.x}</TableCell>
                <TableCell align="right">{cliente.y}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
