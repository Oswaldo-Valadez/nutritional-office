//Dependencies
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Routes
import Expedients from "./views/expedients/Expedients";
import Expedient from "./views/expedients/Expedient";
import CreateExpedient from "./views/expedients/CreateExpedient";

import Notas from './views/Notas';
import NuevaNota from './views/NuevaNota';

//Auth
import Login from "./views/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

// Cambiar color primario y secundario
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E21D27',
    },
    secondary: {
      main: '#212529'
    }
  }
});

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("auth"))) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <ProtectedRoute
            authState={[isAuth, setIsAuth]}
            exact
            component={Expedients}
            path="/expedients"
            title="Expedientes"
          />

          <ProtectedRoute
            authState={[isAuth, setIsAuth]}
            exact
            component={NuevaNota}
            path='/notas/nuevaNota/:id_expedient'
            title="Nueva nota de visita"
          />

          <ProtectedRoute
            authState={[isAuth, setIsAuth]}
            exact
            component={Notas}
            path='/notas'
            title="Notas de visita"
          />

          <ProtectedRoute
            authState={[isAuth, setIsAuth]}
            exact
            component={Expedient}
            path="/expedients/:id"
            title="Expediente"
          />

          <ProtectedRoute
            authState={[isAuth, setIsAuth]}
            exact
            component={CreateExpedient}
            path="/expedients/create/expedient"
            title="Nuevo expediente"
          />

          <Route
            component={() => <Login authState={[isAuth, setIsAuth]} />}
            path="/login"
          />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
