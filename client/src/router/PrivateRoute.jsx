import { Redirect, Route } from 'react-router';
import { ROUTES } from '../utils/navigation';

export default function PrivateRoute({ component: Component, ...rest }) {
  const selectedProfile = localStorage.getItem('currentProfile');

  return (
    <Route
      {...rest}
      render={(props) => {
        return selectedProfile !== 'null' ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.SELECT_PROFILE} />
        );
      }}
    />
  );
}
