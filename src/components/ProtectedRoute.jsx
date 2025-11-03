import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token"); // or sessionStorage, context, etc.
  if (!isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoute;
