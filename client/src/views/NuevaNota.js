import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Fab,
} from "@material-ui/core";
import { Done as DoneIcon } from "@material-ui/icons";
import "../App.css";
import {
  calcICC,
  calcIMC,
  getICCResult,
  getIMCResult,
} from "../utils/functions";
import axios from "../config/axios";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "moment/locale/es";
import Loading from "../components/LoadingAnimation";

const formularioVacio = {
  paciente: {},
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
  const [ultimaNota, setUltimaNota] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id_expedient } = useParams();

  const history = useHistory();

  useEffect(() => {
    const getPaciente = () => {
      axios
        .get("/expedients/" + id_expedient)
        .then((res) => {
          setFormulario({ ...formulario, paciente: res.data.expedient });
        })
        .catch((err) => console.log(err));
    };
    const getNotaAnterior = () => {
      axios
        .get("notas/ultimaNota/" + id_expedient)
        .then((res) => {
          setUltimaNota(res.data.nota);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };

    getPaciente();
    getNotaAnterior();
  }, []);

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
    if (name === "anotaciones") setFormulario({ ...formulario, [name]: value });
    else if (value > 0 || value === "") {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = {
      register_date: moment().format("YYYY-MM-DD"),
      weight: formulario.peso,
      size: formulario.talla,
      waist: formulario.cintura,
      hip: formulario.cadera,
      blood_pressure_high: formulario.presionAlta,
      blood_pressure_low: formulario.presionBaja,
      bmi: formulario.IMC.imc,
      whr: formulario.ICC.icc,
      annotations: formulario.anotaciones,
      id_expedient: formulario.paciente.id_expedient,
    };

    axios
      .post("/notas/crearNota", form)
      .then((res) => {
        toast.success("Nota de visita registrada correctamente.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          closeButton: false,
          progress: undefined,
          onClose: () => {
            setFormulario(formularioVacio);
            history.push("/notas");
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <form>
          <ToastContainer
            position="top-cen"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                  Inicio
                </Link>
                <Link color="inherit" href="/notas">
                  Notas de visita
                </Link>
                <Typography color="textPrimary">
                  Nueva nota de visita
                </Typography>
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
                    <Typography variant="subtitle2" paragraph>
                      {moment().format("DD/MM/YYYY")}
                    </Typography>
                  </Box>
                </Box>
                <Divider style={{ marginBottom: 20 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      {formulario.paciente.fullname}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Peso actual(Kg)"
                      name="peso"
                      value={formulario.peso}
                      onChange={handleChange}
                      type="number"
                      required
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
                      type="number"
                      required
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
                      type="number"
                      required
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
                      type="number"
                      required
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
                      type="number"
                      required
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
                      type="number"
                      required
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
                      rows={5}
                      value={formulario.anotaciones}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item sm={4}>
              <Paper variant="outlined" style={{ padding: "30px" }}>
                <Typography variant="h5">Nota de visita anterior</Typography>
                <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                {ultimaNota ? (
                  <div>
                    <Typography gutterBottom>
                      <b>Fecha: </b>
                      {moment(ultimaNota.register_date).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography gutterBottom>
                      <b>Peso: </b>
                      {ultimaNota.weight}kg
                    </Typography>
                    <Typography gutterBottom>
                      <b>Talla: </b>
                      {ultimaNota.size}m
                    </Typography>
                    <Typography gutterBottom>
                      <b>Cintura: </b>
                      {ultimaNota.waist}cm
                    </Typography>
                    <Typography gutterBottom>
                      <b>Cadera: </b>
                      {ultimaNota.hip}cm
                    </Typography>
                    <Typography gutterBottom>
                      <b>Presión arterial alta: </b>
                      {ultimaNota.blood_pressure_high}mmHg
                    </Typography>
                    <Typography gutterBottom>
                      <b>Presión arterial baja: </b>
                      {ultimaNota.blood_pressure_low}mmHg
                    </Typography>
                    <Typography gutterBottom>
                      <b>IMC: </b>
                      {ultimaNota.bmi} - {getIMCResult(ultimaNota.bmi)}
                    </Typography>
                    <Typography gutterBottom>
                      <b>ICC: </b>
                      {ultimaNota.whr} -{" "}
                      {getICCResult(
                        ultimaNota.whr,
                        ultimaNota.waist,
                        formulario.paciente.gender
                      )}
                    </Typography>
                    <Typography gutterBottom>
                      <b>Anotaciones: </b>
                      {ultimaNota.annotations}
                    </Typography>
                  </div>
                ) : (
                  <Typography gutterBottom>Sin información</Typography>
                )}
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
              onClick={handleSubmit}
            >
              <DoneIcon />
            </Fab>
          </Grid>
        </form>
      )}
    </div>
  );
}

export default NuevaNota;
