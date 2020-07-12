import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Auth } from "../../types";

const mapStateToProps = (state: { auth: Auth }) => ({
  auth: state.auth,
});

function PrivateRoute({ component: Component, auth, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default connect(mapStateToProps)(PrivateRoute);
