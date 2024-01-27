import * as React from "react";
import { useEffect, useState } from "react";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import api from "../services/api";
import ClienteForm from "../components/ClienteForm";
import RotaClientes from "../components/RotaClientes";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: '80%', 
  overflow: 'auto',
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export default function ListaClientes() {
  let [cliente, setCliente] = useState(null);
  let [clientes, setClientes] = useState([]);
  let [clientesRota, setClientesRota] = useState([]);
  let [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [openRota, setOpenRota] = useState(false);

  const handleOpen = (cliente) => {
    setCliente(cliente);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleCloseRota = () => setOpenRota(false);

  function getRotaClientes() {
    setLoading(true);

    api
      .get("/clientes/rota")
      .then((res) => {
        console.log(res.data);
        setClientesRota(res.data.clientesRota);
        setLoading(false);
        setOpenRota(true)
      })
      .catch((error) => {
        setAlertMessage(error.response.data.message);
        setError(true);
        setDisplayAlert(true);
        setLoading(false);
      });
  }

  function fetchClientes() {
    api
      .get("/clientes")
      .then((response) => {
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

      <Button
        type="button"
        onClick={() => {
          handleOpen(null);
        }}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Adicionar Cliente
      </Button>

      <Modal open={open} aria-labelledby="modal-modal-title">
        <Box sx={modalBoxStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color={blue[700]}
          >
            Cadastro de cliente
          </Typography>
          <ClienteForm
            handleClose={handleClose}
            cliente={cliente}
            clientes={clientes}
            setClientes={setClientes}
          />
        </Box>
      </Modal>

      <Modal open={openRota} aria-labelledby="modal-modal-rota-title">
        <Box sx={modalBoxStyle}>
          <Typography
            id="modal-modal-rota-title"
            variant="h6"
            component="h2"
            color={blue[700]}
          >
            Ordem de entrega
          </Typography>
          <RotaClientes
            handleClose={handleCloseRota}
            clientesRota={clientesRota}
          />
        </Box>
      </Modal>

      {!clientes.length ? (
        <Typography variant="h4" gutterBottom color={blue[700]}>
          Nenhum cliente encontrado.
        </Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom color={blue[700]}>
            Lista de clientes
          </Typography>
          <Button
            type="button"
            onClick={getRotaClientes}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Calcular Rota
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "50vw" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Telefone</TableCell>
                  <TableCell align="right">X</TableCell>
                  <TableCell align="right">Y</TableCell>
                  <TableCell align="right"></TableCell>
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
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          handleOpen(cliente);
                        }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}
