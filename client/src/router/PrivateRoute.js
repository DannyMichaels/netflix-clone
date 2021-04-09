import React from 'react';
import { Redirect, Route } from 'react-router';
import { ROUTES } from '../utils/navigation';

export default function PrivateRoute({ component: Component, ...rest }) {
  const selectedProfile = localStorage.getItem('selectedProfile');

  return (
    <Route
      {...rest}
      render={(props) => {
        return selectedProfile ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.SELECT_PROFILE} />
        );
      }}
    />
  );
}
