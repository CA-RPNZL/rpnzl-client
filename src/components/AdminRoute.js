import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ component: Component, adminOnly, ...rest }) => {
  const { jwt, userData } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!jwt) {
          // Redirect to login if not authenticated
          return <Redirect to="/login" />;
        }

        if (adminOnly && !userData?.is_admin) {
          // Redirect to 404 or unauthorized page for non-admin users
          return <Redirect to="/unauthorized" />;
        }

        // Render the component if authenticated and authorized
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;