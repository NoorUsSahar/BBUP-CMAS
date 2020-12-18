import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const CoordinatorPrivateRoute = ({
  auth: { loading, isAuthenticated, user },
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !loading && !isAuthenticated ? (
          <Redirect to='/login/coordinator' />
        ) : !loading && !isAuthenticated && user !== null && user.type !== 1 ? (
          <Redirect to='/login/coordinator' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

CoordinatorPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CoordinatorPrivateRoute);
