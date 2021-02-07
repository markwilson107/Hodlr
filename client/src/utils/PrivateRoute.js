import React from 'react';
import { useAuth } from './use-auth';
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ comp: Component, ...rest }) {
  let { user } = useAuth();
  return (
    <Route
      {...rest}
      render={props => 
        user ?
          <Component {...props} />
          :
          <Redirect
            to={{
              pathname: "/login",
              state: { from: window.location.pathname }
            }}
          />
      
      }
    />

  );
}

export default PrivateRoute