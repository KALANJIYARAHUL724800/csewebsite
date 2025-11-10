import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token"); // check if user is logged in
  if (isLoggedIn) {
    // If logged in, redirect to home
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default PublicRoute;
