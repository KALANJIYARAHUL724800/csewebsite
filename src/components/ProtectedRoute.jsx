import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("token");
  const course = sessionStorage.getItem("course");
  if (!isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoute;
