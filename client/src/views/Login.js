import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../components/LoadingAnimation";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formularioVacio = {
  email: "",
  password: "",
};

export default function Login({ authState }) {
  const classes = useStyles();

  const [isAuth, setIsAuth] = authState;

  const [formulario, setFormulario] = useState(formularioVacio);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const history = useHistory();

  useEffect(() => {
    if (isAuth) {
      history.push("/expedients");
    }
  }, [isAuth]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("/login", formulario)
      .then((res) => {
        setIsLoading(false);
        const result = res.data;

        if (result.message === "Success") {
          // Credenciales correctas
          toast.success("Iniciando...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            closeButton: false,
            progress: undefined,
            onClose: () => {
              localStorage.setItem("auth", true);
              setIsAuth(true);
            },
          });
        } else {
          // Credenciales incorrectas
          toast.error("Email o contraseña incorrectos.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <Grid container className={classes.root}>
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
      <Grid item lg={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant={"h3"} style={{ marginBottom: 70 }}>
            Oficina Nutricional
          </Typography>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          {isLoading ? (
            <Loading />
          ) : (
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={formulario.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formulario.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
            </form>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/images/LoginImg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
