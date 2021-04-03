import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Collapse,
  CssBaseline,
  Divider,
  Fab,
  Grid,
  IconButton,
  Typography,
  Link,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import axios from "../../config/axios";
import Loading from "../../components/LoadingAnimation";

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
  Add as AddIcon,
  Done as DoneIcon,
} from "@material-ui/icons";

const Expedients = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expedients, setExpedients] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("/expedients")
      .then((res) => {
        setIsLoading(false);
        const result = res.data;

        if (result.message === "Success") {
          // Credenciales correctas
          setExpedients(result.expedients);
          toast.success("Se han cargado todos los expedientes.", {
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
          toast.error("No se encontraron expedientes.", {
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
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const handleCreateExpedient = () => {
    history.push("/expedients/create/expedient");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Grid container spacing={3}>
      <CssBaseline />
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
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 0 }}>
          <Link color="inherit" href="/">
            Inicio
          </Link>
          <Typography color="textPrimary">Expedientes</Typography>
        </Breadcrumbs>
      </Grid>
      {expedients.map((data) => (
        <Grid item xs={4}>
          <CardExpedient
            expedientsState={[expedients, setExpedients]}
            loadingState={[isLoading, setIsLoading]}
            {...data}
          />
        </Grid>
      ))}
      <Fab
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: "1000",
        }}
        tooltip="HOLA"
        color="primary"
        onClick={handleCreateExpedient}
      >
        <AddIcon />
      </Fab>
    </Grid>
  );
};

const CardExpedient = ({
  id_expedient,
  fullname,
  birth_date,
  marital_status,
  gender,
  address,
  phone,
  mobile,
  email,
  occupation,
  register_date,
  inherited_antecedents,
  not_pathological_antecedents,
  perinatal_antecedents,
  gynecology_obstetrics_antecedents,
  pathological_antecedents,
  expedientsState,
  loadingState,
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const [expedients, setExpedients] = expedientsState;
  const [isLoading, setIsLoading] = loadingState;

  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleView = () => {
    history.push(`/expedients/${id_expedient}`);
  };

  const handleDeleteExpedient = (id) => {
    setIsLoading(true);
    axios
      .delete(`/expedients/${id}`)
      .then((res) => {
        setIsLoading(false);
        const result = res.data;

        if (result.message === "Success") {
          // Credenciales correctas
          const arr = expedients.filter((row) => row.id_expedient != id);
          setExpedients(arr);

          toast.success("El expediente se ha eliminado exitosamente.", {
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
          toast.error("No se pudo eliminar el expediente.", {
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

  const maritalStatus = ({ marital_status }) => {
    switch (marital_status) {
      case 0:
        return "Soltero";
      case 1:
        return "Casado";
      case 2:
        return "Divorciado";
      case 3:
        return "Viudo";
      case 4:
        return "Concubinato";
      default:
        return "Soltero";
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
        }
        action={
          <IconButton
            onClick={() => history.push("/notas/nuevaNota")}
            aria-label="Crear nota"
          >
            <AddIcon />
          </IconButton>
        }
        title={fullname}
        subheader={
          "Registrado en: " +
          moment(register_date).format("D [de] MMMM [del] YYYY")
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography align="center" variant="subtitle2">
              Fecha de nacimiento
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {moment(birth_date).format("D [de] MMMM [del] YYYY")}
            </Typography>
            <Typography align="center" variant="subtitle2">
              Género
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {gender ? "Mujer" : "Hombre"}
            </Typography>
            <Typography align="center" variant="subtitle2">
              Estado civil
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {maritalStatus(marital_status)}
            </Typography>
            <Typography align="center" variant="subtitle2">
              Ocupación
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {occupation}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align="center" variant="subtitle2">
              Dirección
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {address}
            </Typography>
            <Typography align="center" variant="subtitle2">
              Correo electrónico
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {email}
            </Typography>
            <Typography align="center" variant="subtitle2">
              Teléfono fíjo
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {phone}
            </Typography>
            <Typography align="center" variant="subtitle2">
              Teléfono celular
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {mobile}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Ver expediente">
          <VisibilityIcon onClick={handleView} />
        </IconButton>
        <IconButton aria-label="Eliminar expediente">
          <DeleteIcon onClick={() => handleDeleteExpedient(id_expedient)} />
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Antecedentes</Typography>
          <Typography variant="subtitle2">Heredados</Typography>
          <Typography paragraph>{inherited_antecedents}</Typography>
          <Typography variant="subtitle2">No patológicos</Typography>
          <Typography paragraph>{not_pathological_antecedents}</Typography>
          <Typography variant="subtitle2">Perinatales</Typography>
          <Typography paragraph>{perinatal_antecedents}</Typography>
          <Typography variant="subtitle2">Gineco-obstétricos</Typography>
          <Typography paragraph>{gynecology_obstetrics_antecedents}</Typography>
          <Typography variant="subtitle2">Patológicos</Typography>
          <Typography paragraph>{pathological_antecedents}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default Expedients;
