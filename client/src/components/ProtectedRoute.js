import React from "react";
import { Route, Redirect } from "react-router-dom";
import Drawer from "./Drawer";

function ProtectedRoute({ component: Component, authState, title, ...rest }) {
  const [isAuth, setIsAuth] = authState;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Drawer title={title} authState={[isAuth, setIsAuth]}>
            <Component {...props} />
          </Drawer>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
