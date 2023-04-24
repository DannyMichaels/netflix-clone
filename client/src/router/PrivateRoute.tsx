import { Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/navigation';
import { ReactNode } from 'react';

export default function PrivateRoute({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const profiles = JSON.parse(localStorage.getItem('profiles') as any);

  if (profiles?.currentProfile?.id) {
    return <>{children}</>;
  }

  return <Navigate to={ROUTES.SELECT_PROFILE} />;
}
