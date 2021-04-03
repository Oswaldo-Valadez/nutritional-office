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
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import axios from "../../config/axios";
import Loading from "../../components/LoadingAnimation";
import FloatingActions from "../../components/FloatingActions";
import RichTextEditor from "../../components/RichTextEditor";

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
} from "@material-ui/icons";

const Expedient = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [expedient, setExpedient] = useState({});
  const [desableEdit, setEdit] = useState(true);

  useEffect(() => {
    axios.get(`/expedients/${id}`).then((res) => {
      setIsLoading(false);
      const result = res.data;

      if (result.message === "Success") {
        // Credenciales correctas
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

  const handleChange = (e) => {
    setExpedient({
      ...expedient,
      [e.target.name]: e.target.value,
    });
  };
  return isLoading ? (
    <Loading />
  ) : (
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
          <Typography color="textPrimary">Expediente</Typography>
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
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
            disabled={desableEdit}
            onEditorChange={(e) => {
              setExpedient({
                ...expedient,
                pathological_antecedents: e,
              });
            }}
          />
        </Paper>
      </Grid>
      <FloatingActions
        edit={desableEdit}
        onClick={[() => setEdit(!desableEdit), expedient]}
        resetFields={setExpedient}
        onSave={() => {}}
      />
    </Grid>
  );
};

export default Expedient;
