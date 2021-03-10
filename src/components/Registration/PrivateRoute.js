import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../ContextAPI/AuthState";

const PrivateRoute = ({ component: PropsComponent, ...rest }) => {
  const { currentUser } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(RouteProps) => {
        return !!currentUser ? (
          <PropsComponent {...RouteProps} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
