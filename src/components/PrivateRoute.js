import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(userRole)) {
    // If the user's role is not authorized, redirect to the home page
    return <Navigate to="/home" replace />;
  }

  // If the user is logged in and authorized, render the component
  return <Component {...rest} />;
}

export default PrivateRoute;