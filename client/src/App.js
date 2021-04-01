import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";import './App.css';
import Login from './views/Login';
import Notas from './views/Notas';
import NuevaNota from './views/NuevaNota';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/notas'>
            <Notas />
          </Route>

          <Route path='/nuevaNota'>
            <NuevaNota />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
