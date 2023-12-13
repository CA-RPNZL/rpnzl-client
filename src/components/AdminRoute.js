import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const AdminRoute = ({ component: Component, adminOnly, ...rest }) => {
  const { jwt, userData } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!jwt) {
          // Navigate to login if not authenticated
          return <Navigate to="/login" />;
        }

        if (adminOnly && !userData?.is_admin) {
          // Navigate to 404 or unauthorized page for non-admin users
          return <Navigate to="/unauthorized" />;
        }

        // Render the component if authenticated and authorized
        return Component ? <Component {...props} /> : null;
      }}
    />
  );
};

export default AdminRoute;