import * as React from "react";
import { useEffect, useState } from "react";

import { Field, Form, Formik } from "formik";

import { Alert, Box, Button, Container, Grid, Typography } from "@mui/material";

import { CustomTextField } from "./CustomTextField";

import api from "../services/api";

export default function ClienteForm({
  cliente,
  handleClose,
  clientes,
  setClientes,
}) {
  let [values, setValues] = useState({
    nome: "",
    email: "",
    telefone: "",
    x: null,
    y: null,
  });

  let [submitFunction, setSubmitFunction] = useState("create");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let [displayAlert, setDisplayAlert] = useState(false);
  let [alertMessage, setAlertMessage] = useState(false);

  useEffect(() => {
    if (cliente) {
      setValues(cliente);
      setSubmitFunction("update");
    }
  }, [cliente]);

  function onSubmit(data) {
    setLoading(true);

    const displayError = (error) => {
      setAlertMessage(error.response.data.message);
      setError(true);
      setDisplayAlert(true);
      setLoading(false);
    };

    if (submitFunction === "create") {
      api
        .post("/clientes", data)
        .then((res) => {
          clientes.push(res.data.cliente);
          setClientes(clientes);
          setLoading(false);
          handleClose();
        })
        .catch(displayError);
    } else {
      api
        .put("/clientes", data)
        .then((res) => {
          cliente = res.data.cliente;
          setClientes(clientes);
          setLoading(false);
          handleClose();
        })
        .catch(displayError);
    }
  }

  return (
    <>
      {displayAlert && (
        <Alert
          severity={error ? "error" : "success"}
          onClose={() => {
            setDisplayAlert(false);
          }}
        >
          {alertMessage}
        </Alert>
      )}
      <Formik enableReinitialize initialValues={values} onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Field
                name="nome"
                placeholder="Nome completo"
                component={CustomTextField}
                required
              />
              <Field
                name="email"
                placeholder="E-mail"
                component={CustomTextField}
                required
              />
              <Field
                name="telefone"
                placeholder="Telefone"
                component={CustomTextField}
                required
              />
              <Field
                name="x"
                placeholder="Posição X"
                component={CustomTextField}
                required
              />
              <Field
                name="y"
                placeholder="Posição Y"
                component={CustomTextField}
                required
              />

              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    disabled={loading}
                    onClick={handleClose}
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    fullWidth
                    disabled={loading}
                    onClick={() => {
                      onSubmit(values);
                    }}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {submitFunction === "create" ? "Cadastrar" : "Atualizar"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
