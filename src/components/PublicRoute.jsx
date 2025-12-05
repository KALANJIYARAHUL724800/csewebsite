import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 
  const email = localStorage.getItem("email");

  if (token) {
    return <Navigate to="/home" replace />;
  }
  if (!email && window.location.pathname === "/update-password") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
