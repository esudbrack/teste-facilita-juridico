import * as React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ListaClientes from "./pages/ListaClientes";



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: "#cfe8fc", my: 2, height: "100vh" }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI Create React App example
        </Typography>
        <ListaClientes></ListaClientes>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
