import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Avatar,
  Breadcrumbs,
  Link,
  Divider,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Button,
  Collapse,
  Typography,
  Paper,
  CssBaseline,
  TextField,
  Fab,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import axios from "../../config/axios";
import Loading from "../../components/LoadingAnimation";
import FloatingActions from "../../components/FloatingActions";
import RichTextEditor from "../../components/RichTextEditor";
import NumberFormat from "react-number-format";

import clsx from "clsx";
import moment from "moment";
import "moment/locale/es";

import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
  Done as DoneIcon,
} from "@material-ui/icons";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="(###) ### - ####"
      isNumericString
    />
  );
}

const Expedient = () => {
  const { id } = useParams();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [expedient, setExpedient] = useState({});
  const [desableEdit, setEdit] = useState(true);

  const [error, setError] = useState({
    fullname: false,
    birth_date: false,
    marital_status: false,
    gender: false,
    address: false,
    phone: false,
    mobile: false,
    email: false,
    occupation: false,
    inherited_antecedents: false,
    not_pathological_antecedents: false,
    perinatal_antecedents: false,
    gynecology_obstetrics_antecedents: false,
    pathological_antecedents: false,
  });

  const handleCreateExpedient = (e) => {
    e.preventDefault();

    setEdit(!desableEdit);

    if (Object.values(error).includes(true)) {
      toast.error("No has llenado correctamente todos los campos.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        closeButton: false,
        progress: undefined,
      });
    } else
      axios
        .put(`/expedients/${id}`, expedient)
        .then((res) => {
          const result = res.data;

          if (result.message === "Success") {
            toast.success("El expediente se ha editado exitosamente.", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              closeButton: false,
              progress: undefined,
            });
          } else {
            toast.error("No se pudo editar el expediente.", {
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

  useEffect(() => {
    axios.get(`/expedients/${id}`).then((res) => {
      setIsLoading(false);
      const result = res.data;

      if (result.message === "Success") {
        // Credenciales correctas
        result.expedient.birth_date = moment(
          result.expedient.register_date
        ).format("YYYY-MM-DD");

        setExpedient(result.expedient);

        toast.success("Expediente cargado correctamente.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          closeButton: false,
          progress: undefined,
        });
      } else {
        // Credenciales incorrectas
        toast.error("No se pudo cargar el expediente.", {
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
    });
  }, []);

  const validation = (e) => {
    let aux = false;
    switch (e.target.name) {
      case "fullname":
        if (
          !/^[a-zA-ZÀ-ÿ]{2,}(?: [a-zA-ZÀ-ÿ]+){0,}$/.test(
            e.target.value.trim()
          ) ||
          e.target.value.trim().length > 100
        )
          aux = true;
        break;
      case "address":
        if (e.target.value.trim() == "") aux = true;
        break;
      case "phone":
        break;
      case "mobile":
        break;
      case "birth_date":
        if (moment(e.target.value).isAfter(moment(expedient.register_date)))
          aux = true;
        break;
      case "email":
        if (
          !/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            e.target.value.trim()
          )
        )
          aux = true;
        break;
      case "occupation":
        if (
          !/^[a-zA-ZÀ-ÿ]{1,}(?: [a-zA-ZÀ-ÿ]+){0,}$/gm.test(
            e.target.value.trim()
          ) ||
          e.target.value.trim().length > 100
        )
          aux = true;
        break;
      case "inherited_antecedents":
        if (e.target.value.trim() == "") aux = true;
        break;
      case "not_pathological_antecedents":
        if (e.target.value.trim() == "") aux = true;
        break;
      case "perinatal_antecedents":
        if (e.target.value.trim() == "") aux = true;
        break;
      case "gynecology_obstetrics_antecedents":
        if (e.target.value.trim() == "" && expedient.gender != 0) aux = true;
        break;
      case "pathological_antecedents":
        if (e.target.value.trim() == "") aux = true;
        break;
    }
    setError({
      ...error,
      [e.target.name]: aux,
    });
  };

  const handleChange = (e) => {
    setExpedient({
      ...expedient,
      [e.target.name]: e.target.value,
    });

    validation(e);
  };

  return isLoading ? (
    <Loading />
  ) : (
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
            <Typography color="textPrimary">Editar Expediente</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            variant="outlined"
            component={Paper}
            style={{ padding: "30px" }}
            spacing={2}
          >
            <Grid item xs={12} sm={12}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="h5" paragraph>
                    Información del paciente
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" paragraph>
                    {moment(expedient.register_date).format("DD/MM/YYYY")}
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" style={{ color: "white" }}>
                .
              </Typography>
              <TextField
                value={expedient.fullname}
                onChange={handleChange}
                disabled={desableEdit}
                label="Nombre completo"
                variant="outlined"
                required
                fullWidth
                id="fullname"
                name="fullname"
                error={error.fullname}
                helperText={error.fullname ? "Nombre incorrecto" : null}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Fecha de nacimiento
              </Typography>
              <TextField
                value={moment(expedient.birth_date).format("YYYY-MM-DD")}
                onChange={handleChange}
                disabled={desableEdit}
                type="date"
                variant="outlined"
                required
                fullWidth
                id="birth_date"
                name="birth_date"
                error={error.birth_date}
                helperText={
                  error.birth_date ? "Fecha de nacimiento incorrecta" : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Género
              </Typography>
              <Select
                value={expedient.gender}
                onChange={handleChange}
                disabled={desableEdit}
                variant="outlined"
                required
                fullWidth
                id="gender"
                name="gender"
                native
              >
                <option value={0}>Hombre</option>
                <option value={1}>Mujer</option>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Estado civil
              </Typography>
              <Select
                value={expedient.marital_status}
                onChange={handleChange}
                disabled={desableEdit}
                variant="outlined"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={expedient.occupation}
                onChange={handleChange}
                disabled={desableEdit}
                label="Ocupación"
                variant="outlined"
                required
                fullWidth
                id="occupation"
                name="occupation"
                error={error.occupation}
                helperText={error.occupation ? "Ocupación incorrecta" : null}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={expedient.address}
                onChange={handleChange}
                disabled={desableEdit}
                label="Dirección"
                variant="outlined"
                required
                fullWidth
                id="address"
                name="address"
                error={error.address}
                helperText={error.address ? "Dirección incorrecta" : null}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={expedient.mobile}
                onChange={handleChange}
                disabled={desableEdit}
                label="Teléfono celular"
                variant="outlined"
                required
                fullWidth
                id="mobile"
                name="mobile"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={expedient.phone}
                onChange={handleChange}
                disabled={desableEdit}
                label="Teléfono fíjo"
                variant="outlined"
                required
                fullWidth
                id="phone"
                name="phone"
                error={error.phone}
                helperText={error.phone ? "Teléfono fíjo incorrecto" : null}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={expedient.email}
                onChange={handleChange}
                disabled={desableEdit}
                label="Correo electrónico"
                variant="outlined"
                required
                fullWidth
                id="email"
                name="email"
                error={error.email}
                helperText={
                  error.email ? "Correo electrónico incorrecto" : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
              value={moment(expedient.register_date).format("YYYY-MM-DD")}
              onChange={handleChange}
              label="Fecha de registro"
              type="date"
              variant="outlined"
              required
              fullWidth
              id="register_date"
              name="register_date"
              disabled
            /> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            variant="outlined"
            style={{ padding: "30px" }}
            component={Paper}
            spacing={2}
          >
            <Grid item xs={12} sm={12}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="h5" paragraph>
                    Antecedentes
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={expedient.inherited_antecedents}
                onChange={handleChange}
                disabled={desableEdit}
                label="Heredados"
                variant="outlined"
                required
                fullWidth
                multiline
                rows={10}
                id="inherited_antecedents"
                name="inherited_antecedents"
                error={error.inherited_antecedents}
                helperText={
                  error.inherited_antecedents
                    ? "Antecedentes heredados incorrectos"
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={expedient.not_pathological_antecedents}
                onChange={handleChange}
                disabled={desableEdit}
                label="No patológicos"
                variant="outlined"
                required
                fullWidth
                multiline
                rows={10}
                id="not_pathological_antecedents"
                name="not_pathological_antecedents"
                error={error.not_pathological_antecedents}
                helperText={
                  error.not_pathological_antecedents
                    ? "Antecedentes no patológicos incorrectos"
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={expedient.perinatal_antecedents}
                onChange={handleChange}
                disabled={desableEdit}
                label="Perinatales"
                variant="outlined"
                required
                fullWidth
                multiline
                rows={10}
                id="perinatal_antecedents"
                name="perinatal_antecedents"
                error={error.perinatal_antecedents}
                helperText={
                  error.perinatal_antecedents
                    ? "Antecedentes perinatales incorrectos"
                    : null
                }
              />
            </Grid>
            {expedient.gender == 0 ? null : (
              <Grid item xs={12} sm={6}>
                <TextField
                  value={expedient.gynecology_obstetrics_antecedents}
                  onChange={handleChange}
                  disabled={desableEdit}
                  label="Gineco-obstetricos"
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  rows={10}
                  id="gynecology_obstetrics_antecedents"
                  name="gynecology_obstetrics_antecedents"
                  error={error.gynecology_obstetrics_antecedents}
                  helperText={
                    error.gynecology_obstetrics_antecedents
                      ? "Antecedentes gineco-obstetricos incorrectos"
                      : null
                  }
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                value={expedient.pathological_antecedents}
                onChange={handleChange}
                disabled={desableEdit}
                label="Patológicos"
                variant="outlined"
                required
                fullWidth
                multiline
                rows={10}
                id="pathological_antecedents"
                name="pathological_antecedents"
                error={error.pathological_antecedents}
                helperText={
                  error.pathological_antecedents
                    ? "Antecedentes patológicos incorrectos"
                    : null
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <FloatingActions
          edit={desableEdit}
          onClick={[() => setEdit(!desableEdit), expedient]}
          resetFields={setExpedient}
        />
      </Grid>
    </form>
  );
};

export default Expedient;
