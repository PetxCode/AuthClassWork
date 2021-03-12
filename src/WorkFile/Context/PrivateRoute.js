import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "./AuthManager";

const PrivateRoute = ({ component: ComponentProps, ...rest }) => {
  const { current } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(propsRoute) => {
        return current ? (
          <ComponentProps {...propsRoute} />
        ) : (
          <Redirect to="/reg" />
        );
      }}
    />
  );
};

export default PrivateRoute;
