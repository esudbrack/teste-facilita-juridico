import { Button, Container, List, ListItem, ListItemText } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";

export default function RotaClientes({ clientesRota, handleClose }) {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    setClientes(clientesRota);
  }, [clientesRota]);

  return (
    <Container sx={{ maxHeight: '100%', overflow: 'auto' }}>
      <List sx={{ width: "100%" }}>
        {clientes && clientes.length &&
          clientes.map((cliente, i) => (
            <ListItem>
              <ListItemText
                key={`cliente-rota-${cliente.id}`}
                primary={`${i+1}. ${cliente.nome}`}
                secondary={`X: ${cliente.x} Y: ${cliente.y}`}
              />
            </ListItem>
          ))}
      </List>
      <Button
        fullWidth
        onClick={handleClose}
        variant="outlined"
        sx={{ mt: 3, mb: 2 }}
      >
        Fechar
      </Button>
    </Container>
  );
}
