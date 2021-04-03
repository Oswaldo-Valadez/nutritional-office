import React, { useEffect, useState } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Fab,
} from "@material-ui/core";

import { Done as DoneIcon } from "@material-ui/icons";

import "../App.css";

import { calcICC, calcIMC } from "../utils/functions";

const formularioVacio = {
  paciente: "",
  peso: "",
  talla: "",
  cintura: "",
  cadera: "",
  presionAlta: "",
  presionBaja: "",
  IMC: {},
  ICC: {},
  anotaciones: "",
};

function NuevaNota() {
  const [formulario, setFormulario] = useState(formularioVacio);

  useEffect(() => {}, [formulario.paciente]);

  useEffect(() => {
    if (
      formulario.peso === "" ||
      formulario.peso <= 0 ||
      formulario.talla === "" ||
      formulario.talla <= 0
    ) {
      setFormulario({ ...formulario, IMC: {} });
    } else {
      setFormulario({
        ...formulario,
        IMC: calcIMC(formulario.peso, formulario.talla),
      });
    }
  }, [formulario.peso, formulario.talla]);

  useEffect(() => {
    if (
      formulario.cintura === "" ||
      formulario.cintura <= 0 ||
      formulario.cadera === "" ||
      formulario.cadera <= 0
    ) {
      setFormulario({ ...formulario, ICC: {} });
    } else {
      setFormulario({
        ...formulario,
        ICC: calcICC(0, formulario.cintura, formulario.cadera),
      });
    }
  }, [formulario.cintura, formulario.cadera]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Inicio
            </Link>
            <Link color="inherit" href="/notas">
              Notas de visita
            </Link>
            <Typography color="textPrimary">Nueva nota de visita</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item sm={8}>
          <Paper variant="outlined" style={{ padding: 30 }}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography variant="h5" paragraph>
                  Nueva nota de visita
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" paragraph>
                  {new Date().toLocaleDateString("es-MX")}
                </Typography>
              </Box>
            </Box>
            <Divider style={{ marginBottom: 20 }} />
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Paciente"
                    name="paciente"
                    select
                    value={formulario.paciente}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Peso actual(Kg)"
                    name="peso"
                    value={formulario.peso}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Talla(m)"
                    name="talla"
                    value={formulario.talla}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Cintura(cm)"
                    name="cintura"
                    value={formulario.cintura}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Cadera(cm)"
                    name="cadera"
                    value={formulario.cadera}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Presión arterial alta"
                    name="presionAlta"
                    value={formulario.presionAlta}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Presión arterial baja"
                    name="presionBaja"
                    value={formulario.presionBaja}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">
                    IMC: {formulario.IMC.imc} - {formulario.IMC.resultado}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">
                    ICC: {formulario.ICC.icc} - {formulario.ICC.resultado}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Anotaciones"
                    name="anotaciones"
                    multiline
                    rows={3}
                    value={formulario.anotaciones}
                    onChange={handleChange}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 15, marginBottom: 10 }}
                >
                  Aceptar
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item sm={4}>
          <Paper variant="outlined" style={{ padding: "30px" }}>
            <Typography variant="h5">Nota de visita anterior</Typography>
            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
            Información
          </Paper>
        </Grid>
        <Fab
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            zIndex: "1000",
          }}
          color="primary"
          type="submit"
        >
          <DoneIcon />
        </Fab>
      </Grid>
    </form>
  );
}

export default NuevaNota;
