import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Grid,
  Typography,
  Paper,
  CssBaseline,
  TextField,
  Fab,
  Select,
  Breadcrumbs,
  Link
} from "@material-ui/core";

import axios from "../../config/axios";
import Loading from "../../components/LoadingAnimation";
import RichTextEditor from "../../components/RichTextEditor";

import moment from "moment";
import "moment/locale/es";

import { Done as DoneIcon } from "@material-ui/icons";

const CreateExpedient = () => {
  const history = useHistory();

  const [expedient, setExpedient] = useState({
    fullname: "",
    birth_date: null,
    marital_status: 0,
    gender: 0,
    address: "",
    phone: "",
    mobile: "",
    email: "",
    occupation: "",
    register_date: moment().format("YYYY-MM-DD"),
    inherited_antecedents: "",
    not_pathological_antecedents: "",
    perinatal_antecedents: "",
    gynecology_obstetrics_antecedents: "",
    pathological_antecedents: "",
  });

  const handleCreateExpedient = (e) => {
    e.preventDefault();
    axios
      .post(`/expedients`, expedient)
      .then((res) => {
        const result = res.data;

        if (result.message === "Success") {
          // Credenciales correctas
          toast.success("El expediente se ha creado exitosamente.", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            closeButton: false,
            progress: undefined,
            onClose: () => {
              history.push("/expedients");
            },
          });
        } else {
          // Credenciales incorrectas
          toast.error("No se pudo crear el expediente.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            closeButton: false,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setExpedient({
      ...expedient,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleCreateExpedient}>
      <Grid container spacing={3}>
        <CssBaseline />
        <ToastContainer newestOnTop={false} rtl={false} />
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Inicio
            </Link>
            <Link color="inherit" href="/">
              Expedientes
            </Link>
            <Typography color="textPrimary">Nuevo expediente</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" style={{ padding: "30px" }}>
            <Typography variant="subtitle2">Nombre completo</Typography>
            <TextField
              value={expedient.fullname}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="fullname"
              name="fullname"
            />
            <Typography variant="subtitle2">Fecha de nacimiento</Typography>
            <TextField
              value={moment(expedient.birth_date).format("YYYY-MM-DD")}
              onChange={handleChange}
              type="date"
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="birth_date"
              name="birth_date"
            />
            <Typography variant="subtitle2">Género</Typography>
            <Select
              value={expedient.gender}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="gender"
              name="gender"
              native
            >
              <option value={0}>Hombre</option>
              <option value={1}>Mujer</option>
            </Select>
            <Typography variant="subtitle2">Estado civil</Typography>
            <Select
              value={expedient.marital_status}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="marital_status"
              name="marital_status"
              native
            >
              <option value={0}>Soltero</option>
              <option value={1}>Casado</option>
              <option value={2}>Divorciado</option>
              <option value={3}>Viudo</option>
              <option value={4}>Concubinato</option>
            </Select>
            <Typography variant="subtitle2">Ocupación</Typography>
            <TextField
              value={expedient.occupation}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="occupation"
              name="occupation"
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" style={{ padding: "30px" }}>
            <Typography variant="subtitle2">Dirección</Typography>
            <TextField
              value={expedient.address}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="address"
              name="address"
            />
            <Typography variant="subtitle2">Correo electrónico</Typography>
            <TextField
              value={expedient.email}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="email"
              name="email"
            />
            <Typography variant="subtitle2">Teléfono fíjo</Typography>
            <TextField
              value={expedient.phone}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="phone"
              name="phone"
            />

            <Typography variant="subtitle2">Teléfono celular</Typography>
            <TextField
              value={expedient.mobile}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="mobile"
              name="mobile"
            />

            <Typography variant="subtitle2">Fecha de registro</Typography>
            <TextField
              value={moment(expedient.register_date).format("YYYY-MM-DD")}
              onChange={handleChange}
              type="date"
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="register_date"
              name="register_date"
              disabled
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" style={{ padding: "30px" }}>
            <Typography variant="subtitle2">Heredados</Typography>
            <RichTextEditor
              value={expedient.inherited_antecedents}
              onEditorChange={(e) => {
                setExpedient({
                  ...expedient,
                  inherited_antecedents: e,
                });
              }}
            />
            <Typography variant="subtitle2">No patológicos</Typography>
            <RichTextEditor
              value={expedient.not_pathological_antecedents}
              onEditorChange={(e) => {
                setExpedient({
                  ...expedient,
                  not_pathological_antecedents: e,
                });
              }}
            />
            <Typography variant="subtitle2">Perinatales</Typography>
            <RichTextEditor
              value={expedient.perinatal_antecedents}
              onEditorChange={(e) => {
                setExpedient({
                  ...expedient,
                  perinatal_antecedents: e,
                });
              }}
            />
            <Typography variant="subtitle2">Gineco-obstetricos</Typography>
            <RichTextEditor
              value={expedient.gynecology_obstetrics_antecedents}
              onEditorChange={(e) => {
                setExpedient({
                  ...expedient,
                  gynecology_obstetrics_antecedents: e,
                });
              }}
            />
            <Typography variant="subtitle2">Patológicos</Typography>
            <RichTextEditor
              value={expedient.pathological_antecedents}
              onEditorChange={(e) => {
                setExpedient({
                  ...expedient,
                  pathological_antecedents: e,
                });
              }}
            />
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
};

export default CreateExpedient;
