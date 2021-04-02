import React from "react";
import { Route, Redirect } from "react-router-dom";
import Drawer from "./Drawer";

function ProtectedRoute({ component: Component, authState, ...rest }) {
  const [isAuth, setIsAuth] = authState;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Drawer authState={[isAuth, setIsAuth]}>
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
