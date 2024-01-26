import { Box, Container } from "@mui/material";
import React from "react";
import { useOutlet } from "react-router-dom";

export const Layout = () => {
  const outlet = useOutlet();

  return (
    <Container component="main" maxWidth="sm" style={{ margin: "5%" }}>
      <Box sx={{ bgcolor: "#cfe8fc", height: "80vh", minWidth: "85vw" }}>
        {outlet}
      </Box>
    </Container>
  );
};
